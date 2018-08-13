<template>
	<div class="menu-main">
		<el-row style="padding:20px;">
			<el-col :span="24">
				<el-card shadow="never">
					<tree-table :data="tableTreeData" border>
						<el-table-column 
							label="等级"
							prop="level"
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
							label="PID"
							prop="pId"
							width="120">
						</el-table-column>
					</tree-table>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import api from '@/api/sys'
	import treeTable from '@/components/TreeTable'
	export default {
	  components: {
	    treeTable
	  },
	  name: 'adminMenu',
	  data() {
	    return {
	      tableData: []
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
	        console.log(item.list)
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
	      console.log(tree)
	      return tree
	    }
	  },
	  methods: {
	    getMenuList() {
	      api.menuList()
	        .then(res => {
	          this.tableData = res.data.data
	          console.log(res)
	        })
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