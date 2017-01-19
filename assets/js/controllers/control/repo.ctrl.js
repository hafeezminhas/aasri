(function(){
    "use strict";
    RepoController.$inject = ['$scope','$rootScope','$state', 'ControlService', 'ExportFactory', 'Utils'];
    app.controller('RepoCtrl', RepoController);

    function RepoController ($scope, $rootScope, $state, ControlService, ExportFactory, Utils){
       $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Add Edit Search Delete & Download Controls";

        $scope.CurrCol = 'riskName';
        $scope.IsAsc = true;
        $scope.OpList = [10, 25, 50, 100];
        $scope.PerPage = 10;
        $scope.CheckAll = false;

        $scope.selectAll = function(){
            angular.forEach($scope.CheckList, function(check, i) {
                $scope.CheckList[i] = $scope.CheckAll;
            });
        };

        $scope.exportTable = function(){
            //var heading = ["Control Category", "Control Ref ID", "Control Source", "Business Process", "Sub-process", "Control Version Number", "Active", "Control Effective Startdate", "Control Effective Enddate", "Control Name", "Control Description", "Control Type", "Nature of Control", "Supporting IT application", "Control Frequency", "Control Owner", "Control Test Plan", "Risk Type"],
            var heading =  {
                    controlCategory: "Control Category",
                    controlRefID: "Control Ref ID",
                    controlSource: "Control Source",
                    businessProcess: "Business Process",
                    subProcess: "Sub-process",
                    controlVersionNumber: "Control Version Number",
                    active: "Active",
                    controlEffectiveStartdate: "Control Effective Startdate",
                    controlEffectiveEnddate: "Control Effective Enddate",
                    controlName: " Control Name",
                    controlDescription: "Control Description",
                    controlType: "Control Type",
                    natureOfControl: "Nature of Control",
                    supportingITApplication: "Supporting IT application",
                    controlFrequency: "Control Frequency",
                    controlOwner: "Control Owner",
                    controlTestPlan: "Control Test Plan",
                    riskTypes: "Risk Type"
                }, rows = [];

            $scope.CheckList.forEach(function(ch, i){ if(ch)  rows.push(getTableRow($scope.Repos[i])); });
            if(!rows.length){
                Utils.ShowNotification("No Repos Selected", "Please select some rows to be exported", "info");
                return false;
            }
            ExportFactory.DownloadXLSX(rows, heading, 'Control Repo List', 'repos_list');
        };

        function getTableRow(repo){
            return {
                controlCategory: repo.controlCategory,
                controlRefID: repo.controlRefID,
                controlSource: repo.controlSource,
                businessProcess: repo.businessProcess,
                subProcess: repo.subProcess,
                controlVersionNumber: repo.controlVersionNumber,
                active: repo.active,
                controlEffectiveStartdate: new Date(repo.controlEffectiveStartdate),
                controlEffectiveEnddate: new Date(repo.controlEffectiveEnddate),
                controlName: repo.controlName,
                controlDescription: repo.controlDescription,
                controlType: repo.controlType,
                natureOfControl: repo.natureOfControl,
                supportingITApplication: repo.supportingITApplication,
                controlFrequency: repo.controlFrequency,
                controlOwner: repo.controlOwner,
                controlTestPlan: repo.controlTestPlan,
                riskTypes: repo.riskTypes
            };
        }

        $scope.$watch('PerPage', function(n, o){
            $rootScope.app.Mask = true;
            loadRepos();
        });

        $scope.sortMe = function(col){
            if($scope.CurrCol === col)
                $scope.IsAsc = !$scope.IsAsc;
            else
                $scope.CurrCol = col;
        };

        $scope.resSort = function(col){
            if($scope.CurrCol === col){
                return $scope.IsAsc? 'fa-sort-up' : 'fa-sort-down';
            } else {
                return 'fa-unsorted';
            }
        };

        $scope.delete = function(r){
            var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are u sure you want to delete the seleced item?", "Yes", "No");
            confirmation.result.then(function () {
                $rootScope.app.Mask = true;
                ControlService.DeleteRepo(r.id).then(function(data){
                    if(data.status===200) loadRepos();
                });
            }, function(){ $rootScope.app.Mask = false; });
        };

        function loadRepos(){
            $scope.CheckList = [];
            ControlService.GetRepos($scope.PerPage, $scope.CurrPage).then(function (data) {
                data.forEach(function(r,i){ $scope.CheckList[i] = false;  });
                $scope.Repos = data;
                $rootScope.app.Mask = false;
            });
        }
    }
})();