<template>
	<div id="dialog">
		<el-dialog title="提示" :visible.sync="dialogObj.dialogFormVisible">
		    <span>{{dialogObj.msg}}</span>
		      <el-input v-model="value" auto-complete="off"></el-input>
		   
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="closeDialog">取 消</el-button>
		    <el-button type="primary" @click="determine">确 定</el-button>
		  </div>
		</el-dialog>		
	</div>
</template>
<script>
	export default{
		props:{
			dialogObj:{
				type:Object,
				default:function(){
					return {
				        dialogFormVisible: true,
				        msg :'请输入用户名',
				        formLabelWidth: '120px'					
					}
				}
			}
		},
		data(){
			return {
		        value:'',
			}
		},
		methods:{
			closeDialog(){
				this.$emit(closeDialog)
			},
			determine(){
				this.$emit(closeDialog,this.value)
			}
		}
	}
</script>
<style scoped>
</style>