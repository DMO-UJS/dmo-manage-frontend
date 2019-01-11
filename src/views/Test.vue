<template>
	<div class="test">
    <canvas id="pdf"></canvas>
    <p>hesdfshfh</p>
    <embed id="pdf" src="http://192.168.1.106:5000/static/zhinan.pdf"></embed>
	</div>
</template>

<script>
	export default {
		name: "test",
		data() {
			return {
				page: 1,
			}
		},
    mounted() {
    	this.init()
    },
    methods: {
    	init: function () {
    		document.addEventListener("copy", this.selectTextHandler, true)
    	},
    	selectTextHandler: function (e) {
    		console.log(e.clipboardData.getDate("text"))
    		 for (var i = 0, len = e.clipboardData.items.length; i < len; i++) {
		        var item = e.clipboardData.items[i];

		        if (item.kind === "string") {
		            item.getAsString(function (str) {
		                console.log(str)
		            })
		        } else if (item.kind === "file") {
		            var pasteFile = item.getAsFile();
		            // pasteFile就是获取到的文件
		        }
		    }
    	}
    } 
	}	
</script>

<style>
	embed {
		width: 800px;
		height: 1000px;
	}
</style>