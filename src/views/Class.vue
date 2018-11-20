<template>
	<div class="classA">
		<headTop :project-name="projectName"></headTop>
		<el-row :gutter='20'>
			<el-col :span="6">
				<div class="grid-content">
					<el-container>
						<el-header>
							<div class="classA-hierarchy-header">
								类的层级关系
							</div>
							<div class="classA-hierarchy-tools">
								<el-row>
									<el-button type="primary" icon="el-icon-plus" circle size="mini"></el-button>
									<el-button type="danger" icon="el-icon-minus" circle size="mini"></el-button>
									<el-button type="success" icon="el-icon-search" circle size="mini"></el-button>
								</el-row>
							</div>
						</el-header>
						<el-main>
							层级关系
						</el-main>
					</el-container>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="grid-content">
					<el-container>
						<el-header>
							<div class="classA-header">
								类：{{selectedClass.className}}
							</div>
							<div class="classA-tools">
								<el-row>
									<el-button icon="el-icon-edit-outline" size="mini"></el-button>
									<el-button icon="el-icon-view" size="mini"></el-button>
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
									<input type="text" name="property" placeholder="属性" v-model="annotation.property">
									<input type="text" name="value" placeholder="值" v-model="annotation.value">
								</ul>
							</div>
							<div class="detail" name="parents">
								Parents
								<ul>
									<li v-for="item in selectedClass.parents">
										<div>
											<input type="text" name="className" v-model="item.parentName">
										</div>
									</li>
								</ul>
								<input type="text" name="className" placeholder="请输入类名" v-model="parentName">
							</div>
							<div class="detail" name="relationships">
								Relationships
								<div>
									<input type="text" name="property" placeholder="属性">
									<input type="text" name="value" placeholder="值">
								</div>
							</div>
						</el-main>
						<el-main v-if="viewVisable">
							<svg></svg>
						</el-main>
					</el-container>
				</div>
			</el-col>
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

	export default {
		name: "class",
		data() {
			return {
				projectName: 'dmo',
				selectedClass: {
					className:'疾病',
					iri: 'http://owl/onto.owl#疾病',
					annotations: [],
					parents: [],
					relationships: [],
					comments: []
				},
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
				dialogVisable: false,
				detailVisable: true,
				viewVisable: false,
			}
		},
		components: {
			headTop
		},
		methods: {
			editComments: function () {
				
			},
			submitComment: function () {
				this.selectedClass.comments.push(this.comment)
				this.comment = ''
				this.dialogVisable = false
			}
		}
	}
</script>
<style>
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
  	margin: 0;
  	padding: 0;
  }
  .el-main > .detail {
  	box-sizing: border-box;
  	margin: 0 0 2px 0;
  	padding: 10px;
  	width: 100%;
  	height: 100px;
  	background: #f5f7fa;
  }

  .detail * {
  	font-size: 14px;
  }
  .detail input {
  	width: 400px;
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