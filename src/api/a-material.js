import axios from 'axios'
let url = 'http://192.168.0.100/'
export function getMaterialList(fn){
    axios.get(url+'api/material/list')
	.then(res=>{
        fn(res)
    })
}