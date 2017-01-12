app.service('ControlService', function($rootScope, APIHandler, Utils){

  this.GetRepos = function(size, page){
    size = size || 10;
    page = page || 1;
    return APIHandler.Get('crtls/repository?pagesize='+size+'&pageNumber='+page);
  };

  this.GetRepo = function(id){
    return APIHandler.Get('crtls/repository/'+id);
  };

  this.AddRepo = function(){
    return APIHandler.Post('crtls/repository');
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
    return APIHandler.Post('crtls/testPlans/'+params);
  };

  this.DeleteTestPlans = function(id){
    return APIHandler.Delete('crtls/testPlans/'+id);
  };

  this.UpdateTestPlans = function(id, params){
    return APIHandler.Put('crtls/testPlans/'+id, params);
  };

  this.GetTestResults = function(size, page){
      return APIHandler.Get('crtls/testResults?pagesize='+size+'&pageNumber='+page);
  };

  this.GetTestResult = function(id){
      return APIHandler.Get('crtls/testResults/'+id);
  };

  this.AddTestResults = function(params){
      return APIHandler.Post('crtls/testResults/'+params);
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
