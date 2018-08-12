<template>
	<div class="menu-main">
		<el-row style="padding:20px;">
			<el-col :span="24">
				<el-card shadow="never">
					<el-col :span="24" style="margin:0 auto 20px;">
						<el-button @click="goAdd()" type="primary" icon="el-icon-plus">添加一级菜单</el-button>
					</el-col>
					<tree-table :data="tableTreeData" 
						border>
						<el-table-column 
							label="等级"
							prop="level"
							width="100">
						</el-table-column>
						<el-table-column
							v-if="false" 
							label="ID"
							prop="id"
							show-overflow-tooltip
							width="100">
						</el-table-column>
						<el-table-column 
							label="菜单名称"
							prop="name"
							width="180">
							<template slot-scope="scope">
								<span :class="{'danger':scope.row.level==1}">{{scope.row.name}}</span>
							</template>
						</el-table-column>
						<el-table-column 
							label="url"
							prop="url"
							width="200">
						</el-table-column>
						<el-table-column 
							label="排序"
							prop="sort"
							width="50">
						</el-table-column>
						<el-table-column 
							show-overflow-tooltip
							label="PID"
							prop="pId"
							width="220">
						</el-table-column>
						<el-table-column
							label="操作"
							width="220">
							<template slot-scope="scope">
								<el-button-group>
									<el-button
									@click="goAdd(scope.row)" 
									effect="dark" content="添加子菜单" placement="top"
									v-if="scope.row.level==1" size="mini" type="primary"icon="el-icon-plus"></el-button>
									<el-button size="mini" type="success">修改</el-button>
									<el-button size="mini" type="danger">删除</el-button>
								</el-button-group>
								
							</template>		
						</el-table-column>
					</tree-table>
				</el-card>
			</el-col>
		</el-row>


		<el-dialog
		  v-loading="loading"
		  title="提示"
		  :visible.sync="dialog1"
		  width="30%">
		  <el-form ref="form" :model="menu" :rules="rules" label-width="80px">
		  	<el-form-item label="菜单名称" prop="name">
		  		<el-input v-model="menu.name"></el-input>
		  	</el-form-item>
		  	<el-form-item label="等级">
		  		<el-input-number v-model="menu.level" disabled></el-input-number>
		  	</el-form-item>
		  	<el-form-item label="url" prop="url">
		  		<el-input v-model="menu.url"></el-input>
		  	</el-form-item>
		  	<el-form-item label="排序" required>
		  		<el-input-number v-model="menu.sort"></el-input-number>
		  	</el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancledialog">取 消</el-button>
		    <el-button type="primary" @click="doAdd">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import {menuApi} from '@/api/sys'
	import treeTable from '@/components/TreeTable'
	import {resetObj} from '@/utils/index'
	export default {
	  components: {
	    treeTable
	  },
	  name: 'adminMenu',
	  data() {
	    return {
	      loading: false,
	      tableData: [],
	      dialog1:false,
	      menu:{
	      	id:'',
	      	name:'',
	      	level:'',
	      	pId:'',
	      	sort:''

	      },
	      rules:{
	      	name:[{required: true, message: '请输入菜单名称', trigger: 'blur'}],
	      	url:[{required: true, message: '请输入url', trigger: 'blur'}]
	      }
	    }
	  },
	  computed: {
	    tableTreeData() {
	      var tree = []
	      this.tableData.forEach(item => {
	        var obj = {}
	        for (var key in item.menu) {
	          obj[key] = item.menu[key]
	        }
	        obj.children = []
	        if (item.list) {
	          item.list.forEach(item2 => {
	            var innerObj = {}
	            for (var key in item2) {
	              innerObj[key] = item2[key]
	            }
	            obj.children.push(innerObj)
	          })
	        }
	        tree.push(obj)
	      })
	      return tree
	    }
	  },
	  methods: {
	    getMenuList() {
	      menuApi.menuList()
	        .then(res => {
	          this.tableData = res.data.data
	        })
	    },
	    goAdd (row){
	    	var obj = {};
	    	//没有参数为新增
	    	if(!row){
	    		obj = {pId:'-1',level:1};
	    	}else{
	    		obj = {pId:row.id,level:2}
	    	} 
	    	resetObj(this.menu,obj);
	    	this.dialog1 = true;

	    },
	    doAdd(){
	    	this.$refs.form.validate((valid) => {
				if (valid) {
		    		this.loading = true;
					menuApi.addMenu({menu:this.menu})
							.then(res=>{
								this.dialog1 = false;
								resetObj(this.menu);
								this.getMenuList();
								this.loading = false;
								if(res.data.code="success"){
									this.$message.success('添加成功!');
								}else{
									this.$message.error('保存失败!');
								}
							})
				} else {
					this.$message.error('表单验证失败!');
					return false;
				}
			});
	    	

	    },
	    cancledialog(){
	    	this.$refs.form.resetFields();
	    	resetObj(this.menu);
	    	this.dialog1 = false;
	    }
	  },
	  created() {
	    this.getMenuList()
	}
	}
</script>
<style scoped>
	.danger{
		color: red;
	}
</style>