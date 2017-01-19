(function(){
    RepoFormController.$inject = ['$scope','$rootScope','$state', 'ControlService', 'Utils'];
    app.controller('RepoFormCtrl', RepoFormController);

    function RepoFormController ($scope, $rootScope, $state, ControlService, Utils){
       $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Control Data Repository";
        $scope.Form = {};

        $scope.VM = {
             active: "",
             businessProcess: "",
             controlCategory: "",
             controlDescription: "",
             controlEffectiveEnddate: "",
             controlEffectiveStartdate: "",
             controlFrequency: "",
             controlName: "",
             controlOwner: "",
             controlRefID: "",
             controlSource: "",
             controlTestPlan: "",
             controlType: "",
             controlVersionNumber: "",
             controldataFileModel: [],
             createdBy: "",
             createdOn: "",
             isEditable: "",
             modifiedBy: "",
             modifiedOn: "",
             natureOfControl: "",
             riskTypes: "",
             subprocess: "",
             supportingITApplication: ""
        };

        $scope.submitAction = function(){
            if($scope.Form.CtrlRepo.$invalid) return false;
            ControlService.AddRepo($scope.VM).then(function(res){
                if(res.status===200) $state.go('app.control.repo.main');
            });
        };

        $scope.cancelAction = function(){
            if($scope.Form.CtrlRepo.$dirty){
                var confirm = Utils.CreateConfirmModal("Confirmation", "Are you sure you want to cancel?", "Yes", "No");
                confirm.result.then(function(){ $state.go('app.control.repo.main'); });
                return false;
            }
            $state.go('app.control.repo.main');
        };

        ControlService.GetUsers().then(function (users) {
            $scope.Users = users;
            $rootScope.app.Mask = false;
        });
    }
})();