<template>
	<div id="resetPass">
		<div class="header-logo"><img id="logo" src="../assets/医院.svg">镇江第四人民医院</div>
		<el-form :model="passResetInfo" ref="passResetInfo" :rules="resetRules" label-width="80px">
			<el-item label="旧密码">
				<el-input type="text" :model="passResetInfo.oldPass"></el-input>			
			</el-item>
			<el-item label="旧密码">
				<el-input type="password" :model="passResetInfo.newPass"></el-input>			
			</el-item>
			<el-item label="确认密码">
				<el-input type="password" :model="passResetInfo.checkPass"></el-input>			
			</el-item>
			<el-item label="确认昵称">
				<el-input type="text" :model="passResetInfo.nickname"></el-input>
			</el-item>
		</el-form>
	</div>
</template>

<script>

	export default {
		name: "resetPass",
		data() {
			var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.registerInfo.checkPass !== '') {
            this.$refs.registerInfo.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.registerInfo.newPass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
			return {
				passResetInfo: {
					oldPass: '',
					newPass: '',
					checkPass: '',
					nickname: ''
				},
				resetRules: {
					newPass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
				}
			}
		},
	}
</script>

<style scoped>
	.header-logo img {
		width: 50px;
		height: 50px;
		margin-bottom: -15px;
	}
	.header-logo {
		margin-bottom: 15px;
	}
</style>