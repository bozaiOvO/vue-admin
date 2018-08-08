function clearSpace(data){
	if(data=='') return
	return data.replace(/(^\s*)|(\s*$)/g, "");
}
export default({
	clearSpace
})