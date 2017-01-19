app.service('Utils', function($q, $http, $uibModal){

    this.handleError = function(err){
        console.error("This Error has occured", err);
    };

    /*
    *  --- Start: Random Colors and Integers Functions
    */

    function randomRGBComponent() {
        return Math.round(Math.random() * 255);
    }

    this.RandomRGBColor = function () {
        return 'rgb(' + randomRGBComponent() + ', ' + randomRGBComponent() + ', ' + randomRGBComponent() + ')';
    };

    /* ----------- End ------------ */

    this.camelizeString = function(inStr){
        var str = inStr.replace(/[_-]/g, " "), result = [];
        str = str.split(' ');
        str.forEach(function(s){
            result.push(s[0].toUpperCase() + s.substr(1));
        });
        result = result.join(' ');
        return result;
    };

    this.CapitalizeFirstLetter = function (str) {
        if(!str || !str.length) return false;
        str = str.split('');
        str[0] = str[0].toUpperCase();
        str = str.join('');

        return str;
    };

    this.removeLastWord = function(str){
        var res = str.split(" ");
        res.pop();
        return res.join(" ");
    };

    this.createDate = function(dtObj){
        var result = new Date();
        result.setFullYear(dtObj.year);
        result.setMonth(dtObj.monthValue);
        result.setDate(dtObj.dayOfMonth);

        return result;
    };

    this.GetMonthIndex = function(month){
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months.indexOf(month);
    };

    this.GetLast12Month = function(offset){
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        months = months.concat(months);
        var currMonth  = (new Date()).getUTCMonth();
        var result = [];
        var start = currMonth+12, end = start-offset;
        for(var i=start; i>=end; i--){
            result.push(months[Math.abs(i)]);
        }

        return result.reverse();
    };

    this.GetDPDate = function(dt){
        dt = new Date(dt);
        return (dt.getUTCMonth()+1) + '-' + dt.getDate() + '-' + dt.getFullYear();
    };


    //All Application Utility Dialogues and Modals to launch from here.

    this.CreateConfirmModal = function (title, quest, ok, cancel) {

        return $uibModal.open({
            templateUrl: 'confirm.tpl.html',
            controller: 'ConfirmDialogueCtrl',
            size: 'md',
            resolve: {
                items: function () {
                    return {
                        Title: title,
                        Question: quest,
                        Actions: {
                            Ok: ok,
                            Cancel: cancel
                        }
                    };
                }
            }
        });
    };

    this.ShowNotification = function (title, message, type) {

        var types = {
            info: 'fa-info-circle',
            error: 'fa-times',
            warning: 'fa-alert'
        };

        var notification =  $uibModal.open({
            templateUrl: 'notification.tpl.html',
            controller: 'NotificationCtrl',
            size: 'md',
            resolve: {
                items: function () {
                    return {
                        Title: title,
                        Message: message,
                        Icon: types[type],
                        Type: type
                    };
                }
            }
        });
    };

    this.CreateSelectListView = function (name, data, headers, cols) {

        return $uibModal.open({
            templateUrl: 'multiselectlist.tpl.html',
            controller: 'SelectListCtrl',
            size: 'lg',
            resolve: {
                items: function () {
                    return {
                        Title: name || '',
                        Headers: headers,
                        Columns: cols,
                        List: data
                    };
                }
            }
        });
    };

});