<template>
	<div id="list">
		<div class="tag-list-main">
			<el-checkbox-button :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox-button>		
		  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
		    <el-checkbox-button v-for="item in tagList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox-button>
		  </el-checkbox-group>
		</div>
		  
	</div>
</template>
<script>
	export default {
		props:{
			tagList:{
				type:Array
			}
		},
	    data() {
	      return {
	        checkAll: false,
	        checkedTagList: [],//这个是被选中的数组
	        isIndeterminate: true
	      };
	    },
	    methods: {
	      handleCheckAllChange(val) {
	        this.checkedCities = val ? this.tagList : [];
	        this.isIndeterminate = false;
	      },
	      handleCheckedCitiesChange(value) {
	        let checkedCount = value.length;
	        this.checkAll = checkedCount === this.tagList.length;
	        this.isIndeterminate = checkedCount > 0 && checkedCount < this.tagList.length;
	      }
	    }
	}
</script>
<style scoped>
	.tag-list-main{
		position: absolute;
		left: 10px;
		top: 10px;
	}
</style>