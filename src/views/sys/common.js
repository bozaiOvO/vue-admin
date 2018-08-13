export function reverseTree(obj){
		var tree = []
	  obj.forEach(item => {
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