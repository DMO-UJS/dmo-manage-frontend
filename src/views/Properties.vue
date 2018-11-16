<template>
	<div class="properties">
		<headTop :project-name="projectName"></headTop>
		<el-row :gutter="10">
			<el-col :span="6"><div></div></el-col>
			<el-col :span="12"><div></div></el-col>
			<el-col :span="6"><div></div></el-col>
		</el-row>
	</div>
</template>

<script>

import headTop from "../components/Header"

	export default {
		name: "properties",
		data() {
			return {
				projectName: 'dmo'
			}



		},
		components: {
			headTop
		}
	}
</script>