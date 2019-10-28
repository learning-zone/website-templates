# cssCharts.js
jquery plugin to create simple donut, bar or line charts with dom nodes. style with css.

[http://thysultan.com/projects/cssCharts/](http://thysultan.com/projects/cssCharts/)

### Include:

```html
<link rel="stylesheet" href="chart.css">
<script src="jquery.chart.js"></script>
```

### run:

```javascript

$('.bar-chart').cssCharts({type:"bar"});
$('.donut-chart').cssCharts({type:"donut"});
$('.line-chart').cssCharts({type:"line"}); 

```
### example donut/pie chart

optional: to trigger countUp counter for the donut chart as seen on the preview page.

```javascript
$('.donut-chart').cssCharts({type:"donut"}).trigger('show-donut-chart');
```

add "pie-chart" class to .donut-chart if you want to convert it to a pie chart, i.e

```html
<div class="donut-chart pie-chart" data-percent="0.61" data-title="uptime %"></div>
```

- - -

### example line chart

```html
<ul data-cord="[x1,x2,x3,x4],[y1,y2,y3,y4]" class="line-chart"></ul>
$('.line-chart').cssCharts({type:"line"});
```

* insure x cordinates are 0 - ascending.  
* insure y cordinates are 0 or greater.  

- - -

### example bar chart

```html
<ul class="bar-chart" data-bars="[x1,x2],[y1,y2]" data-max="10" data-unit="k" data-grid="1" data-width="24">
$('.bar-chart').cssCharts({type:"bar"});
```

- - - 

style to your hearts content, see index.html for an example implementation.  
