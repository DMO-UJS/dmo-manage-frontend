<template>
	<div class="about">
		<el-container>
			<el-header height="150px">
				<img src="../assets/医院.svg">
				<br/>
				镇江第四人民医院
			</el-header>
			<el-container>
				<el-aside width="400px">
					<el-button type="primary">创建本体库</el-button>
				</el-aside>
				<el-main>
					<el-table
					:data="ontologyLibrary"
					height="250"
					stripe
					border
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
							width="100">
							<template slot-scope="scope">
								<el-button>
									<img src="../assets/医院.svg">
							 	</el-button>
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
				ontologyLibrary: [{
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
				}]
			}
		}
	}
</script>

<style scoped>
	img {
		width: 50px;
		height: 50px;
	}
</style>
