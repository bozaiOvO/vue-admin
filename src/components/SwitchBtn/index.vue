<template>
	<div>
		<el-switch
			@change='handleClick($event)'
		  v-model="value1"
		  active-color="#13ce66"
		  inactive-color="#ff4949">
		</el-switch>
	</div>
</template>
<script>
  export default {
    data(){
      return {
        value1:true,
      }
    },
    methods:{
    	handleClick(value){
    		this.$emit('changeswitch',value)
    	}
    }
  };	
</script>
<style>
	
</style>