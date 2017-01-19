(function(){
    "use strict";


    app.factory('ChartFactory', function($rootScope, $filter, Utils){

        function ChartFactory(){ this.name = "Chart Factory" }
        ChartFactory.prototype.constructor = ChartFactory;

        /*
         *  High Chart related functions
         */
        ChartFactory.prototype.CreatePieChartTemplate = function(title, name, data, cols){
            if(cols && cols.length) Highcharts.getOptions().plotOptions.pie.colors = cols;
            return {
                chart: {
                    type: 'pie',
                    options3d: { enabled: true, alpha: 45, beta: 0 }
                },
                title: { text: title },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },
                series: [{ type: 'pie', name: name, data: data }]
            };
        };

        ChartFactory.prototype.StatusChart = function(container){
            return new Highcharts.Chart({
                colors: ['#FFFF33', '#A0341F',  '#739113'],
                chart: {
                    renderTo: container,
                    spacingBottom: 15,
                    spacingTop: 10,
                    spacingLeft: 10,
                    spacingRight: 10,
                    width: 280,
                    height: 270
                },
                title: { text: '', x: 0 , style: { font: '20px TimesNewRoman', color : 'black' } },
                subtitle: { x: 0 },
                xAxis: { categories: jsondata[0] },
                yAxis: {
                    min:0,
                    allowDecimals: false,
                    title: {
                        text: 'Count'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: ''
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'Low',
                    data: jsondata[1]
                }, {
                    name: 'Medium',
                    data: jsondata[2]
                }, {
                    name: 'High',
                    data: jsondata[3]
                }]
            });
        };

        ChartFactory.prototype.SetupStackedChart = function(config){

            //if(config.Colors) Highcharts.getOptions().plotOptions.bar.colors = config.Colors;

            return {
                chart: { type: 'bar' },
                title: { text: config.Text },
                xAxis: {
                    categories: config.Categories
                },
                yAxis: {
                    min: 0,
                        title: { text: config.Title }
                },
                legend: {  reversed: false },
                plotOptions: {
                    series: { stacking: 'normal' }
                },
                series: config.Series,
                colors: config.Colors
            };
        };

        ChartFactory.prototype.SetupMultiColChart = function(el, opts){

            var chartObj = {
                chart: { type: 'column' },
                xAxis: {  categories: opts.Categories },
                yAxis: {
                    min: 0,
                    title: {
                        text: opts.YText
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: opts.Series
            };

            if(opts.Title) chartObj['title'] =  { text: opts.Title };
            if(opts.Text) chartObj['subtitle'] = { text: opts.Text };
            if(opts.Colors) chartObj.colors = opts.Colors;

            Highcharts.chart(el, chartObj);
        };

        ChartFactory.prototype.SetupHorizontalBarChart = function(el, opts){

            var chartObj = {
                chart: { type: 'bar' },
                title: { text: opts.Title },
                subtitle: { text: opts.Subtext },
                xAxis: {
                    categories: opts.Categories,
                    title: { text: null }
                },
                yAxis: {
                    min: 0,
                    title: { text: opts.Text, align: 'high' },
                    labels: { overflow: 'justify' }
                },
                tooltip: { valueSuffix: ' millions' },
                plotOptions: {
                    bar: { dataLabels: { enabled: true } }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series:opts.Series,
                colors: opts.Colors
            };

            Highcharts.chart(el, chartObj);
        };


        ChartFactory.prototype.SetupColChart = function(el, opts){

            var chartObj = {
                chart: {
                    renderTo: el,
                    type: 'column',
                    options3d: {
                        enabled: true,
                        alpha: 0,
                        beta: -20,
                        depth: 100,
                        viewDistance: 25
                    }
                },
                title: { text: opts.Title },
                xAxis: { categories: opts.Categories },
                yAxis: { title: { text: 'Level' } },
                series: [{ name: opts.Series, data: opts.Data }]
            };

            Highcharts.chart(chartObj);
        };

        ChartFactory.prototype.SetupBubbleChart = function(opts){
            return {
                chart: { type: 'bubble', plotBorderWidth: 1, zoomType: 'xy' },
                title: { text: 'Highcharts bubbles with radial gradient fill' },
                xAxis: { gridLineWidth: 1 },
                yAxis: { startOnTick: false, endOnTick: false },
                series: [{
                    data: [
                        [9, 81, 63],
                        [98, 5, 89],
                        [51, 50, 73],
                        [41, 22, 14],
                        [58, 24, 20],
                        [78, 37, 34],
                        [55, 56, 53],
                        [18, 45, 70],
                        [42, 44, 28],
                        [3, 52, 59],
                        [31, 18, 97],
                        [79, 91, 63],
                        [93, 23, 23],
                        [44, 83, 22]
                    ],
                    marker: {
                        fillColor: {
                            radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                            stops: [
                                [0, 'rgba(255,255,255,0.7)'],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get('rgba')]
                            ]
                        }
                    }
                }]
            };

        };

        ChartFactory.prototype.SetupLineChart = function(el, opts){

            var chartObj = {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: opts.Title
                },
                subtitle: {
                    text: opts.SubTitle
                },
                xAxis: {
                    categories: opts.Categories
                },
                yAxis: {
                    title: {
                        text: opts.YTitle
                    }
                },
                plotOptions: {
                    spline: {
                        dataLabels: { enabled: true },
                        lineWidth: 3,
                        states: { hover: { lineWidth: 4 } },
                        marker: { enabled: false }
                    }
                },
                series: opts.Series
            };

            Highcharts.chart(el, chartObj);
        };

        ChartFactory.prototype.SetupRegionChart = function(el, data, opts){
            var serTypes = { approved: 'Approved', completed: 'Completed', in_progress: 'In Progress', ready_to_approve: 'Ready to Approve', submitted: 'Submitted', to_approve: 'To Approve' };
            var cats = [], currCats = [];
            var serList = [
                { name: 'Approved', data: [] },
                { name: 'Completed', data: [] },
                { name: 'In Progress', data: [] },
                { name: 'Ready to Approve', data: [] },
                { name: 'Submitted', data: [] },
                { name: 'To Approve', data: [] }
            ];

            Object.keys(serTypes).forEach(function(ck){
                cats.push(ck);
            });

            cats.forEach(function(cat, i){
                currCats = $filter('filter')(Object.keys(data), cat);
                currCats.forEach(function(c){
                    if(c.indexOf(' approved')>-1) {
                        serList[0].data.push(data[c]);
                    }
                    if(c.indexOf(' completed')>-1) {
                        serList[1].data.push(data[c]);
                    }
                    if(c.indexOf(' in_progress')>-1) {
                        serList[2].data.push(data[c]);
                    }
                    if(c.indexOf(' ready_to_approve')>-1) {
                        serList[3].data.push(data[c]);
                    }
                    if(c.indexOf(' submitted')>-1) {
                        serList[4].data.push(data[c]);
                    }
                    if(c.indexOf(' to_approve')>-1) {
                        serList[5].data.push(data[c]);
                    }
                });
            });

            cats.forEach(function(c, i){ cats[i] = serTypes[c]; });

            Highcharts.chart(el, {
                chart: { type: 'bar' },
                title: { text: opts.Title },
                xAxis: {
                    categories: cats
                },
                yAxis: {
                    min: 0,
                    title: { text: opts.YTitle }
                },
                legend: {  reversed: false },
                plotOptions: {
                    series: { stacking: 'normal' }
                },
                series: serList
            });
        };

        ChartFactory.prototype.SetupDeptChart = function(el, opts, data){
            var cats = [], currCats = [];
            var serList = [
                { name: 'Low', data: [] },
                { name: 'Medium', data: [] },
                { name: 'High', data: [] }
            ];

            Object.keys(data).forEach(function(ck){
                if(cats.indexOf(Utils.removeLastWord(ck))===-1) cats.push(Utils.removeLastWord(ck));
            });
            cats.forEach(function(cat, i){
                currCats = $filter('filter')(Object.keys(data), cat);
                currCats.forEach(function(c){
                    if(c.indexOf('Low')>-1) {
                        serList[0].data.push(data[c]);
                    }
                    if(c.indexOf('Med')>-1) {
                        serList[1].data.push(data[c]);
                    }
                    if(c.indexOf('High')>-1) {
                        serList[2].data.push(data[c]);
                    }
                });
            });

            Highcharts.chart(el, {
                chart: { type: 'bar' },
                title: { text: opts.Title },
                xAxis: {
                    categories: cats
                },
                yAxis: {
                    min: 0,
                    title: { text: opts.YTitle }
                },
                legend: {  reversed: false },
                plotOptions: {
                    series: { stacking: 'normal' }
                },
                series: serList
            });
        };

        return new ChartFactory();
    });

})();


//Usage Examples

// function setupSeverityChart(data){
//     var opts = {
//         Title:  'Risk Type Severity',
//         Categories: [],
//         Series: 'Severity Types',
//         Data : []
//     };
//     Object.keys(data).forEach(function(k){
//         opts.Categories.push(k);
//         opts.Data.push(data[k]);
//     });
//
//     ChartFactory.SetupColChart('severityChart', opts);
// }
