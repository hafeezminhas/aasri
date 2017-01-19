(function(){
    TestResultUpdateController.$inject = ['$scope','$rootScope','$state', '$stateParams', 'ControlService', 'Utils'];
    app.controller('TestResultUpdateCtrl', TestResultUpdateController);

    function TestResultUpdateController ($scope, $rootScope, $state, $stateParams, ControlService, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "RISK CONTROL SELF ASSESSMENTS";

        $scope.Form = {};

        $scope.addTestPlan = function(){

            console.log("Getsss");
            var headers= ["Test Plan", "Region", "Status", "File Name", "Test Due Date", "Priority"],
                cols =["testPlanName", "regionName", "controlStatus", "fileName", "dueDate", "controlPriority"];

            $rootScope.app.Mask = true;
            ControlService.GetTestPlans(10, 1).then(function(data){
                data.forEach(function(c, i){
                    c.Selected = false;
                    c.fileName = c.testplanFileModel.length? "See attached": "None";
                    c.dueDate = c.testDueDate? moment(Utils.createDate(c.testDueDate)).format('DD/MM/YYYY'):'None';
                });
                var controlModal = Utils.CreateSelectListView("Select Controls", data, headers, cols);
                controlModal.result.then(function(list){
                    $scope.VM.testresultFileModel = $scope.VM.testresultFileModel.concat(list);
                });
                $rootScope.app.Mask = false;
            });
        };

        $scope.removeItem = function(type, idx) {
            $scope.VM[type].splice(idx, 1);
        };

        $scope.submitAction = function() {
            if($scope.Form.TestResult.$invalid) return false;
            ControlService.UpdateTestResults($stateParams.id, $scope.VM).then(function(res){
                if(res.status===200) $state.go('app.control.testresult.main');
            });
        };

        $scope.cancelAction = function() {
            if($scope.Form.TestResult.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Are you sure you want to cancel?", "Yes", "No");
                confirm.result.then(function(){ $state.go('app.control.testresult.main'); });
            }
        };

        ControlService.GetTestResult($stateParams.id).then(function(data){
            $scope.VM = data;
            $rootScope.app.Mask = false;
        });
    }
})();