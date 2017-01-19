 (function(){
    TestPlanController.$inject = ['$scope','$rootScope','$state', 'ControlService', 'Utils'];
    app.controller('TestPlanCtrl', TestPlanController);

    function TestPlanController ($scope, $rootScope, $state, ControlService, Utils){
       $scope.mainTitle = $state.current.title;
       $scope.mainDesc = "Control Test Plan";

        $scope.CurrCol = 'riskName';
        $scope.IsAsc = true;

        $scope.OpList = [10, 25, 50, 100];
        $scope.PerPage = 10;
        $scope.CurrPage = 1;

        $scope.$watch('PerPage', function(n, o){
            $rootScope.app.Mask = true;
            loadTestPlans();
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

        $scope.delete = function(tp){
            var confirmation = Utils.CreateConfirmModal("Confirm Deletion", "Are u sure you want to delete the seleced item?", "Yes", "No");
            confirmation.result.then(function () {
                $rootScope.app.Mask = true;
                console.log(tp);
                ControlService.DeleteTestPlans(tp.id).then(function(data){
                    if(data.status===200) loadTestPlans();
                });
            }, function(){ $rootScope.app.Mask = false; });
        };

        function loadTestPlans(){
            ControlService.GetTestPlans($scope.PerPage, $scope.CurrPage).then(function (data) {
                data.forEach(function(tp){
                    tp.deptName = tp.department[0].deptName;
                });
                $scope.TestPlans = data;
                $rootScope.app.Mask = false;
            });
        }

    }
})();