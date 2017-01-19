(function(){
    'use strict';

    DashboardController.$inject = ['$scope','$rootScope','$state', 'orderByFilter', 'Utils', 'DashService', 'OPRiskService', 'ChartFactory', 'calendarConfig'];
    app.controller('DashboardCtrl', DashboardController);

    function DashboardController ($scope, $rootScope, $state, orderBy, Utils, DashboardService, OPRiskService, ChartFactory, calendarConfig){

        var ControlAnalytics, OpenItems;
        $scope.mainTitle = $state.current.title;
        $scope.OpList = [10, 25, 50, 100];
        $scope.TVM = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'alertName',
            IsAsc: false,
            Filter: "",
            Total: 0,
            SortMe: function(col){
                if($scope.TVM.Column === col)
                    $scope.TVM.IsAsc = !$scope.TVM.IsAsc;
                else
                    $scope.TVM.Column = col;
            },
            GetIco: function(col){
                if($scope.TVM.Column === col){
                    return $scope.TVM.IsAsc? 'fa-sort-up' : 'fa-sort-down';
                } else {
                    return 'fa-unsorted';
                }
            }
        };

        $scope.AVM = {
            PerPage: 10,
            CurrPage: 1,
            Column: 'activityType',
            IsAsc: true,
            Filter: "",
            Total: 0,
            SortMe: function(col){
                if($scope.AVM.Column === col)
                    $scope.AVM.IsAsc = !$scope.AVM.IsAsc;
                else
                    $scope.AVM.Column = col;
            },
            GetIco: function(col){
                if($scope.AVM.Column === col){
                    return $scope.AVM.IsAsc? 'fa-sort-up' : 'fa-sort-down';
                } else {
                    return 'fa-unsorted';
                }
            }
        };

        //----------------- Start Dummy Charts

        $scope.CAnalOpts = [
            { key: 'assessments', val: "Assessments",  },
            { key: 'audit', val: "Audit" },
            { key: 'itrisk', val: "IT Risk" },
            { key: 'rcsa', val: "RCSA" }
        ];

        $scope.OpItemsOpts = [
            { key: 'all', val: "All" },
            { key: 'audit', val: "Audit" },
            { key: 'itrisk', val: "IT Risk" },
            { key: 'rcsa', val: "RCSA" },
            { key: 'sox', val: "SOX" }
        ];

        $scope.getDate = function(dt){ return new Date(dt) };

        DashboardService.GetDashboard().then(function(data){
            $scope.Activities = data;
            setupCalendarEvents(data);
            return DashboardService.GetTasks();
        }).then(function(data){
            setupPagination(data);
            return DashboardService.GetControlAnals();
        }).then(function(data){
            ControlAnalytics = data;
            $scope.setCAOpt($scope.CAnalOpts[0]);
            return DashboardService.GetOpenItems();
        }).then(function(data){
            OpenItems = data;
            $scope.setOpen($scope.OpItemsOpts[0]);
            $rootScope.app.Mask=false;
        });

        function setupPagination(data){
            var pages = 0;
            data = orderBy(data, 'action_to_take');
            data = data.filter(function(a){ return a.workItemType !== 'Topic' });
            $scope.TVM.Total = data.length;
            $scope.Tasks = [[]];

            data.forEach(function(t){
                if($scope.Tasks[pages].length<$scope.TVM.PerPage)
                    $scope.Tasks[pages].push(t);
                else {
                    pages++;
                    $scope.Tasks[pages] = [];
                }
            });
            console.log($scope.Tasks);
        }
        
        //-------------- Calendar Functionality ----------------

        function setupCalendarEvents (data){
            $scope.events = [];
            var cols = {
                green : 'info',
                yellow: 'warning',
                red: 'important'
            };
            data.forEach(function(e){
                $scope.events.push({
                    title: e.activityType,
                    color: calendarConfig.colorTypes[cols[e.rag]],
                    startsAt: moment(e.dueDate).toDate(),
                    endsAt: moment(e.dueDate).toDate(),
                    draggable: false,
                    resizable: false
                });
            });
        }

       $scope.calendarView = 'month';
       $scope.viewDate = new Date();

       $scope.cellIsOpen = true;

       $scope.addEvent = function() {
           $scope.events.push({
                title: 'New event',
                startsAt: moment().startOf('day').toDate(),
                endsAt: moment().endOf('day').toDate(),
                color: calendarConfig.colorTypes.important,
                draggable: true,
                resizable: true
            });
        };

       $scope.eventClicked = function(event) {
            alert.show('Clicked', event);
        };

       $scope.eventEdited = function(event) {
            alert.show('Edited', event);
        };

       $scope.eventDeleted = function(event) {
            alert.show('Deleted', event);
        };

       $scope.eventTimesChanged = function(event) {
            alert.show('Dropped or resized', event);
        };

       $scope.toggle = function($event, field, event) {
            $event.preventDefault();
            $event.stopPropagation();
            event[field] = !event[field];
        };

       $scope.timespanClicked = function(date, cell) {
           if (vm.calendarView === 'month') {
               if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                  $scope.cellIsOpen = false;
               } else {
                  $scope.cellIsOpen = true;
                  $scope.viewDate = date;
               }
           } else if (vm.calendarView === 'year') {
               if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
                  $scope.cellIsOpen = false;
               } else {
                  $scope.cellIsOpen = true;
                  $scope.viewDate = date;
               }
           }
       };

       /* -------- Start: Control Analytics Chart -------- */
       $scope.setCAOpt = function(opt){
           loadControlAnalyticsChart(opt.val, ControlAnalytics[opt.key]);
           $scope.currCA = opt;
       };

       function loadControlAnalyticsChart(sub, data){
           var dataList = [];
           Object.keys(data).forEach(function(k){
               dataList.push([Utils.camelizeString(k), data[k]]);
           });
           console.log(dataList);
           var chartObj = ChartFactory.CreatePieChartTemplate('Control Analytics ['+sub+']', sub, dataList, ['#E0ED00', '#1372DF', '#E5990C', '#9E23E2', '#1CB400', '#8A8A8A']);
           Highcharts.chart('ctrlAnalChart', chartObj);
       }

       /* -------- Start: Open Items Charts -----------*/
       $scope.setOpen = function(opt){
           loadOpenItemsChart(opt.val, OpenItems[opt.key]);
           $scope.currOP = opt;
       };

       function loadOpenItemsChart(sub, data){
           var Cats = {}, opts = {};
           opts.Title = 'Open Items [' +  sub + ']';
           opts.Categories = Utils.GetLast12Month(11);
           opts.SubTitle = 'Open Items Subtitle';
           opts.Series = [{ name: 'Open', data: [] }];
           opts.YTitle = "Units";
           Object.keys(data).forEach(function(k){
               Cats[Utils.CapitalizeFirstLetter(k)] = data[k]
           });
           opts.Categories.forEach(function(m){ opts.Series[0].data.push(Cats[m]); });
           ChartFactory.SetupLineChart('openItemsChart', opts);
       }

    }
})();
