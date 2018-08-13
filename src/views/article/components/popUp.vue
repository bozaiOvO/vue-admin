<template>
	<div class="box" v-show='ispopUpShow'>
		 <el-dialog title="选择封面图片" :visible.sync="isShow">
      <el-row :gutter="20" class='bg'>
        <el-col :span="16">
          <div class="grid-content bg-purple">
              <ul class="img-list">
                <li 
                v-for="item in imgList" 
                :key='item.id'
                @click='handleClickImg(item.ossUrl)'
                >
                  <a class="img" href="javascript:;" :style="{'background-image':'url('+item.ossUrl+')'}"> </a>
                </li>
              </ul>
          </div>
        </el-col>
        <el-col :span="6" class='right-box'>
          <div class="grid-content bg-purple">
            <ul class="sidebar">
              <li 
              v-for="(value,index) in groupList" 
              :key="value.id"
              :class='{active:currentIndex===index}'
              @click=changeIndex(index)
              >{{value.groupName}}</li>
            </ul>
          </div>
        </el-col>
      </el-row>
    <page :page='page' @handleCurrentChange='handleCurrentChange' @handleSizeChange='handleSizeChange'></page>
</el-dialog>
	</div>
</template>
<script>
  import materialApi from '@/api/material'
  import common from '@/utils/common'
  import Page from '@/components/Page'
  export default {
    components:{
      Page
    },
    props:{
      ispopUpShow:{
        type:Boolean,
        default:false
      }
    },
  	data(){
      return {
        isShow:false,
        groupList:[],
        imgList:[],
        currentIndex:0,
        currentGroup:{},
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
      page:{
        currentPage:1,
        pageSize:10,
        totalRow:10,
      },
      }
    },
    watch:{
      ispopUpShow(){
        if(this.ispopUpShow==true){
          this.isShow=this.ispopUpShow
        }
      },
      isShow(){
        if(this.isShow==false){
          this.$emit('ispopUpShow')
        }
      }
    },
    created(){
      this.getGrouping()
      this.getMaterialList()//获取图片
    },
    methods:{
      getGrouping(){
        materialApi.getGrouping().then(res=>{
          console.log(res)
          this.groupList = res.data.data
          this.groupList.unshift({
            groupName:"默认分组^ ^",
            id:"-1"
          })  
          console.log(this.groupList)       
        })        
      },
      getMaterialList(group=-1,page=1){
        materialApi.getMaterialList({groupId:group,pageNumber:page}).then(res=>{
          if(res.status=200){
            this.imgList=res.data.data.list
            this.page.pageSize = res.data.data.pageSize
            this.page.totalRow = res.data.data.totalRow         
          }
        })
      },   
      changeIndex(index){
        this.currentIndex = index
        this.currentGroup=this.groupList[this.currentIndex]
        this.page.currentPage = 1
        this.getMaterialList(this.currentGroup.id,1)
      },
      handleClickImg(id){
        const that = this
        common.confirmFn.call(this,'选择这张图片作为封面吗',function(){
          that.$emit('coverImgUrl',id)
          that.isShow=false
        })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);  
        this.page.currentPage = val
        this.getMaterialList(this.currentGroup.id,val)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },   
    }

  };	
</script>
<style scoped>
	*{
    margin: 0;
  }
  .bg{
    background-color: yellow;
  }
  ul{
    list-style: none;
  }
  ul.sidebar li{
    padding: 5px 0;
    margin-top: 5px;
    cursor: pointer;
  }
  ul.sidebar li:hover{
     background-color: #F4F5F9;
  }
  ul.sidebar li.active{
    background-color: #F4F5F9;
  }
  ul.img-list li{
    float: left;
    width: 130px;
    margin-top: 10px;
    margin-left: 10px;
  }
  ul.img-list li .img{
    display: block;
    height: 110px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
</style>