<template>
	<div class="home">
			<headTop></headTop>
			<el-container>
				<el-aside width="200px">
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
						  	<el-input type="file" class="fileItem" @change="fileSave"></el-input>
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
    			@row-dblclick="handleCurrentEdit"
					style="width: 100%;"
					:header-cell-style="{background: '#e4e7ed'}"
					:row-style="{background: 'transparent'}"
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
							<template slot-scope="scope">
								<el-button icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
								<el-button icon="el-icon-delete" @click="handleDelete(scope.$index, ontologyLibraryList)"></el-button>
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

import headTop from '../components/Header' 

	export default {
		name: 'home',
		data() {
			return {
				ontologyLibrary: {
					name: "",
					description: "",
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
				createUrl: 'http://192.168.1.102:5000/ontocreate',
				file: null,
			}
		},
		mounted() {
			this.getOntologyLibraryList()
		},
		components: {
			headTop
		},
		methods: {
			getOntologyLibraryList: function () {
				this.$http.get("http://192.168.1.102:5000/ontolist")
					.then((response) => {
						this.ontologyLibraryList = response.data
					}, (response) => {
						// error
					})
			},
			createOntology: function () {
				this.dialogVisable = false
				let message = this.ontologyLibrary
				message.owner = "陈"
				message.state = Number(this.ontologyLibrary.state)
				console.log(message.owner)
				if (this.file) {
					this.fileUpload()
				}
				this.$http.post(this.createUrl, message)
         .then((response) => {
         		 console.log(response.data)
         			this.programs = response.data
         			this.init()
         }, (response) => {
         	alert(response)
         })
			},
			handleCurrentChange : function (val) {
				this.currentRow = val
			},
			handleCurrentEdit: function (row) {
				console.log(row)
				this.$router.push('class')
			},
			handleEdit: function (row) {
				console.log(row)
				this.$router.push('class')
			},
			handleDelete(index, rows) {
		    let message = rows.splice(index, 1)[0];
		    console.log(message)
		    this.$http.post("http://192.168.1.102:5000/ontodelete", message)
		    	.then((response) => {
		    		// success
		    		alert("删除成功")
		    	}, (response) => {
		    		// error
		    	})
		  },
		  fileSave: function() {
	      this.file = event.target.files[0]
	    },
	    fileUpload: function () {
	    	const formData =  new FormData()
	      formData.append('file', this.file)
	      this.$http.post("http://192.168.1.102:5000/ontofileupload", formData).then(response => {
	        // success
	      }, response => {
	        // error
	      })
	    }
		}
	}
</script>

<style scoped>
	.el-container {
		margin-top: 5px;
	}
	.el-aside {
		padding: 35px;
		background-color: #e4e7ed;
	}

	.el-main {
		margin-left: 5px;
		background-color: #e4e7ed;
	}
	.fileItem input {
		border: none;
		line-height: 100%;
	}
	.el-table {
		background-color: transparent;
	}
</style>
