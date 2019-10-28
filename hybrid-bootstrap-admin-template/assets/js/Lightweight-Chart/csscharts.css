/*
 * cssCharts v0.3.0
 * jquery plugin to create donut and bar charts with css
 * https://github.com/sultantarimo
 *
 * (c)2015 Sultan Tarimo - sultantarimo@me.com
 * Released under the MIT license
 */
.chart *, .chart{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0;}
.chart{
  width:auto;
  display:block;
  position:relative;
  font-family:sans-serif;
  font-size:14px;
  margin: 0 auto;
}

/* bar chart */

.chart.bar{height:200px;}
.bar-chart{
  display: table;
  table-layout: fixed;
  width: auto;
  height: 100%;
  margin: 0 auto;
  z-index:20;
  position:absolute;
  left:0px;
}

.bar-chart ul{
  margin-left: 34px;
  float: left;
  display: block;
  height:100%;
}

.bar-chart li{
  position: relative;
  display: table-cell;
  vertical-align: bottom;
  height: 100px;
}

.bar-chart span{
  margin: 0 6px;
  display: block;
  background: rgb(241,127,73);
  width: 34px;
  position:relative;

  -webkit-animation: drawBar 0.3s ease-in-out;
  -moz-animation: drawBar 0.3s ease-in-out;
  animation: drawBar 0.3s ease-in-out;

  -webkit-transition: all 100ms ease-in-out;
  -moz-transition: all 100ms ease-in-out;
  transition: all 100ms ease-in-out;
}

.bar-chart li:hover span{
  box-shadow:0 0 0 4px rgb(241,127,73);
  cursor:pointer;
}

.bar-chart li:nth-child(2n+1):hover span{
  box-shadow:0 0 0 4px #bd380f;
}

.bar-chart li:nth-child(2n+1) span{background-color:#bd380f;}
.bar-chart ul:last-of-type li:last-child span{margin-right:0px;}
.bar-chart ul:first-of-type li:first-child span{margin-left:0px;}
.bar-chart ul:last-of-type {margin-right: 0px;}
.bar-chart ul:first-of-type {margin-left: 0px;}
.bar-chart.left-bar ul:last-of-type {margin-right: 0px;}
.bar-chart.left-bar ul{margin-right: 34px;float:left;margin-left:0px;}

.bar-chart span:before {
  position: absolute;
  bottom: 100%;
  margin-bottom: 10px;
  display: block;
  text-align: center;
  content: attr(title);
  word-wrap: break-word;
  font-size: 12px;
  width: auto;

  left: 50%;

  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  transform: translateX(-50%);
}

.bar-chart li span:before {
  -webkit-transition: all 100ms ease-in-out;
  -moz-transition: all 100ms ease-in-out;
  transition: all 100ms ease-in-out;
}

@-webkit-keyframes drawBar {0% {height: 0;}}
@-moz-keyframes drawBar {0% {height: 0;}}
@keyframes drawBar {0% {height: 0;}}

/* donut chart */

.chart.donut{
  width:200px;
  height:200px;
}

.donut-chart{
  width:100%;height:100%;
  position:relative;

  -webkit-border-radius:50%;
  -moz-border-radius:50%;
  border-radius:50%;
}

.donut-chart.fill{
  background:rgb(241,127,73);
}

.donut-chart:after{
  content:"";
  position: absolute;
  width: 86%;
  height: 86%;
  background: #FFF;
  left: 50%;
  top: 50%;
  z-index: 400;
  margin: 0 auto;
  pointer-events: none;

  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  border-radius: 100%;

  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}

.donut-chart h2{
  text-align:center;
  position: absolute;
  line-height: 140%;
  width: 100%;
  margin-top:-30px;
  top:50%;
  z-index:500;
  pointer-events: none;

  font-size:26px;
  font-weight:400;
  color:rgb(0,0,0);
}

.donut-chart h2 span{
  display:block;
  width:100%;
  font-size:14px;
  color:rgb(142,143,143);
  margin-top:-10px;
}

.donut-chart .spinner{
  z-index: 200;
  border-right: none;

  -webkit-border-radius: 100% 0 0 100% / 50% 0 0 50%;
  -moz-border-radius: 100% 0 0 100% / 50% 0 0 50%;
  border-radius: 100% 0 0 100% / 50% 0 0 50%;

  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  transform: rotate(0deg);

  -webkit-animation: rotateDonut 0.3s ease-in-out;
  -moz-animation: rotateDonut 0.3s ease-in-out;
  animation: rotateDonut 0.3s ease-in-out;

  -webkit-transition: all 160ms ease-in-out;
  -moz-transition: all 160ms ease-in-out;
  transition: all 160ms ease-in-out;
}

.spinner ~ .pie{
  pointer-events: none;
}

.donut-chart.fill .pie,
.pie-chart .pie{
  -webkit-box-shadow: 0 0 0 4px #bd380f;
  -moz-box-shadow: 0 0 0 4px #bd380f;
  box-shadow: 0 0 0 4px #bd380f;
}

@-webkit-keyframes rotateDonut {0% {transform: rotate(0deg);}}
@-moz-keyframes rotateDonut {0% {transform: rotate(0deg);}}
@keyframes rotateDonut {0% {transform: rotate(0deg);}}

.donut-chart .spinner.temp{display:none;}

.donut-chart .pie{
  width: 50%;
  height: 100%;
  position: absolute;
  background: #bd380f;

  -webkit-transform-origin: 100% 50%;
  -moz-transform-origin: 100% 50%;
  transform-origin: 100% 50%;
}

.donut-chart .mask{
  background:rgb(248,248,248);
  z-index: 400;
  margin-left: -1px;
}

.pie-chart:after{
  display:none;
}
.chart.donut .pie-chart h2,
.chart.donut .pie-chart h2 span{color:#FFF;}

/* pie chart */
.chart.pie svg{width:100%;height:100%;}

.chart.pie {
  width: 200px;
  height: 200px;
}

.chart.pie svg text{
  text-anchor: middle;
  fill:white;
  stroke-width:0;
  transform:translate(120,-80);
}
.chart.pie svg path:hover{
  stroke-width:10px;
}

.charts-tip{
  display:block;
  position: absolute;
  font-size: 16px;
  color: #FFF;
  background: rgba(0,0,0,0.8);
  pointer-events: none;
  font-family:sans-serif;
  padding:6px 12px;
  z-index:100;
  width:auto;

  -webkit-border-radius:4px;
  -moz-border-radius:4px;
  border-radius:4px;
}

.chart.pie .pie-legend{
  position:absolute;
  top:50%;
  right:0;
  margin-right:-30px;
  transform:translateX(100%) translateY(-50%);
}

.chart.pie .pie-legend li{
  display:block;
  margin-bottom:14px;
  clear:both;
}

.chart.pie .pie-legend li i{
  top:1px;
  position:relative;
  display:block;
  float:left;
  width:14px;
  height:14px;
  background:#DDD;
  margin-right:10px;

  box-shadow:inset 0 0 0 1px rgba(0,0,0,0.2);
}

.chart.pie .pie-legend li p{clear:both;display:inline;}

/* pie chart */

/* line chart */

.chart.line{width:auto;height:auto;margin:0 auto;position:relative;}
.chart .line-chart{
  min-width:100px;
  min-height:100px;
  width:100%;
  height:100%;
  margin:0px auto;
  display:block;
  position:relative;
  z-index:20;
}

/* line chart borders and grids */
.line-chart:after{
  content:"";
  display:block;
  position:absolute;
  left:0px;bottom:0px;
  height:1px;width:100%;
  background:rgb(238,238,238);
  padding-right:10px;
}

.chart .grid{
  width:100%;
  height:100%;
  position:absolute;
  left:0px;
  bottom:0px;
}
.chart hr{
  position:absolute;
  left:0px;
  bottom:0px;
  width:100%;
  height:1px;
  outline:none;
  border:none;
  background:rgb(238,238,238);
}

.chart hr:before{
  position:absolute;
  right:100%;
  top:0px;
  margin-right:20px;
  color:rgba(0,0,0,0.4);
  font-size:12px;
  content:attr(data-y);
  text-align:right;

  -webkit-transform:translateX(-50%) translateY(-50%);
  -moz-transform:translateX(-50%) translateY(-50%);
  transform:translateX(-50%) translateY(-50%);
}
/* line chart borders and grids */

/* line chart line */
.line-chart li{
  display:block;height:1px;
  float:left;position:relative;
  position:absolute;
}

/* line chart points tooltip */
.line-chart li a:hover:before,
.line-chart li a:hover:after{display:block;z-index:10;}
.line-chart li a:before{
  content:attr(data-y);
  cursor:pointer;
  display:none;
  position:absolute;
  font-size:14px;
  color:#FFF;
  bottom:100%;
  left:50%;
  margin-bottom:-4px;
  text-align:center;
  width:40px;
  background:rgba(0,0,0,0.8);
  padding:8px;
  z-index:40;

  -webkit-transform:translateX(-50%);
  -moz-transform:translateX(-50%);
  transform:translateX(-50%);

  -webkit-border-radius:3px;
  -moz-border-radius:3px;
  border-radius:3px;
}

.line-chart li a:after{
  z-index:50;
  content:"";
  width: 0;
  height: 0;
  display:none;
  position:absolute;
  bottom:100%;
  left:50%;
  margin-bottom:-16px;

  border:6px solid rgba(0,0,0,0);
  border-top: 6px solid rgba(0,0,0,0.8);

  -webkit-transform:translateX(-50%);
  -moz-transform:translateX(-50%);
  transform:translateX(-50%);
}

.line-chart li a{
  display:block;
  position:absolute;
  cursor:pointer;
  width:40px;
  height:40px;

  left:0px;
  top:0px;
  z-index:30;

  -webkit-transform:translateX(-50%) translateY(-50%);
  -moz-transform:translateX(-50%) translateY(-50%);
  transform:translateX(-50%) translateY(-50%);
}
/* line chart points tooltip */

/* line chart points */

.line-chart li span{
  display:block;height:1px;
  background:rgb(241,127,73);
  float:left;
  position:absolute;
}

.line-chart.no-points li span{
  display:none;
}

.line-chart li span:before{
  content:"";
  position:absolute;
  left:-4px;bottom:-4px;
  width:6px;height:6px;
  display:block;

  -webkt-border-radius:50%;
  -moz-border-radius:50%;
  border-radius:50%;
}

.line-chart li:hover span:before{
  -webkit-transform:scale(1.3);
  -moz-transform:scale(1.3);
  transform:scale(1.3);

  -webkit-transition: all 200ms ease-in-out;
  -moz-transition: all 200ms ease-in-out;
  transition: all 200ms ease-in-out;
}

.line-chart li span:before,
.line-chart li span:after{
  background:rgb(241,127,73);
  border:2px solid #bd380f;

  -webkit-box-shadow:0 0 0 4px #FFF;
  -moz-box-shadow:0 0 0 4px #FFF;
  box-shadow:0 0 0 4px #FFF;
}
/* line chart points */

/* line chart line */
.chart.line svg,
.chart.line > div{
  height: 100%;
  width: 100%;
  position:absolute;
  bottom:0px;
  left:0px;
  opacity:1;

  -webkit-animation: drawLine .3s ease-in-out;
    -moz-animation: drawLine .3s ease-in-out;
    animation: drawLine .3s ease-in-out;
}
.chart.line svg path{
  fill: rgba(241,127,73,0.0);
  stroke: rgb(241,127,73);
  stroke-width: 2px;
}

.chart.line.dotted svg path{
  /*if you want it dashed instead of filled*/
  stroke-dasharray: 3;
}

.chart.line .fill svg path{
  fill: rgba(241,127,73,0.1);
  stroke:none;
  stroke-width:0px;
}

/* line chart animation */
@-webkit-keyframes drawLine {0% {opacity: 0;}}
@-moz-keyframes drawLine {0% {opacity: 0;}}
@keyframes drawLine {0% {opacity: 0;}}

@-webkit-keyframes drawChart {0% {width: 0;}}
@-moz-keyframes drawChart {0% {width: 0;}}
@keyframes drawChart {0% {width: 0;}}