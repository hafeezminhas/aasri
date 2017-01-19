app.service('ControlService', function($rootScope, APIHandler, Utils){

  this.GetRepos = function(size, page){
    size = size || 10;
    page = page || 1;
    return APIHandler.Get('crtls/repository?pagesize='+size+'&pageNumber='+page);
  };

  this.GetRepo = function(id){
    return APIHandler.Get('crtls/repository/'+id);
  };

  this.GetRepoCat = function(){
    return APIHandler.Get('crtls/repository/category');
  };

  this.GetRepoDef = function(){
    return APIHandler.Get('crtls/repository/definition');
  };

  this.GetRepoRiskType = function(){
    return APIHandler.Get('crtls/repository/risktype');
  };

  this.GetRepoSource = function(){
    return APIHandler.Get('crtls/repository/source');
  };

  this.AddRepo = function(params){
    return APIHandler.Post('crtls/repository', params);
  };

  this.DeleteRepo = function(id){
    return APIHandler.Delete('crtls/repository/' + id);
  };

  this.UpdateRepo = function(id, params){
    return APIHandler.Put('crtls/repository/'+id, params);
  };

  this.GetTestPlans = function(size, page){
    return APIHandler.Get('crtls/testPlans?pagesize='+size+'&pageNumber='+page);
  };

  this.GetTestPlan = function(id){
    return APIHandler.Get('crtls/testPlans/'+id);
  };

  this.AddTestPlans = function(params){
    return APIHandler.Post('crtls/testPlans', params);
  };

  this.DeleteTestPlans = function(id){
    return APIHandler.Delete('crtls/testPlans/'+id);
  };

  this.UpdateTestPlans = function(id, params){
    return APIHandler.Put('crtls/testPlans/'+id, params);
  };

  this.GetTestPlanCategory = function(){
      return APIHandler.Get('crtls/testPlans/category');
  };

  this.GetTestPlanPeriod = function(){
      return APIHandler.Get('crtls/testPlans/period');
  };

  this.GetTestPlanRiskType = function(){
      return APIHandler.Get('crtls/testPlans/risktype');
  };

  this.GetTestPlanSource = function(){
      return APIHandler.Get('crtls/testPlans/source');
  };

  this.GetTestPlanStatus = function(){
      return APIHandler.Get('crtls/testPlans/status');
  };

  this.GetTestResults = function(size, page){
      return APIHandler.Get('crtls/testResults?pagesize='+size+'&pageNumber='+page);
  };

  this.GetTestResult = function(id){
      return APIHandler.Get('crtls/testResults/'+id);
  };

  this.AddTestResults = function(params){
      return APIHandler.Post('crtls/testResults', params);
  };

  this.DeleteTestResults = function(id){
      return APIHandler.Delete('crtls/testResults/'+id);
  };

  this.UpdateTestResults = function(id, params){
      return APIHandler.Put('crtls/testResults/'+id, params);
  };

  this.GetUsers = function(){
    return APIHandler.Get('users');
  };

});
