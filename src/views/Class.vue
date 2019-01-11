<template>
	<div class="classA">
		<headTop :project-name="projectName"></headTop>
		<el-row :gutter='20'>
			<!-- 类的层级关系 -->
			<el-col :span="6">
				<div class="grid-content">
					<el-container>
						<el-header>
							<div class="classA-hierarchy-header">
								类的层级关系
							</div>
							<div class="classA-hierarchy-tools">
								<el-row>
									<el-button type="primary" icon="el-icon-plus" circle size="mini" @click="addClassDialogVisable = true"></el-button>
									<el-button type="danger" icon="el-icon-minus" circle size="mini" @click="removeClass"></el-button>
									<el-button type="success" icon="el-icon-search" circle size="mini"@click="searchClassDialogVisable = true"></el-button>
								</el-row>
								<el-dialog title="添加类项" :visible.sync="addClassDialogVisable" width="800px">
									<el-form>
										<el-form-item label="类名">
											<el-input type="text" v-model="className"></el-input>
										</el-form-item>
										<el-form-item>
											<el-button type="primary" @click="addClass">添加</el-button>
										</el-form-item>
									</el-form>
								</el-dialog>
								<el-dialog title="查询类项" :visible.sync="searchClassDialogVisable" width="800px">
									<el-form>
										<el-form-item label="查询关键字">
											<el-input type="text" v-model="searchText" @change="searchClass"></el-input>
											<p class="searchResultMsg">匹配结果：</p>
											<div class="searchResult"></div>
										</el-form-item>
									</el-form>
								</el-dialog>
							</div>
						</el-header>
						<el-main>
							<classHierarchy 
							:ontology-library="ontologyLibrary"
							:project-name="projectName"
							:search-text="searchText">
							</classHierarchy>
						</el-main>
					</el-container>
				</div>
			</el-col>
			<!-- 类 -->
			<el-col :span="12">
				<div class="grid-content">
					<el-container>
						<el-header>
							<div class="classA-header">
								类：{{selectedClass.className}}
							</div>
							<div class="classA-tools">
								<el-row>
									<el-button icon="el-icon-edit-outline" size="mini" @click="detailVisable = true, viewVisable = false"></el-button>
									<el-button icon="el-icon-view" size="mini" @click="viewVisable = true, detailVisable = false"></el-button>
								</el-row>
							</div>
						</el-header>
						<el-main v-if="detailVisable">
							<div class="detail" name="iri">
								IRI
								<p>{{selectedClass.iri}}</p>
							</div>
							<div class="detail" name="annotations">
								Annotations
								<ul>
									<li v-for="item in selectedClass.annotations">
										<div>
											<input type="text" name="property" v-model="item.property">
											<input type="text" name="value" v-model="item.value">
										</div>
									</li>
									<input type="text" name="property" placeholder="输入属性" v-model="annotation.property">
									<input type="text" name="value" placeholder="输入值" v-model="annotation.value">
								</ul>
							</div>
							<div class="detail" name="parents">
								Parents
								<ul>
									<li v-for="item in selectedClass.parents">
										<input type="text" name="className" v-model="item.name">
									</li>
									<input type="text" name="className" placeholder="输入类名" v-model="parentName">
								</ul>
							</div>
							<div class="detail" name="relationships">
								Relationships
								<ul>
									<li v-for="item in selectedClass.relationships">
										<input type="text" name="property" v-model="item.relation">
										<input type="text" name="value" v-model="item.range">
									</li>
								</ul>
									<input type="text" name="property" placeholder="输入属性">
									<input type="text" name="value" placeholder="输入值">
							</div>
						</el-main>
						<el-main v-if="viewVisable">
						</el-main>
					</el-container>
				</div>
			</el-col>
			<!-- 备注 -->
			<el-col :span="6">
				<div class="grid-content">
					<el-container>
						<el-header>
							<div class="classA-hierarchy-header">
								备注：{{selectedClass.className}}
							</div>
							<div class="classA-hierarchy-tools">
								<el-row>
									<el-button icon="el-icon-document" size="mini" @click="dialogVisable = true"></el-button>
									<el-dialog title="添加备注" :visible.sync="dialogVisable" width="800px">
										<textarea v-model="comment.content"></textarea>
										<div>
											<el-button type="primary" @click="submitComment">确认</el-button>
										</div>
									</el-dialog>
								</el-row>
							</div>
						</el-header>
						<el-main>
							<ul>
								<li v-for="item in selectedClass.comments">
									<div class="classA-comment">
										<p>{{item.owner}}</p>
										<p>{{item.createDate}}</p>
										<p>{{item.content}}</p>
									</div>
								</li>
							</ul>
						</el-main>
					</el-container>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>

import headTop from "../components/Header"
import classHierarchy from "../components/ClassHierarchy"

	export default {
		name: "class",
		data() {
			return {
				className: '',
				annotation:{
					property: '',
					value: ''
				},
				parentName: '',
				relationship: {
					property: '',
					value: ''
				},
				comment: {
					owner: '陈',
					content: '',
					createDate: '2018'
				},
				searchText: '',
				dialogVisable: false,
				detailVisable: true,
				viewVisable: false,
				addClassDialogVisable: false,
				searchClassDialogVisable: false,
				url: 'http://192.168.1.106:5000/', 
			}
		},
		computed: {
			ontologyLibrary() {
				return this.$store.state.selectedOntologyLibrary
			},
			projectName:function () {
				// console.log(this.$store.state.libraryName)
				return this.$store.state.libraryName
			},
			selectedClassName: function () {
				return this.$store.state.selectedClassName
			},
			selectedClass: function () {
				return this.$store.state.classInfo
			}
		},
		components: {
			headTop,
			classHierarchy
		},
		methods: {
			addClass: function () {
				this.addClassDialogVisable = false
				var message = {'className': this.className, 'parentName': this.selectedClassName, 'libraryName': this.projectName}
				let url = this.url + 'classadd'
				this.$http.post(url, message)
		    	.then((response) => {
		    		console.log(response.data)
		    		this.$store.commit('setOntologyLibrary', response.data)
		    	}, (response) => {
		    		// error
		    	})
			},
			removeClass: function () {
				var message = {'className': this.selectedClassName, 'libraryName': this.projectName}
				let url = this.url + 'classdel'
				this.$http.post(url, message)
		    	.then((response) => {
		    		console.log(response.data)
		    		this.$store.commit('setOntologyLibrary', response.data)
		    	}, (response) => {
		    		// error
		    	})
			},
			searchClass: function () {
				var message = {'searchText': this.selectedClassName}
				let url = this.url + 'classsearch'
				this.$http.post(url, message)
					.then((response) => {
						console.log(response.data)
					}, (response) => {
						// error
					})
			},
			editComments: function () {
				
			},
			submitComment: function () {
				this.selectedClass.comments.push(this.comment)
				this.comment = ''
				this.dialogVisable = false
			},
		}
	}
</script>
<style scoped>
	.classA {
		overflow: hidden;
	}
	.el-col .el-header {
		padding: 0;
	}
	.el-row {
		text-align: left;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .classA >.el-row {
  	margin-top: 10px;
  }
  .el-col {
  	border-radius: 2px;
  }
  .grid-content {
  	border: 1px solid #e4e7ed;
  	border-radius: 2px;
    min-height: 360px;
  }

  .grid-content .el-main {
  	padding-left:0;
  	padding-right: 0;
  }

  /*class hierarchy*/
  .classA-hierarchy-header {
  	box-sizing: border-box;
  	padding: 4px 0 0 4px;
  	width: 100%;
  	height: 30px;
  	background: #e4e7ed;
  	font-size: 16px;
  	text-align: left;
  }

  .classA-hierarchy-tools {
  	box-sizing: border-box;
  	padding: 2px 0 0 2px;
  	margin-top: 1px;
  	width: 100%;
  	height: 40px;
  	background: #e4e7ed;
  }

  .classA-hierarchy-tools .searchResult {
  	padding: 0 15px;
  	width: 728px;
  	height: 400px;
  	border: 1px solid #dcdfe6;
  	border-radius: 4px;
  }

  /*class*/
  .classA-header {
  	box-sizing: border-box;
  	padding: 4px 0 0 4px;
  	width: 100%;
  	height: 30px;
  	background: #e4e7ed;
  	font-size: 16px;
  	text-align: left;
  }

  .classA-tools {
  	box-sizing: border-box;
  	padding: 2px 0 0 2px;
  	margin-top: 1px;
  	width: 100%;
  	height: 40px;
  	background: #e4e7ed;
  }

  .el-main {
  	margin-top: 10px;
  	padding: 0;
  }
  .el-main .detail {
  	box-sizing: border-box;
  	margin: 0px 0 2px 0;
  	padding: 10px;
  	width: 100%;
  	height: 100px;
  	/*background: #f5f7fa;*/
  }

  .detail * {
  	font-size: 14px;
  }
  .detail input {
  	width: 400px;
  	height: 18px;
  	padding: 2px 1px;
  	border: none;
  	border-bottom: 1px solid #9a9a9a;
  	background: transparent;
  }

  .detail input[name="property"] {
  	width: 200px;
  }

  .detail input[name="value"] {
  	width: 600px;
  }

  .detail input[name="className"] {
  	width: 800px;
  }
  /*备注对话框*/
  .el-dialog textarea {
  	width: 100%;
  	min-height: 150px;
  	margin-bottom: 10px;
  }

  /*备注*/
  .el-main ul,li,p {
  	padding: 0;
  	margin: 0;
  }
  .el-main .classA-comment {
  	box-sizing: border-box;
  	margin: 0px 10px 2px 6px;
  	padding: 5px;
  	font-size: 14px;
  	list-style: none;
  	background: #f5f7fa;
  	box-shadow: 3px 3px 2px #e4e7ed;
  }
</style>