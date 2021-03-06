(function(){
    ITRiskAssFormController.$inject = ['$scope','$rootScope','$state', '$stateParams', 'ITRiskService', 'Utils'];
    app.controller('ITRiskAssUpdateCtrl', ITRiskAssFormController);

    function ITRiskAssFormController ($scope, $rootScope, $state, $stateParams, ITRiskService, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Update IT RISK ASSESSMENTS";

        $scope.Form =  {};

        $scope.submitAction = function(){
            if($scope.Form.ITRAM.$invalid) return false;
            ITRiskService.UpdateRam($stateParams.id, $scope.VM).then(function(res){
                if(res.status === 200) $state.go('app.itrisk.assessment.main');
            });
        };

        $scope.cancelAction = function(){
            if($scope.Form.ITRAM.$dirty){
                var confirm = Utils.CreateConfirmModal("Confirmation", "Are you sure you want to cancel?", "Yes", "No");
                confirm.result.then(function(){ $state.go('app.oprisk.assessment.main'); });
                return false;
            }
            $state.go('app.oprisk.assessment.main');
        };

        ITRiskService.GetRamById($stateParams.id).then(function(data){
            $scope.dueDate = (data.due_date)? new Date(data.due_date) : '';
            $scope.VM = data;
            $rootScope.app.Mask = false;
        });
    }
})();