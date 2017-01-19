(function(){
    DashboardController.$inject = ['$scope','$rootScope','$state', 'ControlService', 'ChartFactory', 'Utils'];
    app.controller('ControlDashboardCtrl', DashboardController);

    function DashboardController ($scope, $rootScope, $state, ControlService, ChartFactory, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Control List Dashboard, Controls being tested";

        ControlService.GetRepoCat().then(function(cdata){
            setupCatChart(cdata);
            return ControlService.GetRepoDef();
        }).then(function(def){
            //setupDefChart(def);
            return ControlService.GetRepoRiskType();
        }).then(function(rts){
            setupRiskTypeChart(rts);
            return ControlService.GetRepoSource();
        }).then(function(srcs){
            setupSourceChart(srcs);
            return ControlService.GetTestPlanCategory();
        }).then(function(srcs){
            setupTPCategoryChart(srcs);
            return ControlService.GetTestPlanPeriod();
        }).then(function(per){
            setupTPPeriodChart(per);
            return ControlService.GetTestPlanRiskType();
        }).then(function(rtdata){
            setupTPRTChart(rtdata);
            return ControlService.GetTestPlanSource();
        }).then(function(srcs){
            setupTPSourceChart(srcs);
            return ControlService.GetTestPlanStatus();
        }).then(function(status){
            setupTPStatusChart(status);
            $rootScope.app.Mask = false;
        });

        function setupCatChart(data){
            // var dataList = [], colors = ['#EDAA09', '#1372DF', '#B00BE5', '#00E219'];
            // Object.keys(data.categories).forEach(function (k) {
            //     dataList.push([data.categories[k], data.bycateogry[k]]);
            // });
            // var chartObj = ChartFactory.CreatePieChartTemplate('Controls By Category', 'Controls By Category', dataList, colors);
            // Highcharts.chart('concatChart', chartObj);

            var opts = {
                Title:  'Risk Type Category',
                Text:  'Risk Type Category',
                Categories: [],
                Series: [{ name: 'Control Risk Categories', data: [] }],
                Colors: ['#B00BE5', '#EDAA09', '#1372DF', '#00E219']
            };

            Object.keys(data.categories).forEach(function(k){
                opts.Categories.push(data.categories[k]);
                opts.Series[0].data.push(data.bycateogry[k]);
            });

            ChartFactory.SetupHorizontalBarChart('concatChart', opts);
        }

        function setupRiskTypeChart(data){
            // var dataList = [], colors = ['#EDAA09', '#B00BE5', '#1372DF', '#E001E2', '#3F19E2'];
            // Object.keys(data.categories).forEach(function (k) {
            //     dataList.push([data.categories[k], data.bycateogry[k]]);
            // });
            // var chartObj = ChartFactory.CreatePieChartTemplate('Controls By Risk Type', 'Controls By Risk Type', dataList, colors);
            // Highcharts.chart('risktChart', chartObj);
            var opts = {
                Title:  'Controls By Risk Type',
                Categories: [],
                Series: 'Risk Type',
                Data : []
            };
            Object.keys(data.categories).forEach(function(k){
                opts.Categories.push(data.categories[k]);
                opts.Data.push(data.bycateogry[k]);
            });

            ChartFactory.SetupColChart('risktChart', opts);
        }

        function setupSourceChart(data){
            var dataList = [], colors = ['#04B100', '#00A0E5', '#00ED33', '#DF5A46'];
            Object.keys(data.categories).forEach(function (k) {
                dataList.push([data.categories[k], data.bysource[k]]);
            });
            var chartObj = ChartFactory.CreatePieChartTemplate('Controls By Source', 'Controls By Source', dataList, colors);
            Highcharts.chart('sourceChart', chartObj);

            // var opts = {
            //     Title:  'Controls By Source',
            //     Categories: [],
            //     Series: 'By Source',
            //     Data : []
            // };
            // Object.keys(data.categories).forEach(function(k){
            //     opts.Categories.push(data.categories[k]);
            //     opts.Data.push(data.bysource[k]);
            // });
            //
            // ChartFactory.SetupColChart('sourceChart', opts);
        }

        function setupDefChart(data){
            var dataList = [], colors = ['#4DEDD3', '#DF5A46', '#E5AF01', '#E2DA10'];
            Object.keys(data.categories).forEach(function (k) {
                dataList.push([data.categories[k], data.byctrldefn[k]]);
            });
            var chartObj = ChartFactory.CreatePieChartTemplate('Controls By Definition', 'Controls By Definition', dataList, colors);
            Highcharts.chart('condefChart', chartObj);
        }

        function setupTPCategoryChart(data) {
            // var dataList = [], colors = ['#EDAA09', '#1372DF', '#B00BE5', '#00E219'];
            // Object.keys(data.categories).forEach(function (k) {
            //     dataList.push([data.categories[k], data.bycateogry[k]]);
            // });
            // var chartObj = ChartFactory.CreatePieChartTemplate('Test Plan Category', 'Test Plan Category', dataList, colors);
            // Highcharts.chart('tpCatChart', chartObj);

            var opts = {
                Title:  'Test Plan Category',
                Categories: [],
                Series: 'Controls Tested By Category',
                Data : []
            };
            Object.keys(data.categories).forEach(function(k){
                opts.Categories.push(data.categories[k]);
                opts.Data.push(data.bycateogry[k]);
            });

            ChartFactory.SetupColChart('tpCatChart', opts);
        }

        function setupTPPeriodChart(data){
            var month, opts = {
                Title: "By Period",
                YText: "Values",
                Categories : [],
                Series: [
                    { name: "High", data: [], color:'#c62733' },
                    { name: "Medium", data: [], color:'#db981f' },
                    { name: "Low", data: [], color:'#00d356' }
                ]

            };

            Object.keys(data).forEach(function(k){
                if(k.indexOf('High')>-1) {
                    month = Utils.camelizeString(k.split('High')[0]);
                    opts.Series[0].data.push(data[k]);
                }
                if(k.indexOf('Med')>-1) {
                    month = Utils.camelizeString(k.split('Med')[0]);
                    opts.Series[1].data.push(data[k]);
                }
                if(k.indexOf('Low')>-1) {
                    month = Utils.camelizeString(k.split('Low')[0]);
                    opts.Series[2].data.push(data[k]);
                }
                if(opts.Categories.indexOf(month)===-1)
                    opts.Categories.push(month);
            });

            //ChartFactory.SetupMultiColChart('tpPerChart', opts);
             var chartObj = ChartFactory.SetupBubbleChart();
             Highcharts.chart('tpPerChart', chartObj);
        }

        function setupTPRTChart(data){
            var dataList = [], colors = ['#EDAA09', '#B00BE5', '#1372DF', '#E001E2', '#3F19E2'];
            Object.keys(data.categories).forEach(function (k) {
                dataList.push([data.categories[k], data.bycateogry[k]]);
            });
            var chartObj = ChartFactory.CreatePieChartTemplate('Controls By Risk Type', 'Controls By Risk Type', dataList, colors);
            Highcharts.chart('tpRTChart', chartObj);
        }

        function setupTPSourceChart(data){
            // var dataList = [], colors = ['#4DEDD3', '#DF5A46', '#E5AF01', '#E2DA10'];
            // Object.keys(data.categories).forEach(function (k) {
            //     dataList.push([data.categories[k], data.bysource[k]]);
            // });
            // var chartObj = ChartFactory.CreatePieChartTemplate('Controls By Source', 'Controls By Source', dataList, colors);
            // Highcharts.chart('tpSrcChart', chartObj);
            var opts = {
                Title:  'Controls By Source',
                Categories: [],
                Series: 'By Source',
                Data : []
            };
            Object.keys(data.categories).forEach(function(k){
                opts.Categories.push(data.categories[k]);
                opts.Data.push(data.bysource[k]);
            });

            ChartFactory.SetupColChart('tpSrcChart', opts);
        }

        function setupTPStatusChart(data){
            var opts = {
                Title:  'Controls By Status',
                Categories: [],
                Series: 'By Source',
                Data : []
            };
            Object.keys(data.categories).forEach(function(k){
                opts.Categories.push(data.categories[k]);
                opts.Data.push(data.bystatus[k]);
            });

            ChartFactory.SetupColChart('tpStChart', opts);
        }
    }
})();