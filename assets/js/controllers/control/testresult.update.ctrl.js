(function(){
    TestResultUpdateController.$inject = ['$scope','$rootScope','$state', , 'ControlService', 'Utils'];
    app.controller('TestResultUpdateCtrl', TestResultUpdateController);

    function TestResultUpdateController ($scope, $rootScope, $state, ControlService, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "RISK CONTROL SELF ASSESSMENTS";

        $scope.Form = {};
        $scope.VM = {
             controlDataModel: [],
             controlMethod: "",
             controlPriority: "",
             controlStatus: "",
             controlsTested: "",
             createdBy: "",
             createdOn: "",
             department: [{
                 area: "",
                 deptId: "",
                 deptName: "",
                 id: ""
            }],
             id: "",
             modifiedBy: "",
             modifiedOn: "",
             regionName: "",
             testCompletedDate: "",
             testDueDate: "",
             testFrequency: "",
             testPlans: "",
             testResultName: "",
             testResults: "",
             testresultFileModel: []
        };


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
            if($scope.Form.CtrlRepo.$invalid) return false;
            //Form Post to go here.
        };

        $scope.cancelAction = function() {
            if($scope.Form.CtrlRepo.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Are you sure you want to cancel?", "Yes", "No");
                confirm.result.then(function(){ $state.go('app.control.testresult.main'); });
                return false;
            }
            $state.go('app.control.testresult.main');
        };

        $rootScope.app.Mask = false;
    }
})();