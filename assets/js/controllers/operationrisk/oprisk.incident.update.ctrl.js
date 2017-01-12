(function(){

    "use strict";

    OprIncFormController.$inject = ['$scope','$rootScope','$state', '$stateParams', 'OPRiskService', 'Utils'];
    app.controller('OprIncidentUpdateCtrl', OprIncFormController);


    function OprIncFormController($scope, $rootScope, $state, $stateParams, OPRiskService, Utils){

        $scope.mainTitle = $state.current.title || 'loading';
        $scope.mainDesc = "Add new operational risk incident";

        $scope.Form = {};
        $scope.RiskCategories = { List: [], SelCount: 0 };

        $scope.dpOptions = {
            format: 'dd-mm-yyyy',
            autoclose: true
        };

        $scope.setOpt = function(op){
            op.Selected = !op.Selected;
            if(op.Selected){
                $scope.RiskCategories.SelCount++;
            } else {
                $scope.RiskCategories.SelCount--;
            }
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

        $scope.addPolicyDocs = function(){
            var headers= ["Document Name", "Description", "Type", "File Name"],
                cols = ["docName", "docDesc", "docType", "fileName"];

            $rootScope.app.Mask = true;
            OPRiskService.GetPolicyDocs(10, 1).then(function(data){
                data.forEach(function(c, i){
                    c.Selected = false;
                    c.docType = c.assessmentType[0]? c.assessmentType[0].asTypeDesc : "";
                    c.fileName = c.fileModel[0]? c.fileModel[0].fileName : "";
                });
                var polModal = Utils.CreateSelectListView("Select Policy Documents", data, headers, cols);
                polModal.result.then(function(list){
                    $scope.VM.policiesData = $scope.VM.policiesData.concat(list);
                });
                $rootScope.app.Mask = false;
            });
        };

        $scope.setAll = function(val){
            $scope.RiskCategories.List.forEach(function(op){
                op.Selected = val;
            });
            $scope.RiskCategories.SelCount = val? $scope.RiskCategories.List.length : 0;
        };

        $scope.removeItem = function(type, idx) {
            $scope.VM[type].splice(idx, 1);
        };

        $scope.submitAction = function(){
            if($scope.Form.OpIncident.$invalid || $scope.Form.OpIncident.pristine) return false;
            OPRiskService.UpdateIncident($stateParams.id, $scope.VM).then(function(res){
                if(res.status===200) $state.go('app.oprisk.incident.main');
            });
        };

        OPRiskService.GetRiskIncident($stateParams.id).then(function(data){
            $scope.VM = data;
            return OPRiskService.GetRiskCategories()
        }).then(function(data){
            Object.keys(data.categories).forEach(function(c){
                $scope.RiskCategories.List.push({  Key: c, Label: data.categories[c], Selected: false });
            });
            $rootScope.app.Mask = false;
        });

    }
})();