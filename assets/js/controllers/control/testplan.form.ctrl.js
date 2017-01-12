(function(){
    TestPlanFormController.$inject = ['$scope','$rootScope','$state', 'OPRiskService', 'Utils'];
    app.controller('TestPlanFormCtrl', TestPlanFormController);

    function TestPlanFormController ($scope, $rootScope, $state, OPRiskService, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Control Test Plan";

        $scope.Form = {};
        $scope.VM = {
             controlMethod: "",
             controlPriority: "",
             controlStatus: "",
             createdBy: "",
             createdOn: "",
             department: [
                {
                     area: "",
                     deptId: "",
                     deptName: "",
                     id: "string"
                }
             ],
             id: "",
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
                    c.modifiedOn = Utils.createDate(c.modifiedOn);
                });
                var controlModal = Utils.CreateSelectListView("Select Controls", data, headers, cols);
                controlModal.result.then(function(list){
                    $scope.VM.controlDataModel = $scope.VM.controlDataModel.concat(list);
                });
                $rootScope.app.Mask = false;
            });
        };

        $scope.submitAction = function() {
            if($scope.Form.CtrlRepo.$invalid) return false;
            //Form Post to go here.
        };

        $scope.cancelAction = function() {
            if($scope.Form.CtrlRepo.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Are you sure you want to cancel?", "Yes", "No");
                confirm.result.then(function(){ $state.go('app.control.testplan.main'); });
                return false;
            }
            $state.go('app.control.testplan.main');
        };

        $rootScope.app.Mask = false;
    }
})();