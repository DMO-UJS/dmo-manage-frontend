<template>
	<div id="resetPass">
		<div class="header-logo"><img id="logo" src="../assets/医院.svg">镇江第四人民医院</div>
		<div class="resetpass-main">
			<el-form :model="pwdInfo" status-icon :rules="resetRules" ref="pwdInfo"  label-width="80px">
				<el-form-item label="旧密码" prop="oldPass">
					<el-input type="text" v-model="pwdInfo.oldPass"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="newPass">
					<el-input type="password" v-model="pwdInfo.newPass"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input type="password" v-model="pwdInfo.checkPass" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="昵称" prop="nickname">
					<el-input type="text" v-model="pwdInfo.nickname" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button  type="primary" @click="resetPass">提交</el-button>
					<el-button @click="resetForm('pwdInfo')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>	
	</div>
</template>

<script>
	export default {
		name: "resetpass",
		data() {
			var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.pwdInfo.checkPass !== '') {
            this.$refs.pwdInfo.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.pwdInfo.newPass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
			return {
				pwdInfo: {
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
				},
			}
		},
		computed: {
			uid: function () {
				return this.$store.state.userInfo.uid
			},
			url: function () {
				return this.$store.state.url
			}
		},
		methods: {
			resetPass: function () {
				console.log(this.pwdInfo)
				var message = {
					uid: this.uid,
					secret: this.pwdInfo.newPass
				}
				var url = this.url + 'pswmod'
				this.$http.post(url, message)
		    	.then((response) => {
		    		console.log(response.data)
		    		this.$router.push('')
		    	}, (response) => {
		    		alert(response.data.msg)
		    	})
			},
			resetForm: function (formName) {
				this.$refs[formName].resetFields();
			}
		}
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
	.resetpass-main {
		width: 400px;
		margin: 30px auto;
		padding: 20px;
		/*border: 1px solid #000;*/
	}
</style>