<template>
	<div>
		 <el-dialog title="选择封面图片" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="活动区域" >
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option 
        v-for="item in groupList"
        :label="item.groupName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
	</div>
</template>
<script>
  import materialApi from '@/api/material'
  export default {
  	data(){
      return {
        dialogFormVisible:true,
        groupList:[],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      }
    },
    watch:{
      dialogFormVisible(){
        if(this.dialogFormVisible==true){
          this.getGrouping()
        }
      }
    },
    created(){
      this.getGrouping()
    },
    methods:{
      getGrouping(){
        console.log('ffff')
        materialApi.getGrouping().then(res=>{
          console.log(res)
          this.groupList = res.data.data
          this.groupList.unshift({
            groupName:"默认分组^ ^",
            id:"-1"
          })          
        })        
      }
    }

  };	
</script>
<style>
	
</style>