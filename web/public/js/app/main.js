require([
    'jquery', 'd3', 'nvd3'
], function ($, d3, nv) {
    'use strict';

    var graphData = function (data) {
        var gdata = [];

        return [
            {
                values: data,
                key: 'Price History'
            }
        ];

        for (var i = 0; i < data.length; i++) {
            gdata.push({x: data[i][0], y: data[i][1]});
        }
        return gdata;
    };

    var renderGraph = function ($target) {
        var data = $target.data('graph');

        nv.addGraph(function () {
            var chart = nv.models.lineChart(); // nv.models.sparklinePlus();

            chart
                .x(function(d) { return d[0] })
                .y(function(d) { return d[1] });

            chart.xAxis
                    .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });

                 chart.yAxis
                     .tickFormat(function (d) {
                         return '$' + d3.format(',.2f')(d);
                     });

            d3.select('#' + $target.attr('id') + ' svg')
                .datum(graphData(data))
                .transition()
                .duration(250)
                .call(chart);

            nv.utils.windowResize(function() { d3.select('#' + $target.attr('id') + ' svg').call(chart) });

         //   $target.find('svg circle').attr('r', 4);

            return chart;
        });
    };

    // Render any graphs
    $(document).bind('ready', function () {
        $('[data-graph]').each(function () {
            renderGraph($(this));
        });
    });

});