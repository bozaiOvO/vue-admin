function clearSpace(data){
	if(data=='') return
	return data.replace(/(^\s*)|(\s*$)/g, "");
}
    //弹窗方法
function confirmFn(msg,fn){
	const that =this
    that.$confirm(msg, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      fn()
    }).catch(() => {
      that.$message({
        type: 'info',
        message: '已取消删除'
      });          
    });
}
    //弹窗方法
function promptFn(msg,fn){
	let  that = this
  this.$prompt(msg,'提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',        
    }).then(({value})=>{

      value = clearSpace(value)
      if(value==''){
       return that.$message.error('不可以输入为空'); 
      }else{
        fn(value)
      }
    }).catch(() => {
      that.$message({
        type: 'info',
        message: '取消输入'
      });       
    });
}
//提示
function message(type,msg,value=''){
  if(type=='error'){
    this.$message.error(msg+value);
  }else if(type=='success'){
    this.$message({
      type: 'success',
      message: msg+value
    });    
  }
}
export default({
	clearSpace,
	promptFn,
	confirmFn,
  message
})