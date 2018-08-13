<template>
	 <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page.currentPage"
        :page-size="page.pageSize"
        background
        layout="prev, pager, next, jumper"
        :total="page.totalRow">
        <span class="demonstration">直接前往</span>
      </el-pagination>
    </div>
</template>
<script>
	export default {
		props:{
			page:{
				type:Object,
				default:{
			        currentPage:1,
			        pageSize:10,
			        totalRow:10,					
				}
			}
		},
		methods:{
		    handleCurrentChange(val) {
		    	this.$emit('handleCurrentChange',val)
		    },
		    handleSizeChange(val) {
		      his.$emit('handleCurrentChange',val)
		    },			
		}
	}
</script>
<style scoped>
	
</style>