<template>
	<div class="classA">
		<headTop :project-name="projectName"></headTop>
		<el-row :gutter='20'>
			<el-col :span="6">
				<div class="grid-content bg-purple">
					<el-container>
						<el-header>
							<div class="classA-hierarchy-header">
								类的层级关系
							</div>
							<div class="classA-hierarchy-tools">
								<el-row>
									<el-button icon="el-icon-plus" circle size="mini"></el-button>
									<el-button icon="el-icon-minus" circle size="mini"></el-button>
									<el-button icon="el-icon-search" circle size="mini"></el-button>
								</el-row>
							</div>
						</el-header>
						<el-main>
							层级列表
						</el-main>
					</el-container>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="grid-content bg-purple">
					<el-container>
						<el-header>
							<div class="classA-hierarchy-header">
								类：{{selectedClass}}
							</div>
							<div class="classA-hierarchy-tools">
								<el-row>
									<el-button icon="el-icon-edit-outline" size="mini"></el-button>
									<el-button icon="el-icon-view" size="mini"></el-button>
								</el-row>
							</div>
						</el-header>
						<el-main v-if="detailVisable">
							<div class="detail" name="iri">
								IRI
								<p>{{iri}}</p>
							</div>
							<div class="detail" name="annotations">
								Annotations
								<div>
									<input type="text" name="property" placeholder="属性">
									<input type="text" name="value" placeholder="值">
									<input type="text" name="lang" placeholder="语言">
								</div>
							</div>
							<div class="detail" name="parents">
								Parents
								<div>
									<input type="text" name="className" placeholder="请输入类名">
								</div>
							</div>
							<div class="detail" name="relationships">
								Relationships
								<div>
									<input type="text" name="property" placeholder="属性">
									<input type="text" name="value" placeholder="值">
									<input type="text" name="lang" placeholder="语言">
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
				<div class="grid-content bg-purple">
					<el-container>
						<el-header>
							<div class="classA-hierarchy-header">
								备注：{{selectedClass}}
							</div>
							<div class="classA-hierarchy-tools">
								<el-row>
									<el-button icon="el-icon-document" size="mini" @click="dialogVisable = true"></el-button>
									<el-dialog title="添加备注" :visible.sync="dialogVisable" width="800px">
										<textarea></textarea>
										<div>
											<el-button type="info">取消</el-button>
											<el-button type="primary">确认</el-button>
										</div>
									</el-dialog>
								</el-row>
							</div>
						</el-header>
						<el-main>
							备注：{{selectedClass}}
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
				iri: "http://owl/onto.owl#疾病",
				selectedClass: "疾病",
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
  .el-col {
  	border-radius: 2px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
  	border-radius: 2px;
    min-height: 360px;
  }

  /*class hierarchy*/
  .classA-hierarchy-header {
  	width: 100%;
  	height: 40px;
  	background: #000;
  	font-size: 16px;
  	text-align: left;
  }

  .classA-hierarchy-tools {
  	width: 100%;
  	height: 40px;
  	background: #0b0;
  }

  /*class*/
  .el-main > .detail {
  	height: 100px;
  	border-bottom: 1px solid #00f
  }
</style>