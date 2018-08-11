<template>
	<div class="role-main">
		<el-row style="padding:20px;">
			<el-col :span="24">
				<el-card shadow="never">
					<div slot="header" class="clearfix">
						<span>角色列表</span>
					</div>
					<el-row :gutter="20">
						<el-col v-for="role in roleList" :key="role.id" :span="6" class="role-block">
								<el-card 
									shadow="hover" 
									:body-style="{ padding: '15px' }">
									
										<div slot="header" class="clearfix">
											<span>{{role.roleName}}</span>
											<el-button style="float: right; padding: 3px 0" type="text">明细</el-button>
										</div>
									
									<el-button plain size="mini" @click="showUserList(role)">查看用户</el-button>
									<el-button plain type="primary" size="mini" @click="showQx(role)">查看权限</el-button>
								</el-card>
							
							
						</el-col>
						
					</el-row>
				</el-card>
			</el-col>
		</el-row>
		<el-row style="padding:20px;" :gutter="20">
			<el-col :span="8">
				<el-card shadow="never">
					<div slot="header" class="clearfix">
						<span><font class="primary">{{tempRole.roleName}}</font> 用户</span>
					</div>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="never">
					<div slot="header" class="clearfix">
					    <span><font class="primary">{{tempRole.roleName}}</font> 权限列表</span>
					    <el-button v-show="tempRole.id" @click="cancelQxEdit" style="color:#f56c6c;float: right; padding: 3px 0;"  type="text">取消编辑</el-button>
				    </div>
					<el-tree
						ref="tree"
						default-expand-all
					    :data="treeData"
					    show-checkbox
					    node-key="id"
  						:default-checked-keys="checkKeys"
					    :props="defaultProps">
					</el-tree>
					<div class="bottom clearfix" style="margin-top:20px;border-top:1px solid #e5e5e5;padding-top:20px;text-align:right;">
			            <el-button @click="resetTree">恢复</el-button>					
						<el-button  :loading="btnLoading" @click="saveQx" type="primary">保存</el-button>
					</div>	
				</el-card>
			</el-col>
		</el-row>
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
			goAdd(row){
				if(row){
					this.role = row;
				}
				this.dialog1 = true;
			},
			doAdd(){
				this.$refs.form.validate(valid=>{
					if(valid){
						this.loading = true;
						roleApi.add({role:this.role})
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
			showUserList(){

			},
			showQx(role){
				this.tempRole = {
					id:role.id,
					roleName:role.roleName
				}
				roleApi.getMenuByRole({roleId:role.id})
					.then(res=>{
						var ids = [];
						if(res.data.data&&res.data.data.length>0){
							res.data.data.forEach(item=>{
								ids.push(item.menuId);
							})
						}
						this.tempRole.qx = ids;
						this.$refs.tree.setCheckedKeys(ids);
						
					})
			},
			saveQx(){
				if(!this.tempRole.id){
					this.$message.error('没有选中角色!');
					return;
				}
				this.btnLoading = true;
				var keys = this.$refs.tree.getCheckedKeys();
				roleApi.saveMenuByRole({
					roleId:this.tempRole.id,
					menuIds:keys
				}).then(res=>{
						if(res.data.code=='success'){
							this.$message.success('保存成功!');
						}else{
							this.$message.error('保存失败!');
						}
						setTimeout(()=>{
						   this.btnLoading = false;		
						}, 1500);
					})

			},
			resetTree(){
				this.$refs.tree.setCheckedKeys(this.tempRole.qx);
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