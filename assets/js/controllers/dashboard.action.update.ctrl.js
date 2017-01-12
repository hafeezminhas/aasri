/**
 * Created by Jafeez on 11/01/2017.
 */
(function(){
    ActionFormController.$inject = ['$scope','$rootScope','$state', '$stateParams', 'AuditService', 'Utils'];
    app.controller('DashActionUpdateCtrl', ActionFormController);

    function ActionFormController ($scope, $rootScope, $state, $stateParams, AuditService, Utils){
        $scope.mainTitle = $state.current.title;
        $scope.mainDesc = "Control Test Plan";

        $scope.Form = {};

        $scope.submitAction = function() {
            if($scope.Form.CtrlRepo.$invalid) return false;
            ControlService.UpdateTestPlans($stateParams, $scope.VM).then(function (res) {
                if(res.status===200) $state.go('app.control.teestplan.main');
            });
        };

        $scope.cancelAction = function() {
            if($scope.Form.CtrlRepo.$dirty) {
                var confirm = Utils.CreateConfirmModal("Confirmation", "Are you sure you want to cancel?", "Yes", "No");
                confirm.result.then(function(){ $state.go('app.dashboard'); });
                return false;
            }
            $state.go('app.dashboard');
        };

        $scope.VM = {};

        var actionModel;
        var submodels = {};
        AuditService.GetAction($stateParams.id).then(function (data) {
            actionModel = data;
            return AuditService.GetTopic(actionModel.topicid);
        }).then(function(topic){
            submodels.Topic = topic;
            return AuditService.GetAudit(actionModel.auditId);
        }).then(function(audit){
            submodels.Audit = audit;
            return AuditService.GetFinding(actionModel.findingId);
        }).then(function(finding){
            submodels.Finding = finding;
            $rootScope.app.Mask = false;
        }, function(err){
            $rootScope.app.Mask = false;
        });
    }
})();