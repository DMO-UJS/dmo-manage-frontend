<template>
	<div id="classHierarchy">
	</div>
</template>

<script>
	import * as d3 from 'd3'
	export default {
		name: 'classHierarchy',
		data() {
			return {
				selectedNodeName: '',
				ontologyHierarchy: this.ontologyLibrary,
				url: 'http://192.168.1.101:5000/',
			}
		},
		computed: {
			// ontologyLibrary() {
			// 	console.log(this.$store.state.selectedOntologyLibrary)
			// 	return this.$store.state.selectedOntologyLibrary
			// }
		},
		
		watch: {
			ontologyLibrary: {
				handler(newValue, oldValue) {
					var that = this
					// that.ontologyHierarchy = newValue
					document.querySelector("#classHierarchy").innerHTML = ''
					that.init()
				},
				deep: true
			},
			searchText: {
				handler(newValue, oldValue) {
					var that = this
					that.select()
				}
			}
		},
		mounted() {
			this.init()
		},
		props: ['ontologyLibrary', 'projectName', 'searchText'],
		methods: {
			// 根据ontologyLibrary创建缩进列表
			init: function () {
				// 定义svg和的宽高、边距和节点图形的宽高
				var margin = {top: 30, right: 20, bottom: 30, left: 20},
		        width = 450,
		        barHeight = 30,
		        barWidth = (width - margin.left - margin.right) * 0.6;

		    // i:node的key，duration:过渡时长，root:根节点，selectedNode:选中的节点
		    var i = 0,
		        duration = 400,
		        root,
		        selectedNode;

        // 定义节点之间的连接线（水平）
		    var diagonal = d3.linkHorizontal()
		        .x(function(d) { return d.y; })
		        .y(function(d) { return d.x; });

		    // 定义svg容器
		    var svg = d3.select("#classHierarchy").append("svg")
		        .attr("width", width) // + margin.left + margin.right)
		        .append("g")
		        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		    // 创建根节点
		    root = d3.hierarchy(this.ontologyLibrary);
        root.x0 = 0;
        root.y0 = 0;
        update(root);

        var that = this
	      // 根据根节点创建缩进列表
		    function update(source) {

		        // Compute the flattened node list.
		        var nodes = root.descendants();

		        var height = Math.max(500, nodes.length * barHeight + margin.top + margin.bottom);

		        // 设置svg的高度和过渡时长
		        d3.select("svg").transition()
		            .duration(duration)
		            .attr("height", height);

		        // here "self" is window (detail in "https://stackoverflow.com/questions/22448032/d3-what-is-the-self-as-in-d3-selectself-frameelement-styleheight-height")
		        d3.select(self.frameElement).transition()
		            .duration(duration)
		            .style("height", height + "px");

		        // Compute the "layout". TODO https://github.com/d3/d3-hierarchy/issues/67
		        var index = -1;
		        // eachBefore先序遍历
		        root.eachBefore(function(n) {
		            n.x = ++index * barHeight;
		            // console.log(n.depth)
		            n.y = n.depth * 20;
		        });

		        // Update the nodes…
		        var node = svg.selectAll(".node")
		            .data(nodes, function(d) { return d.id || (d.id = ++i); });

		        var nodeEnter = node.enter().append("g")
		            .attr("class", "node")
		            .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
		            .style("opacity", 0);
	          // console.log(nodeEnter)

		        // Enter any new nodes at the parent's previous position.
		        nodeEnter.append("rect")
		            .attr("y", -barHeight / 2)
		            .attr("height", barHeight)
		            .attr("width", barWidth)
		            .style("fill", color)
		            .on("click", click);
            // console.log(nodeEnter)		

		        // 为每个节点添加文本
		        nodeEnter.append("text")
		            .attr("dy", 3.5)
		            .attr("dx", 5.5)
		            .text(function(d) { return d.data.name; });

		        // Transition节点到新的位置
		        nodeEnter.transition()
		            .duration(duration)
		            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
		            .style("opacity", 1);

		        node.transition()
		            .duration(duration)
		            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
		            .style("opacity", 1)
		            .select("rect")
		            .style("fill", color)

		        // Transition exiting nodes to the parent's new position.
		        node.exit().transition()
		            .duration(duration)
		            .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
		            .style("opacity", 0)
		            .remove();

		        // Update the links…
		        var link = svg.selectAll(".link")
		            .data(root.links(), function(d) { return d.target.id; });

		        // Enter any new links at the parent's previous position.
		        link.enter().insert("path", "g")
		            .attr("class", "link")
		            .attr("d", function(d) {
		                var o = {x: source.x0, y: source.y0};
		                return diagonal({source: o, target: o});
		            })
		            .transition()
		            .duration(duration)
		            .attr("d", diagonal);

		        // Transition links to their new position.
		        link.transition()
		            .duration(duration)
		            .attr("d", diagonal);

		        // Transition exiting nodes to the parent's new position.
		        link.exit().transition()
		            .duration(duration)
		            .attr("d", function(d) {
		                var o = {x: source.x, y: source.y};
		                return diagonal({source: o, target: o});
		            })
		            .remove();

		        // Stash the old positions for transition.
		        root.each(function(d) {
		            d.x0 = d.x;
		            d.y0 = d.y;
		        });        
		    }
		    // Toggle children on click.
		    function click(d, i, nodes) {
		    	console.log(that.projectName)
		    		that.$store.commit('setClassName', d.data.name)
		    		let url = that.url + 'classselect'
		    		let message = {'className': d.data.name, 'libraryName': that.projectName}
		    		that.$http.post(url, message)
							.then((response) => {
								that.$store.commit('setClassInfo', response.data)
							}, (response) => {
								// error
							})
		    		selectedNode = nodes[i]
		        if (d.children) {
		            d._children = d.children;
		            d.children = null;	//有子节点
		        } else {
		            d.children = d._children;
		            d._children = null;		//没有子节点
		        }
		        update(d);  
		    }

		    function color(d, i, nodes) {
		    	if (nodes[i] === selectedNode) {
		    		return "#24a121"
		    	} else if (d._children) {
		    		return "#3182bd"
		    	} else if (d.children) {
		    		return "#c6dbef"
		    	} else {
		        return "#fd8d3c";
		    	}
		    }
	  	},
	  	select: function () {
	  		d3.selectAll(".node").selectAll("text").filter(function (d, i, nodes) {
	  			return nodes[i].innerHTML == "道法术"
	  		}).select(function (d, i, nodes) {
	  			return nodes[i].previousElementSibling
	  		}).dispatch('click')
	  	}
		}
	}
</script>

<style>
	.node rect {
	  cursor: pointer;
	  fill: #fff;
	  fill-opacity: 0.5;
	  stroke: #3182bd;
	  stroke-width: 1.5px;
	}

	.node text {
	  font: 14px sans-serif;
	  font-weight: bold;
	  pointer-events: none;
	}

	.link {
	  fill: none;
	  stroke: #9ecae1;
	  stroke-width: 1.5px;
	}
</style>