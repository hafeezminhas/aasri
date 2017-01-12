(function(){
    PolicyFormController.$inject = ['$scope','$rootScope','$state', '$stateParams', 'PolicyService', 'Utils'];
    app.controller('PolicyUpdateCtrl', PolicyFormController);

    function PolicyFormController ($scope, $rootScope, $state, $stateParams, PolicyService, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Policies List";

        $scope.Form = {};

        $scope.submitAction = function(){
            $scope.IsSubmitted = true;
            if($scope.Form.Policy.$pristine || $scope.Form.Policy.$invalid) return false;

            PolicyService.UpdatePolicy($stateParams.id, $scope.VM).then(function(res){
                if(res.status === 200) $state.go('app.policy');
            });
        };

        $scope.cancelAction = function(){
            console.log($scope.Form.Policy.$pristine);
            $state.go('app.policy');
        };

        PolicyService.GetPolicy($stateParams.id).then(function(data){
            $scope.VM = data;
            $rootScope.app.Mask = false;
        });
    }
})();