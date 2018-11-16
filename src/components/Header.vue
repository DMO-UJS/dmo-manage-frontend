<template>
	<el-header id="head" height="300px">
		<img id="logo" src="../assets/医院.svg">
		<br/>
		镇江第四人民医院
		<el-menu
			name="nav"
			background-color="#545c64"
			text-color="#fff" 
			mode="horizontal">
			<el-menu-item index="1" @click="goHome">首页</el-menu-item>
			<el-menu-item index="2" v-if="projectName">{{projectName}}</el-menu-item>
			<el-submenu index="3" id="login">
				<template slot="title">登录/注册</template>
				<el-menu-item index="3-1">注销</el-menu-item>
				<el-menu-item index="3-2">修改密码</el-menu-item>
			</el-submenu>
		</el-menu>
		<el-menu
			name="menu"
			background-color="#545c64"
			mode="horizontal"
			text-color="#fff"
			v-if="projectName">
			<el-menu-item index="1" @click="selectClass">类</el-menu-item>
			<el-menu-item index="2" @click="selectProperty">属性</el-menu-item>
		</el-menu>
	</el-header>
</template>

<script>
	export default{
		data() {
			return {

			}
		},
		mounted() {

		},
		props: ['projectName'],
		methods: {
			goHome: function () {
				this.$router.push("/");
			},
			selectClass: function () {
				this.$router.push('class')
			},
			selectProperty: function () {
				this.$router.push('properties')
			}
		}
	}
</script>

<style scoped>
	.el-header{
		padding: 0px;
		margin: 0;
	}
	.el-header > img {
		width: 50px;
		height: 50px;
	}

	.el-header .el-menu {
		/*height: 60px;*/
	}
	.el-header  .el-menu[name="nav"] {
		margin-top: 10px;
	}
	#login {
		float: right;
	}
</style>