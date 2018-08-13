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
							<el-button type="primary" icon="el-icon-plus" @click="goAdd">添加</el-button>
						</el-col>
					</el-row>
					<el-table
						v-loading="loading"
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
							prop="roleName"
							label="角色"
							width="200">
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
							width="200"
							fixed="right">
							<template slot-scope="scope">
								<el-button-group>
								  <el-button @click="goEdit(scope.row)" size="mini" type="primary">内容</el-button>
								  <el-button @click="goQx(scope.row)" size="mini" type="success">角色</el-button>
								  <el-button @click="goDel(scope.row)" size="mini" type="danger">删除</el-button>
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
		  <el-form ref="form" :model="adminUser" :rlues="rlues" label-width="80px">
		    <el-form-item label="账号" prop="username">
		      <el-input  v-model.trim="adminUser.username"   auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="职位">
		      <el-select v-model="adminUser.job"  placeholder="请选择职位">
		        <el-option label="开发" value="shanghai"></el-option>
		        <el-option label="销售" value="beijing"></el-option>
		      </el-select>
		    </el-form-item>
		   </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="closeDialog">取 消</el-button>
		    <el-button type="primary" @click="doSave">确 定</el-button>
		  </div>
		  	
		</el-dialog>
		<qx-dialog @get_user_list="getUserList" :adminUser="adminUser"  :dialog2.sync="dialog2"  :data="transferDataAll"></qx-dialog>
	</div>
</template>

<script>
	import {userApi,roleApi} from '@/api/sys'
	import {resetObj} from '@/utils/index'
	import qxDialog from './qxDialog'
	export default {
	  name: 'AdminUser',
		components:{
			qxDialog
		},
	  data() {
	  	var validateUsername = (rule,value,callback)=>{
	  		if(!/\w+/i.test(rule)){
	  			callback(new Error('字符只能是字母数字和_'));
	  		}else{
	  			callback();
	  		}
	  	}
	    return {
				loading: false,
	      tableData: [],
	      dialog1: false,
				dialog2: false,
	      adminUser: {
	        id: '',
	        username: '',
	        role: [],
	        job: '',
	        empt: '',
	        addTime: ''
	      },
	      rlues:{
	      	username:[
						{required:true,message:'用户名不能为空!',trigger:'blur'},
	      		{min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' },
	      		{validator:validateUsername,trigger:'blur'}
	      	]
	      },
				transferDataAll:[],
				transferDataValue:[]

	    }
	  },
	  methods: {
	    getUserList() {
				this.loading = true;
	      userApi.userList()
	        .then(res => {
	          this.tableData = res.data.data.list
						this.loading = false
	        })
	    },
			//获取所有的角色列表
			getRoleList(){
				roleApi.roleList()
					.then(res=>{
						var roleList = res.data.data;
						if(roleList){
							var data = [];
							roleList.forEach((item,index)=>{
								data.push({
									key:item.id,
									label: item.roleName
								})
							})
							this.transferDataAll = data;
						}
					})
			},
			goAdd(){
				resetObj(this.adminUser);
				this.dialog1 = true;
			},
	    goEdit(row) {
	      this.adminUser = row
	      this.dialog1 = true
	    },
			goDel(row){
				this.$confirm('确定删除用户'+row.username+'?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'danger'
        }).then(() => {
					userApi.delUser({id:row.id})
						.then(res=>{
							if(res.data.code == 'success'){
								this.getUserList()
							}else{
								this.$message.error('删除失败!')
							}
						})

        })
			},
	    closeDialog() {
				this.dialog1 = false
	      resetObj(this.adminUser)

	    },
			doSave(){
				this.$refs.form.validate((valid) => {
					if(valid){
						var api ;
						if(this.adminUser.id){
							api = userApi.updateUser
						}else{
							api = userApi.addUser
						}
						api({adminUser:this.adminUser})
							.then(res=>{
								if(res.data.code == 'success' ){
									resetObj(this.adminUser)
									this.dialog1 = false;
									this.getUserList();
								}else{
									this.$message.error('保存失败!')
								}
							})
					}else{
						this.$message.error('表单验证失败!')
						return false
					}
				})
				
			},
			goQx(row){
				this.dialog2 = true;
				this.adminUser = row;
			}
	  },
	  created() {
	    this.getUserList()
			this.getRoleList()
	}
	}
</script>