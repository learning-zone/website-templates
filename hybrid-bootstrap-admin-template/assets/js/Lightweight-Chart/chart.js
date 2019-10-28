/*
 * cssCharts v0.1.0
 * https://github.com/sultantarimo
 *
 * (c)2015 Sultan Tarimo - sultantarimo@me.com
 * Released under the MIT license
 */

 var thychart = {
   donut: function(node){
     var $chart   = $(node);
     var val      = $(node).attr("data-percent");
     var title    = $(node).attr("data-title");

         $chart.parent().addClass("donut");

     if(!title) title = "%";
     if(val > 1 || val < 0) return("between 0 - 1 please");

     var r        = 180;
     var c        = 360;

     var val      = parseFloat(val).toFixed(2)*c;
     var $temp    = $('<div></div>').addClass("pie spinner");

     var $title   = $("<h2><p></p><span></span></h2>");
         $title.find("p").text(val/360*100);
         $title.find("span").text(title);

         $chart.on('show-donut-chart', function(){
           $title.find("p").text(0);
           $({countNum: $title.find("p").text()}).animate({countNum: val/360*100}, {
             duration: 500,
             easing:'linear',
             step: function() {
               $title.find("p").text(Math.floor(this.countNum));
             },
             complete: function() {
               $title.find("p").text(this.countNum);
             }
           });
           $chart.on('hide-donut-chart', function(){
             $title.find("p").text(0);
           });
         });

     $chart.append($title);

     var chart = {
       nodes: {
         spinner: function(){
           return $temp.clone().attr(
             "style",

             '-webkit-transform: rotate('+ chart.values.spinner +'deg);' +
             '-moz-transform: rotate('+ chart.values.spinner +'deg);' +
             'transform: rotate('+ chart.values.spinner +'deg);'
             );
         },
         mask: function(){
           return $temp.clone().addClass(chart.values.selector).attr(
             "style",

             '-webkit-transform: rotate('+ chart.values.mask + 'deg);' +
             '-moz-transform: rotate('+ chart.values.mask + 'deg);' +
             'transform: rotate('+ chart.values.mask + 'deg);'
             );
       }
       },
       values: {spinner: val, mask: c, selector: "" }
     };
     var prependNodes = function(data){
       $.each(data, function(i, _node) {$chart.prepend(_node());});
     };

     // IF LESS THAN 50%
     if(val < r){
       var val1 = val;

       var chart$clone = jQuery.extend({}, chart);
           chart$clone.values.spinner = val1;
           chart$clone.values.selector = "mask";

       prependNodes(chart$clone.nodes);
     }
     // IF GREATER THAN 50%
     else{
       var val2 = val - r;
       var val1 = val - val2;
           val2 = val2 + r;

       var chart$clone = jQuery.extend({}, chart);
           chart$clone.values.spinner = val1;
           chart$clone.values.mask = val2;

       prependNodes(chart$clone.nodes);
     }
   },

   bar: function(node){
     var $node = $(node);

         $node.parent().addClass("bar");

     var data = $node.attr("data-bars");
     var unit = $node.attr("data-unit");
     var height = $node.height();
     var grid = $node.attr("data-grid");
     var barWidth = $node.attr("data-width");
     var max = $node.attr("data-max");

     if(parseInt(grid) === 0) $node.css("background", "none");

     if(!data) return("No data to work with");
     if(!unit) unit = "%";

     // get max data point
     var maxData = function(){
       var arr = JSON.parse("[" + data + "]");
       return Math.max.apply(Math, arr.map(function(i) { return i[0]; }));
     };

     // If "data-max" is not specified or if the heighest data-point is greater than data-max
     if(maxData() > max || !max){ max = maxData(); }

     data = JSON.parse("[[" + data + "]]");
     var barsNo = data[0].length;

     $.each(data, function(i, v) {
       // first dimension
       var uls = $("<ul></ul>");
       var lis = $("<li><span></span></li>").height(height);

       for (i = 0; i < data[0].length; i++){
         var ul = uls.clone();

         $.each(v[i], function(index, val) {
           // second dimension
           var li = lis.clone();

           var value = (data[0][i][index]);
           var title = value + unit;
           var percent = (value/max) * 100;

           li.find("span").attr("title", title);
           if(!barWidth){
             li.find("span").attr(
               "style",
               "height:" + percent + "%"
               );
           }else{
             li.find("span").attr(
               "style",
               "height:" + percent + "%;" +
               "width:" + barWidth + "px"
               );
           }
           ul.append(li);
         });
         $node.append(ul);
       }
     });

     var grid = $("<div class='grid'></div>");
         $node.parent().append(grid);

     for(var i = 0; i <= 10; i++) {
       var toPerc = (i*10).toFixed(0);
       var converter = max/100;
       var toUnit = (toPerc * converter).toFixed(0);

       if(i % 2 == 0){
         var line = $("<hr/>").css({bottom: toPerc+"%"}).attr("data-y", toUnit + unit);
         $node.parent().find(".grid").append(line);
       }
     }

     $node.parent().width($node.width());
   },

   line: function(node){
     var setAngle = function(cord, area, node){
       var hypotenuse =  Math.round( Math.sqrt(Math.pow(area.width, 2) + Math.pow(area.height, 2)) );
       var angSin = area.height / hypotenuse;
       var ang = Math.round(Math.asin(angSin) * 180/Math.PI);
           ang = -ang;

       var $node = $(node).clone()
                     .attr("style",
                       'width:'+ hypotenuse +'px;'
                       )
                     .attr("data-height", area.height)
                     .attr("data-width", area.width)
                     .attr("data-hypotenuse", hypotenuse)
                     .attr("data-angle", ang)
                     .attr("data-x", cord.x)
                     .attr("data-y", cord.y);

           $node.find("span")
             .attr(
               "style",
               'width:'+ hypotenuse +'px;' +
               '-webkit-transform: rotate('+ ang +'deg);' +
               '-moz-transform: rotate('+ ang +'deg);' +
               'transform: rotate('+ ang +'deg);'
             )
             .attr("data-height", area.height)
             .attr("data-width", area.width)
             .attr("data-hypotenuse", hypotenuse)
             .attr("data-angle", ang);

           $node.find("a")
             .attr(
               "style",
               'height:'+ 40 +'px;'+
               'width:'+ 40 +'px;'
               )
             .attr("data-x", cord.x)
             .attr("data-y", cord.y);

       return({
         angle: ang,
         hypo: hypotenuse,
         width: area.width,
         height: area.height,
         node: $node
       });
     };

     var setPosition = function(data){
       var prevNode = $("ul").find(data).prev();
       var totalWidth = parseInt($("ul").find(data).attr("data-width").replace("-", ""));
       var totalHeight = parseInt($("ul").find(data).attr("data-height").replace("-", ""));
       var totalY = parseInt($("ul").find(data).attr("data-y").replace("-", ""));

       if(prevNode.length === 0){
         $("ul").find(data).attr("data-total-width",totalWidth);
         $("ul").find(data).css("left",0 + "px");

         $("ul").find(data).attr("data-total-height", totalY - totalHeight );
         $("ul").find(data).css("bottom",totalY + "px");

         $("ul").find(data).attr("data-y",totalY);
         $("ul").find(data).attr("data-x",0);
       }else{
         var currentWidth = parseInt(prevNode.attr("data-total-width").replace("-", ""));
             totalWidth = parseInt(prevNode.attr("data-total-width").replace("-", "")) + parseInt(data.attr("data-width").replace("-", ""));

         $("ul").find(data).attr("data-total-width",totalWidth);
         $("ul").find(data).css("left",currentWidth + "px");

         var currentHeight = parseInt(prevNode.attr("data-total-height").replace("-", ""));
             totalHeight = parseInt(prevNode.attr("data-total-height")) + parseInt(data.attr("data-height"));

         $("ul").find(data).attr("data-total-height",totalHeight);
         $("ul").find(data).css("bottom",currentHeight + "px");

         $("ul").find(data).attr("data-y",currentHeight);
         $("ul").find(data).attr("data-x",currentWidth);
       }
     };

     var setContWidth = function($chart,data){
       var width = Math.floor($chart.find("li:last-child").attr("data-x")) + 20;

       var height = data[1];
           height = Math.max.apply(Math, height) + 20;

       $chart.css({width: width, height: height});
       $chart.parent().css({width: width, height: height});
       $chart.parent().addClass("line");
     };

     var drawSVG = function(){
       var svg = $(
                 '<svg version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">'+
                 '<path d=""></path>' +
                 '</svg>'
                 );
           $chart.parent().append(svg);

       function convertToArrayOfObjects(data) {
           var keys = data.shift(),
               i = 0, k = 0,
               obj = null,
               output = [];

           for (i = 0; i < data.length; i++) {
               obj = {};

               for (k = 0; k < keys.length; k++) {
                 obj[k] = {
                   x: keys[k],
                   y: $chart.parent().find(".grid hr:last-child").attr("data-y")-data[i][k]
                 }
               }
               output.push(obj);
           }
           return output[0];
       }

       var points = convertToArrayOfObjects(data);
       var counter = 0;

       function addPoint(x, y, isFirst){
           if(isFirst == "last"){
             var last = Object.keys(points).length-1;

             var x1 = points[last].x;
             var y1 = points[0].y;
             var x2 = points[0].x;
             var y2 = points[last].y;

             console.log(x1,y1,x2,y2);

             var new_point = "L" +
             x1 +
             "," +
             x1 +
             " L" +
             0 +
             "," +
             x1 +
             " Z";

           }else{
             var new_point = (isFirst? "M" : " L")+x+","+y;
           }
           $chart.parent().find("path").attr("d", $chart.parent().find("path").attr("d")+""+new_point);
           counter++;
           if(counter < Object.keys(points).length){
               setTimeout(addPoint(points[counter].x, points[counter].y, false),200); // Add a new point after 200 milliseconds
           }
           if(counter == Object.keys(points).length){
             setTimeout(addPoint(null, null, "last"),200);
           }
       }
       addPoint(points[0].x, points[0].y, true);
     };

     var $chart = $(node);
     var fill = $chart.attr("data-fill");

     var cord = $chart.attr("data-cord");
         cord = JSON.parse("[" + cord + "]");

     var data = cord;

     var grid = $("<div class='grid'></div>");
         $chart.parent().append(grid);

     for (var i = 0; i < data[0].length; i++) {
         cord = {
           x: data[0][i],
           y: data[1][i]
         };

         var area = {
           width:  data[0][i+1] - data[0][i],
           height: data[1][i+1] - data[1][i]
         };

         var triangle = setAngle(cord, area, $("<li><span></span><a></a></li>"));

         $chart.append(triangle.node);
         setPosition(triangle.node);
         setContWidth($chart, data);

         if(i % 2 === 0){
           var gridSpace = $chart.height() / 10;
           var line = $("<hr/>").css({bottom: i*gridSpace}).attr("data-y", i*gridSpace);
           $chart.parent().find(".grid").append(line);
         }
     }

     if(fill){
       drawSVG();
     }

   }

 };