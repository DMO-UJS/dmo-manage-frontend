<template>
	<div class="about">
		<el-container>
			<el-header height="100px">
				<img id="logo" src="../assets/医院.svg">
				<br/>
				镇江第四人民医院
			</el-header>
			<el-container>
				<el-aside width="200px" class="aside">
					<el-button type="primary" @click="dialogVisable = true">创建本体库</el-button>
					<el-dialog title="创建本体库" :visible.sync="dialogVisable" width="800px">
						<el-form :model="ontologyLibrary">
							<el-form-item label="本体库名称">
						    <el-input v-model="ontologyLibrary.name"></el-input>
						  </el-form-item>
						  <el-form-item label="描述">
						  	<el-input type="textarea" v-model="ontologyLibrary.description"></el-input>
						  </el-form-item>
						  <el-form-item align="left">
						  	<el-switch
						  		v-model="ontologyLibrary.state"
						  		active-text="公开"
						  		inactive-text="私有"
						  	>
						  	</el-switch>
						  </el-form-item>
						  <el-form-item label="选择现有本体文件">
						  	<el-input type="file" class="fileItem"></el-input>
						  </el-form-item>
						  <el-form-item>
						  	<el-button type="primary" @click="createOntology()">立即创建</el-button>
						  </el-form-item>
						</el-form>
					</el-dialog>
				</el-aside>
				<el-main>
					<el-table
					:data="ontologyLibraryList"
					highlight-current-row
    			@current-change="handleCurrentChange"
    			@row-dblclick="handleCurrentEdit"
					style="width: 100%"
					:deafult-sort = "{prop: 'data', order: 'descending'}">
						<el-table-column
							prop="name"
							label="本体库名称"
							style="width: 20%">
						</el-table-column>
						<el-table-column
							prop="owner"
							label="创建人"
							style="width: 20%">
						</el-table-column>
						<el-table-column
							prop="date"
							label="创建时间"
							sortable
							style="width: 20%">
						</el-table-column>
						<el-table-column
							prop="state"
							label="状态"
							style="width: 20%">
						</el-table-column>
						<el-table-column
							label="操作"
							align=center
							width="200">
							<template scope="scope">
								<el-button icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
								<el-button icon="el-icon-delete" @click="handleDelete(scope.$index, ontologyLibrary)"></el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-main>
			</el-container>
			<el-footer>Footer</el-footer>
		</el-container>
	</div>
</template>

<script>

	export default {
		name: 'about',
		data() {
			return {
				ontologyLibrary: {
					name: "妊娠期本体",
					description: "妊娠期本体",
					state: true,
				},
				ontologyLibraryList: [{
					name: "妊娠期糖尿病",
					owner: "胡惊涛",
					date: "2018-11-05",
					state: "私有"
				}, {
					name: "高血压",
					owner: "徐",
					date: "2018-11-06",
					state: "公有"
				}, {
					name: "贫血",
					owner: "陈",
					date: "2018-11-07",
					state: "私有"
				}],
				options: [{
					value: "打开",
				}, {
					value: "下载",
				}, {
					value: "删除"
				}],
				currentRow: null,
				value: '',
				dialogVisable: false,
				createUrl: 'http://192.168.1.102:5000/ontocreate'
			}
		},
		methods: {
			createOntology: function () {
				this.dialogVisable = false
				let message = this.ontologyLibrary
				message.owner = "陈"
				this.$http.post(this.createUrl, message)
         .then((response) => {
         		 console.log(response.data)
         			this.programs = response.data
         }, (response) => {
         	alert(response)
         })
			},
			handleCurrentChange : function (val) {
				this.currentRow = val
			},
			handleCurrentEdit: function (row) {
				console.log(row)
			},
			handleEdit: function (index, rowData) {
				console.log(rowData)
			},
			handleDelete(index, rows) {
		    rows.splice(index, 1);
		  }
		}
	}
</script>

<style>
	.aside {
		padding: 35px;
	}

	#logo {
		width: 50px;
		height: 50px;
	}

	.fileItem input {
		border: none;
		line-height: 100%;
	}
	el-table el-button {
		border: none;
		outline: none;
	}
</style>
