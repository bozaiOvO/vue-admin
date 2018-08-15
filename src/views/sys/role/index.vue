<template>
	<div class="role-main">
		<el-row style="padding:20px">
			
			<el-col :span="24">
				<el-card>
					<div slot="head">
						<span>角色列表</span>
					</div>
					<el-row style="margin-bottom:20px;">
						<el-col>
							<el-button @click="goEditRoll('')" type="primary" size="small">添加角色</el-button>
						</el-col>
					</el-row>
					<el-table 
						highlight-current-row
						border
						:data="roleList">
						<el-table-column
							type="index"
							width="50">
						</el-table-column>
						<el-table-column
							prop="roleName"
							label="角色名称"
							width="120">
						</el-table-column>
						<el-table-column
							prop="desc"
							label="角色描述"
							width="220">
						</el-table-column>
						<el-table-column
							prop="addTime"
							label="添加时间"
							width="120">
						</el-table-column>
						<el-table-column
							prop="creator"
							label="创建者"
							width="120">
						</el-table-column>
						<el-table-column
							prop="creator"
							label="创建者"
							width="120">
						</el-table-column>
						<el-table-column
							prop="creator"
							label="操作"
							width="220">
							<template slot-scope="scope">
								<el-button-group>
									<el-button @click="goEditRoll(scope.row)" size="mini" type="primary">内容</el-button>
									<el-button @click="goEditQx(scope.row)"  size="mini" type="success">权限</el-button>
									<el-button @click="goDel(scope.row)" size="mini" type="danger">删除</el-button>
								</el-button-group>
							</template>
						</el-table-column>	
					</el-table>
				</el-card>
				
			</el-col>
			
		</el-row>
		
		<el-dialog
		  title="提示"
		  :visible.sync="dialog1"
		  @close = "cancledialog"
		  width="30%">
		  <el-form v-loading="loading" ref="form" :model="role" :rules="rules" label-width="80px">
		  	<el-form-item label="角色名称" prop="roleName">
		  		<el-input v-model="role.roleName"></el-input>
		  	</el-form-item>
		  	<el-form-item label="角色描述">
		  		<el-input  type="textarea"  v-model="role.desc"></el-input>
		  	</el-form-item>
			<el-form-item label="角色权限">
		  		<el-input  value="成功添加角色后方可配置权限." disabled></el-input>
		  	</el-form-item>
			  
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancledialog">取 消</el-button>
		    <el-button type="primary" @click="doSaveRole">确 定</el-button>
		  </span>
		</el-dialog>
		<el-dialog
			title="权限修改"
			:visible.sync="dialog2"
			@close="cancledialog2"
			width="30%">
			<div slot="header" class="clearfix">
					    <span><font class="primary">{{role.roleName}}</font> 权限列表</span>
					    <el-button v-show="role.id" @click="cancelQxEdit" style="color:#f56c6c;float: right; padding: 3px 0;"  type="text">取消编辑</el-button>
				    </div>
					<el-card shadow="never">
						<el-tree
							ref="tree"
							default-expand-all
							:data="treeData"
							show-checkbox
							node-key="id"
							:default-checked-keys="checkKeys"
							:props="defaultProps">
						</el-tree>
					</el-card>
					
			        
					<span slot="footer" class="dialog-footer">
					<el-button @click="cancledialog2">取 消</el-button>
					<el-button @click="resetTree" type="warning" plain>恢复</el-button>	
					<el-button type="primary" @click="doSaveMenu">确 定</el-button>
				</span>				
		</el-dialog>

	</div>
</template>

<script>
	import {roleApi,menuApi} from '@/api/sys'
	import {resetObj} from '@/utils/index'
	import {reverseTree} from '../common'
	export default {
		name:'SysRole',
		data () {
			return {
				roleList:[],
				loading:false,
				dialog1:false,
				dialog2:false,
				btnLoading:false,
				role:{
					id:'',
					roleName:'',
					desc:'',
					creator:'',
					addTime:''
				},
				columnHide:true,
				leftSpan:24,
				menuList:[],
				defaultProps: {
		          children: 'children',
		          label: 'name'
		        },
		        checkKeys:[],//选中的tree
		        tempRole:{
		        	id:'',
		        	roleName:''
				},
				rules:{
					roleName:[
						{required:true,message:'角色不能为空',trigger:'blur'},
						{min:3,max:20,message:'长度为3~20',trigger:'blur'}],
					desc:[
						{max:200,message:'不能超过200字符',trigger:'blur'}
					]
				}
			}
		},
		computed:{
			treeData(){
				return reverseTree(this.menuList);
			}
		},
		methods:{
			getRoleList(){
				roleApi.roleList()
					.then(res=>{
						this.roleList = res.data.data;
					})
			},
			cancledialog(){
				this.$refs.form.resetFields();
				this.dialog1 = false;
				resetObj(this.role);
			},
			
			goEditRoll(row){
				//修改
				if(row){
					//clone副本很重要!!!
					this.role = Object.assign({},row);
				}
				this.dialog1 = true;
			},
			doSaveRole(){
				this.$refs.form.validate(valid=>{
					if(true){
						this.loading = true;
						var api;
						if(this.role.id){
							api = roleApi.updateRole;
						}else{
							api = roleApi.saveRole;
						}
						api({role:this.role})
							.then(res=>{
								if(res.data.code=="success"){
									this.$message.success('保存成功!');
									this.getRoleList();
									this.loading = false;
								}else{
									this.$message.error('保存失败!');
								}
								this.dialog1 = false;
							})
					}else{
						this.$message.error('表单验证失败!');
						return false;
					}
				})
			},
			getMenuList(){
				menuApi.menuList()
					.then(res=>{
						this.menuList = res.data.data;
					})
			},
			goDel(row){
				this.$confirm('确定删除角色:'+row.roleName+'?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'danger'
					}).then(()=>{
						roleApi.delRole({roleId:row.id})
							.then(res=>{
								if(res.data.code=="success"){
									this.getRoleList();
								}else{
									this.$message.error('删除失败!')
								}
							})
					})
			},
			goEditQx(row){
				this.role = Object.assign({},row);
				this.dialog2 = true;
				this.getMenuByRole(this.role);
			},
			getMenuByRole(role){
				roleApi.getMenuByRole({roleId:role.id})
					.then(res=>{
						var ids = [];
						if(res.data.data&&res.data.data.length>0){
							res.data.data.forEach(item=>{
								ids.push(item.menuId);
							})
						}
						this.$refs.tree.setCheckedKeys(ids);
					})
			},
			doSaveMenu(){
				if(!this.role.id){
					this.$message.error('没有选中角色!');
					return;
				}
				this.btnLoading = true;
				var keys = this.$refs.tree.getCheckedKeys()||[];
				roleApi.saveMenuByRole({
					roleId:this.role.id,
					menuIds:keys
				}).then(res=>{
						if(res.data.code=='success'){
							this.$message.success('保存成功!');
						}else{
							this.$message.error('保存失败!');
						}
						this.dialog2 = false;
					})

			},
			resetTree(){
				this.$refs.tree.setCheckedKeys(this.tempRole.qx);
			},
			cancledialog2(){
				this.dialog2 = false;
				resetObj(this.role);
			},
			cancelQxEdit(){
				resetObj(this.tempRole);
				this.$refs.tree.setCheckedKeys([]);
			}
		},
		created(){
			this.getRoleList();
			this.getMenuList();
		}
	}

</script>
<style scoped>
	.role-block{
		height: 100px;
	}
	.warning{
		color:#E6A23C;
	}
	.primary{
		color:#409EFF;
	}
	
</style>