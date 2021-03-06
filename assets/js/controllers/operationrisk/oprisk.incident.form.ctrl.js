(function(){

    "use strict";

    OprIncFormController.$inject = ['$scope','$rootScope','$state', 'OPRiskService', 'Utils'];
    app.controller('OprIncidentFormCtrl', OprIncFormController);


    function OprIncFormController($scope, $rootScope, $state, OPRiskService, Utils){

        $scope.mainTitle = $state.current.title || 'loading';
        $scope.mainDesc = "Add new operational risk incident";

        $scope.Form = {};
        $scope.RiskCategories = { List: [], SelCount: 0 };

        $scope.Lookups = {};
        $scope.VM = {
             asTypeCode: "",
             auditFileModel: [],
             baselLevel1: "",
             baselLevel2: "",
             causalCategory: "",
             controlDataModel: [],
             controlDescription: "",
             controlName: "",
             controlStatus: "",
             createdBy: "Alan",
             createdOn: "",
             geographicImpact: "",
             identifiedDate: "",
             impactedProcName: "",
             inherentImpact: "",
             inherentRiskRating: "",
             issueOutstanding: "",
             legalEntTier1Impact: "",
             legalEntTier2Impact: "",
             modifiedBy: "",
             modifiedOn: "",
             operationalLoss: "",
             policiesData: [],
             potentialImpact: "",
             processDescription: "",
             rcsaName: "",
             rcsaStatus: "",
             remeDate: "",
             remeOwner: "",
             remePlan: "",
             remeStatus: "",
             reportFrequency: "",
             reportRecipients: "",
             residualRisk: "",
             riskAccepted: "",
             riskCategory: "",
             riskDescription: "",
             riskDirection: "",
             riskMonitor: "",
             riskSeverity: "",
             secondaryRiskImpact: ""
        };

        $scope.setOpt = function(op){
            op.Selected = !op.Selected;
            if(op.Selected){
                $scope.VM.riskCategory = op.Label;
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
                    c.modifiedOn = c.modifiedOn? new Date(c.modifiedOn) : "";
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
            if($scope.Form.OpIncident.$invalid || $scope.Form.OpIncident.$pristine) return false;
            OPRiskService.AddIncident($scope.VM).then(function(res){
                if(res.status===200) $state.go('app.oprisk.incident.main');
            });
        };

        $scope.cancelAction = function(){
            if($scope.Form.OpIncident.$dirty){
                var confirm = Utils.CreateConfirmModal("Confirmation", "Are you sure you want to cancel?", "Yes", "No");
                confirm.result.then(function(){ $state.go('app.oprisk.incident.main'); });
                return false;
            }
            $state.go('app.oprisk.incident.main');
        };

        OPRiskService.GetRiskCategories()
            .then(function(data){
                Object.keys(data.categories).forEach(function(c){
                    $scope.RiskCategories.List.push({  Key: c, Label: data.categories[c], Selected: false });
                });
                $rootScope.app.Mask = false;
            });

    }
})();