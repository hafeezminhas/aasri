(function(){
    TestPlanFormController.$inject = ['$scope','$rootScope','$state', 'OPRiskService', 'ControlService', 'Utils'];
    app.controller('TestPlanFormCtrl', TestPlanFormController);

    function TestPlanFormController ($scope, $rootScope, $state, OPRiskService, ControlService, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Control Test Plan";

        $scope.Form = {};
        $scope.VM = {
            controlDataModel: [],
             controlMethod: "",
             controlPriority: "",
             controlStatus: "",
             createdBy: "",
             createdOn: "",
             department: [],
             modifiedBy: "",
             modifiedOn: "",
             regionName: "",
             testDueDate: "",
             testPlanDesc: "",
             testPlanFile: "",
             testPlanName: "",
             testplanFileModel: []
        };

        $scope.addControls = function(){
            var headers= ["Control Category", "Control ID", "Control Name", "Control Source", "Business Procee", "Owner"],
                cols =["controlCategory", "controlRefID", "controlName", "controlSource", "businessProcess", "controlOwner"];

            $rootScope.app.Mask = true;
            OPRiskService.GetControlData().then(function(data){
                data.forEach(function(c, i){
                    c.Selected = false;
                    c.modifiedOn = new Date(c.modifiedOn);
                });
                var controlModal = Utils.CreateSelectListView("Select Controls", data, headers, cols);
                controlModal.result.then(function(list){
                    $scope.VM.controlDataModel = $scope.VM.controlDataModel.concat(list);
                });
                $rootScope.app.Mask = false;
            });
        };

        $scope.removeItem = function(type, idx) {
            $scope.VM[type].splice(idx, 1);
        };

        $scope.submitAction = function() {
            if($scope.Form.TestPlan.$invalid || $scope.Form.TestPlan.$pristine) return false;
            ControlService.AddTestPlans($scope.VM).then(function(res){
                if(res.status===200) $state.go('app.control.testplan.main');
            });
        };

        $scope.cancelAction = function() {
            if($scope.Form.TestPlan.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Are you sure you want to cancel?", "Yes", "No");
                confirm.result.then(function(){ $state.go('app.control.testplan.main'); });
                return false;
            }
            $state.go('app.control.testplan.main');
        };

        $rootScope.app.Mask = false;
    }
})();


/*

 1. Criticality is mapped to control_priority
 2. Test Method is mapped to control_method
 3. Test Result Description is mapped to test_plans

 4. Next Due Date (Date Object - epoch time) was missing and I have added it to the model so you will see after I push changes to server.
 5. Test Plan Frequency was missing and I have added it to the model so you will see after I push changes to server.

 */