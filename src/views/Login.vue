<template>
	<div id="login">
		<el-container>
			<el-aside class="login-aside" width="1200px">
				<!-- <img src="../assets/aside.png"> -->
				体验！体验！注意用户体验！
			</el-aside>
			<el-main>
				<div class="header-logo"><img id="logo" src="../assets/医院.svg">镇江第四人民医院</div>
				<el-form :model="loginInfo" :rules="loginRules">
					<section class="input-container">
						<input type="text" v-model="loginInfo.account" placeholder="请输入用户名">
					</section>
					<section class="input-container">
						<input type="password" v-model="loginInfo.secret" placeholder="请输入密码">
					</section>
					<section class="input-container">
						<button @click="login">登录</button><button @click="dialogVisable = true">注册</button>
					</section>
					<el-dialog title="注册账户" :visible.sync="dialogVisable" width="600px">
						<el-form :model="registerInfo" status-icon :rules="registerRules" ref="registerInfo"  label-width="80px">
							<el-form-item label="昵称" prop="nickname">
								<el-input type="text" v-model="registerInfo.nickname"></el-input>
							</el-form-item>
							<el-form-item label="邮箱" prop="account">
								<el-input type="email" v-model="registerInfo.account"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="secret">
								<el-input type="password" v-model="registerInfo.secret" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="确认密码" prop="checkSecret">
								<el-input type="password" v-model="registerInfo.checkSecret" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button  type="primary" @click="register">注册</el-button>
								<el-button @click="resetForm('registerInfo')">重置</el-button>
							</el-form-item>
						</el-form>
					</el-dialog>
				</el-form>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.registerInfo.checkSecret !== '') {
            this.$refs.registerInfo.validateField('checkSecret')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.registerInfo.secret) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
			return {
				registerInfo: {
					nickname: '',
					account: '',
					secret: '',
					checkSecret: ''
				},
				registerRules: {
					secret: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkSecret: [
            { validator: validatePass2, trigger: 'blur' }
          ],
				},
				loginInfo: {
					account: '',
					secret: '',
				},
				loginRules: {
					account: [
						{required: true, message: '请输入用户名', trigger: 'blur'}
					],
					secret: [
						{required: true, message: '请输入密码', trigger: 'blur'}
					]
				},
				dialogVisable: false,
			}
		},
		computed: {
			url: function () {
				return this.$store.state.url
			}
		},
		mounted() {
			if (sessionStorage.getItem('account')) {
				this.loginInfo.account = sessionStorage.getItem('account')
			} else if (sessionStorage.getItem('secret')) {
				this.loginInfo.secret = sessionStorage.getItem('secret')
			}
		},
		methods: {
			login: function () {
				var message = {
					account: this.loginInfo.account,
					secret: this.loginInfo.secret,
				}
				sessionStorage.setItem('account', this.loginInfo.account)
				sessionStorage.setItem('secret', this.loginInfo.secret)
				var url = this.url + 'login'
				this.$http.post(url, message)
		    	.then((response) => {
		    		console.log(response.data)
		    		this.$store.commit('setUserInfo', response.data)
		    		this.$router.push('home')
		    	}, (response) => {
		    		alert(response.data.msg)
		    	})
			},
			register: function () {
				this.dialogVisable = false
				var message = {
					account: this.registerInfo.account,
					secret: this.registerInfo.secret,
					nickname: this.registerInfo.nickname
				}
				var url = this.url + 'register'
				this.$http.post(url, message)
		    	.then((response) => {
		    		console.log(response.data)
		    		this.loginInfo.account = this.registerInfo.account
		    		this.loginInfo.secret = this.registerInfo.secret
		    		this.$router.push('home')
		    	}, (response) => {
		    		// alert(response.data)
		    	})
			},
			resetForm: function (formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style scoped>
	.login-aside img {
		width: 1200px;
		height: 600px;
	}

	.header-logo img {
		width: 50px;
		height: 50px;
		margin-bottom: -15px;
	}

	#login .header-logo {
		margin-bottom: 15px;
	}

	.el-aside {
		padding: 60px 0;
		background: #f00;
		color: #fff;
		font-size: 40px;
	}

	.el-main {
		/*background: #00f;*/
	}

	.el-main .el-form {
		margin: 0 auto;
	}

	.input-container {
		margin: 2px 0;
		padding: 0 20px;
	}
	.input-container input {
		width: 300px;
		height: 30px;
	}

	.input-container button {
		width: 150px;
		height: 30px;
		margin: 0 2px;
	}
</style>