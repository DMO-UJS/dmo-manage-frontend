<template>
	<div id="classCluster">
		<svg width="1300" height="600" style="margin-left:80px;margin-bottom:-40px;" id="svg1"></svg>
    <div id="indicator"></div>
    <div id="mode">
        <span class="active" style="border-top-right-radius:0;border-bottom-right-radius:0;">Circles</span>
        <span style="border-top-left-radius:0;border-bottom-left-radius:0;position:relative;left:-5px;">Texts</span>
    </div>
    <div id="search"></div>
    <div id="info">
        <h4></h4>
    </div>
    <div style="text-align:center;position:relative;">
        <svg width="160" height="140" id="svg2" style="margin-right:60px;">
            <g></g>
        </svg>
    </div>
	</div>
</template>

<script src="http://cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
<script>
	import * as d3 from 'd3'
	export default {
		name: 'classCluster',
		computed: {
			url: function () {
				return this.$store.state.url
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init: function () {
				$(document).ready(function(){
        var svg = d3.select("#svg1"),
            width = svg.attr('width'),
            height = svg.attr('height');
        var names = ['疾病','症状','检查','治疗','诊断分类','组织'];
        var colors = ['#6ca46c', '#4e88af', '#ca635f', '#d2907c', '#d6744d', '#ded295'];
        for (var i = 0; i < names.length; i++) {
            $('#indicator').append("<div><span style='background-color:" + colors[i]
            + "'></span>" + names[i] + "</div>");
        }
        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) {
                return d.id;
            }))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));

        var graph;
        d3.json(this.url + "static/starwar.json", function(error, data) {
            if (error) throw error;
            graph = data;
            console.log(graph);
            var link = svg.append("g")
                .attr("class", "links")
                .selectAll("line")
                .data(graph.links)
                .enter().append("line")
                .attr("stroke-width", function(d) {
                    // return Math.sqrt(d.value);
                    return 1;
                });
            var node = svg.append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(graph.nodes)
                .enter().append("circle")
                .attr("r", function(d) {
                    return d.size
                })
                .attr("fill", function(d) {
                    // return color(d.group);
                    return colors[d.group];
                })
                .attr('stroke', 'none')
                .attr('name', function(d) {
                    return d.id;
                })
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));
            var text = svg.append("g")
                .attr("class", "texts")
                .selectAll("text")
                .data(graph.nodes)
                .enter().append("text")
                .attr("font-size", function(d) {
                    return d.size
                })
                .attr("fill", function(d) {
                    // return color(d.group);
                    return colors[d.group];
                })
                .attr('name', function(d) {
                    return d.id;
                })
                .text(function(d) {
                    return d.id;
                })
                .attr('text-anchor', 'middle')
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));
            node.append("title")
                .text(function(d) {
                    return d.id;
                });
            simulation
                .nodes(graph.nodes)
                .on("tick", ticked);
            simulation.force("link")
                .links(graph.links);
            function ticked() {
                link
                    .attr("x1", function(d) {
                        return d.source.x;
                    })
                    .attr("y1", function(d) {
                        return d.source.y;
                    })
                    .attr("x2", function(d) {
                        return d.target.x;
                    })
                    .attr("y2", function(d) {
                        return d.target.y;
                    });
                node
                    .attr("cx", function(d) {
                        return d.x;
                    })
                    .attr("cy", function(d) {
                        return d.y;
                    });
                text.
                attr('transform', function(d) {
                    return 'translate(' + d.x + ',' + (d.y + d.size / 2) + ')';
                });
            }
        });
        var dragging = false;
        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
            dragging = true;
        }
        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }
        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
            dragging = false;
        }
        $('#mode span').click(function(event) {
            $('#mode span').removeClass('active');
            $(this).addClass('active');
            if ($(this).text() == 'Circles') {
                $('.texts text').hide();
                $('.nodes circle').show();
            } else {
                $('.texts text').show();
                $('.nodes circle').hide();
            }
        });
        $('#svg1').on('mouseenter', '.nodes circle', function(event) {
            if (!dragging) {
                var name = $(this).attr('name');
                $('#info h4').css('color', $(this).attr('fill')).text(name);
                $('#info p').remove();
                for (var key in info[name]) {
                    if (typeof(info[name][key]) == 'object') {
                        continue;
                    }
                    if (key == 'url' || key == 'title' || key == 'name' || key == 'edited' || key == 'created' || key == 'homeworld') {
                        continue;
                    }
                    $('#info').append('<p><span>' + key + '</span>' + info[name][key] + '</p>');
                }
                d3.select('#svg1 .nodes').selectAll('circle').attr('class', function(d) {
                    if (d.id == name) {
                        return '';
                    }
                    for (var i = 0; i < graph.links.length; i++) {
                        if (graph.links[i]['source'].id == name && graph.links[i]['target'].id == d.id) {
                            return '';
                        }
                        if (graph.links[i]['target'].id == name && graph.links[i]['source'].id == d.id) {
                            return '';
                        }
                    }
                    return 'inactive';
                });
                d3.select("#svg1 .links").selectAll('line').attr('class', function(d) {
                    if (d.source.id == name || d.target.id == name) {
                        return '';
                    } else {
                        return 'inactive';
                    }
                });
            }
        });
        $('#svg1').on('mouseleave', '.nodes circle', function(event) {
            if (!dragging) {
                d3.select('#svg1 .nodes').selectAll('circle').attr('class', '');
                d3.select('#svg1 .links').selectAll('line').attr('class', '');
            }
        });

         var info;
        d3.json(this.url + 'static/all.json', function(error, data) {
            info = data;
        });

    });
			}
		}
	}
</script>
<style>
	#classCluster {
      background-color:#272b30;
      padding:30px 40px;
      text-align:center;
      font-family:OpenSans-Light, PingFang SC, Hiragino Sans GB, Microsoft Yahei, Microsoft Jhenghei, sans-serif;
  }
  .links line {
      stroke: rgb(240, 240, 240);
      stroke-opacity: 0.2;
  }
  .links line.inactive {
      stroke-opacity: 0;
  }
  .nodes circle {
      stroke: #fff;
      stroke-width: 1.5px;
  }
  .nodes circle:hover {
      cursor: pointer;
  }
  .nodes circle.inactive {
      display: none !important;
  }
  .texts text {
      display: none;
  }
  .texts text:hover {
      cursor: pointer;
  }
  .texts text.inactive {
      display: none !important;
  }
  #indicator{
      position: absolute;
      left: 60px;
      bottom: 120px;
      text-align:left;
      color:#f2f2f2;
      font-size:12px;
  }
  #indicator>div {
      margin-bottom: 4px;
  }
  #indicator span {
      display: inline-block;
      width: 30px;
      height: 14px;
      position: relative;
      top: 2px;
      margin-right: 8px;
  }
  #mode {
      position: absolute;
      top: 160px;
      left: 60px;
  }
  #mode span {
      display: inline-block;
      border: 1px solid #fff;
      color: #fff;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 14px;
      transition: color, background-color .3s;
      -o-transition: color, background-color .3s;
      -ms-transition: color, background-color .3s;
      -moz-transition: color, background-color .3s;
      -webkit-transition: color, background-color .3s;
  }
  #mode span.active,
  #mode span:hover {
      background-color: #fff;
      color: #333;
      cursor: pointer;
  }
  #info {
      position: absolute;
      bottom: 40px;
      right: 40px;
      text-align: right;
      width: 270px;
  }
  #info h4 {
      color: #fff;
  }
  #info p {
      color: #fff;
      font-size: 12px;
      margin-bottom: 5px;
  }
  #info p span {
      color: #888;
      margin-right: 10px;
  }
</style>