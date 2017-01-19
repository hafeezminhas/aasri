(function(){
    PolicyFormController.$inject = ['$scope','$rootScope','$state', 'PolicyService', 'Utils'];
    app.controller('PolicyFormCtrl', PolicyFormController);

    function PolicyFormController ($scope, $rootScope, $state, PolicyService, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Policies List";

        $scope.Form = {};

        $scope.VM = {
            assessmentType: [{  asTypeCode: '', asTypeDesc: '' }],
            createdBy:  null,
            createdOn:  null,
            docDesc:    '',
            docName:    '',
            fileModel:  [],
            modifiedBy: null,
            modifiedOn: null
        };

        $scope.submitAction = function(){
            $scope.IsSubmitted = true;
            if($scope.Form.Policy.$pristine || $scope.Form.Policy.$invalid) return false;

            PolicyService.AddPolicy($scope.VM).then(function(res){
                if(res.status === 200) $state.go('app.policy.main');
            });
        };

        $scope.cancelAction = function(){
            console.log($scope.Form.Policy.$pristine);
            $state.go('app.policy.main');
        };

        $rootScope.app.Mask = false;
    }
})();