<template>
	<div class="admin-user-main">
		<el-row style="margin:10px auto;padding:0 20px;">
			<el-col :span="24">  
				<el-card shadow="hover">
					<div>
						<el-input
							style="width:200px"
						  placeholder="搜索内容"
						  clearable>
						</el-input>
						<el-input
							style="width:200px"
						  placeholder="搜索内容"
						  clearable>
						</el-input>
						<el-input
							style="width:200px"
						  placeholder="搜索内容"
						  clearable>
						</el-input>
						<el-input
							style="width:200px"
						  placeholder="搜索内容"
						  clearable>
						</el-input>
						<el-button style="margin-left:50px;" type="primary">搜索</el-button>
						<el-button>重置</el-button>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-row style="padding:0 20px;margin-top:10px;">
			<el-col :span="24">
				<el-card
					shadow="never">
					<el-row>
						<el-col :span="24">
							<el-button type="primary" icon="el-icon-plus" @click="dialog1=true">添加</el-button>
						</el-col>
					</el-row>
					<el-table
						border
						:data="tableData"
						style="margin-top:20px;">
						<el-table-column
							type="selection"
							width="55"
							fixed="left">
						</el-table-column>
						<el-table-column
							fixed="left"
					        type="index">
					    </el-table-column>
						<el-table-column
							prop="username"
							label="姓名"
							width="160"
							fixed="left">
						</el-table-column>
						<el-table-column
							prop="desc"
							label="描述"
							width="220">
						</el-table-column>
						<el-table-column
							label="角色"
							width="200">
							<template slot-scope="scope">管理员,超级管理员</template>
						</el-table-column>
						<el-table-column
							label="职位"
							width="200">
							<template slot-scope="scope">经理</template>
						</el-table-column>
						<el-table-column
							label="部门"
							width="200">
							<template slot-scope="scope">开发部</template>
						</el-table-column>
						<el-table-column
							label="创建时间"
							width="200">
							<template slot-scope="scope">2018-10-10 上午</template>
						</el-table-column>
						<el-table-column
							align="center"
							label="操作"
							width="200">
							<template slot-scope="scope">
								<el-button-group>
								  <el-button @click="goEdit(scope.row)" size="mini" type="primary">内容</el-button>
								  <el-button size="mini" type="success">权限</el-button>
								  <el-button size="mini" type="danger">删除</el-button>
								</el-button-group>
							</template>
							
						</el-table-column>
					</el-table>
					<el-pagination
						style="margin:20px;"
					  :page-size="20"
					  :pager-count="11"
					  layout="prev, pager, next"
					  :total="1000">
					</el-pagination>
				</el-card>
				
			</el-col>
		</el-row>
		<el-dialog 
			title="账号信息" 
			:visible.sync="dialog1"
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			closed="closeDialog">
		  <el-form :model="adminUser" label-width="80px">
		    <el-form-item label="账号">
		      <el-input  v-model="adminUser.username"   auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="职位">
		      <el-select v-model="adminUser.job"  placeholder="请选择职位">
		        <el-option label="开发" value="shanghai"></el-option>
		        <el-option label="销售" value="beijing"></el-option>
		      </el-select>
		    </el-form-item>
		
		  <el-form-item label="描述" >
		      <el-input v-model="adminUser.desc" type="textarea"></el-input>
		   </el-form-item>
		   </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialog1 = false">取 消</el-button>
		    <el-button type="primary" @click="dialog1 = false">确 定</el-button>
		  </div>
		  	
		</el-dialog>
	</div>
</template>

<script>
	import api from '@/api/sys'
	export default {
	  name: 'AdminUser',
	  data() {
	    return {
	      tableData: [],
	      dialog1: false,
	      adminUser: {
	        id: '',
	        username: '',
	        desc: '',
	        role: [],
	        job: '',
	        empt: '',
	        addTime: ''
	      }
	    }
	  },
	  methods: {
	    getUserList() {
	      api.userList()
	        .then(res => {
	          this.tableData = res.data.data.list
	        })
	    },
	    goEdit(row) {
	      this.adminUser = row
	      this.dialog1 = true
	      console.log(this.adminUser)
	    },
	    closeDialog() {
	      this.adminUser = {
	        id: '',
	        username: '',
	        desc: '',
	        role: [],
	        job: '',
	        empt: '',
	        addTime: ''
	      }
	      console.log(';;;')
	    }
	  },
	  created() {
	    this.getUserList()
	}
	}
</script>