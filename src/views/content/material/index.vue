<template>
  <div id="material">

      <el-row style="margin-top:20px;" :gutter="20">
        
          <el-col :span="18">
            <el-card shadow="never">
            <div class="grid-content bg-purple">
              <div class="content">
                <header>
                  <div class="grouping">
                    <span class="">当前分组:</span>
                    <span>{{currentGroup.groupName}}</span>
                    <el-button size="small" type="warning" plain icon="el-icon-edit" class="rename" @click="rename(currentGroup.id)">重命名</el-button>
                    <el-button size="small" type="danger" plain icon="el-icon-delete" @click='removeGroup(currentGroup.id)'>删除分组</el-button>
                    <el-button size="small" type="primary" @click='dialogImgVisible=true'>上传作品<i class="el-icon-upload el-icon--right"></i></el-button>
                  </div>
                </header>
                <el-row>
                  <div class="sub-header">
                    <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                    class="checkbox">全选</el-checkbox>
                    <!-- 这里是全选 -->
                    <el-button size="small" plain type="primary" :disabled='checkedCities.length<=0' @click='appearChangeGroup'>移动分组</el-button>
                    <el-button size="small" plain type="primary" :disabled='checkedCities.length<=0' @click='removeMaterial(checkedCities)'>删除素材</el-button>              
                  </div>
                </el-row>
                <el-row class="img-list" style="margin-top:20px;" :gutter="20">
                    <el-col style="margin-top:20px;" :span="8" v-for="item of imgList" :key='item.id' >
                      <el-card style="position:relative;" shadow="hover" :body-style="{ padding: '0px' }">
                          <a class="img" href="javascript:;" :style="{'background-image':'url('+item.ossUrl+')'}"></a>
                        <div style="position:absolute;left:16px;top:16px;overflow:hidden;" class="tag">
                          <el-tag
                              :key="tag"
                              v-for="tag in tags"
                              closable
                              :disable-transitions="false"
                              size="mini">
                              {{tag}}
                            </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-if="inputVisible"
                          v-model="inputValue"
                          ref="saveTagInput"
                          size="mini"
                          @keyup.enter.native="handleInputConfirm"
                          @blur="handleInputConfirm"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="mini" icon="el-icon-plus" plain @click="showInput"></el-button>
                      </div>
                      <p class="img-name">
                        <!-- 这里是复选img -->
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                          <el-checkbox :label='item.id' class=item-title> {{item.title}}</el-checkbox>
                        </el-checkbox-group>
                      </p>
                      <p class="img-date">
                          {{item.addTime}}
                      </p>
                      <div class="option">
                        <i class="el-icon-edit font-icon" @click="changeImgName"></i>
                        <i class="el-icon-picture font-icon" @click="oneChangeGroup(item.id)"></i>
                        <i class="el-icon-delete font-icon" @click="removeMaterial(item.id)"></i>
                      </div> 
                      </el-card>
                      
                       
                    </el-col>
                </el-row>
                <el-row style="margin:20px;">
                  <page :page='page' @handleCurrentChange='handleCurrentChange' @handleSizeChange='handleSizeChange'></page>
                </el-row> 
                    <el-dialog title="选择分组" :visible.sync="dialogFormVisible">
                          <el-select v-model="changeImgGroupId">
                            <el-option
                            v-for="item of grounping"
                            :value=item.id
                            :label="item.groupName"
                            :key='item.id'>{{item.groupName}}</el-option>
                          </el-select>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                      </div>
                    </el-dialog>
              </div>                
            </div>
          </el-card>
          </el-col>
        
        <el-col :span="6">
          <el-card shadow="never">
              <div class="grid-content bg-purple">
              <div class="slidebar">
                <ul class="slidebar-list">
                  <li v-for="(item,index) of grounping"
                  :key='item.id'
                  :class="{active:currIndex===index}"
                  @click='changeIndex(index)'
                  >{{item.groupName}}
                    <el-button 
                    v-show='item.id==-1?false:true'
                    type="danger"
                    class='group-remove-btn' 
                    @click.stop='removeGroup(item.id)'
                    >删除</el-button>
                </li>
                  <li class="add-group"> 
                    <el-button 
                    type="primary" 
                    class='add-group-btn'
                    @click='addGroupBtn'
                    >添加分组</el-button>
                  </li>
                </ul>
              </div>                
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-dialog title="上传图片" :visible.sync="dialogImgVisible">
        <span>请选择素材分类:</span>
        <div>
          <el-radio-group v-model="UpMaterialForm.type" size="small">
            <el-radio-button label='0'>普通素材</el-radio-button>
            <el-radio-button label='1' >作品</el-radio-button>
            <el-radio-button label='2' >封面图片</el-radio-button>
          </el-radio-group>
        </div>
        <span>上传图片（请先选择图片的类型哟^ ^）</span>
        <div class="up-img">
          <div class="mask" v-show="UpMaterialForm.type==''?true:false"></div>
          <el-upload
            ref="upload"
            :action="postImgUrl"
            list-type="picture-card"
            :before-upload="upImgBefore"
            :onError="uploadError"
            :on-remove='upImgRemove'
            :onSuccess="uploadSuccess"
            :on-preview="handlePictureCardPreview"
            :limit=5
            >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="UpSuccessImg" alt="" class="llll">
          </el-dialog>
        </div>
        
        <div class="details">
          <div v-for="(val,index) in count">
            <span>素材名称：</span>
            <el-input v-model='UpMaterialForm.title[index]' auto-complete="off" required></el-input>
          </div>
            <span>作者：</span>
            <el-input v-model="UpMaterialForm.author" auto-complete="off"></el-input>
            <br>
             <el-button type="primary" 
             @click=addMaterialImg(UpMaterialForm)>
           确 定</el-button>
        </div>  
      </el-dialog>
      <!-- 更改图片分组 -->
      <el-dialog :visible.sync="dialogChangeGroupVisible">
        <div class="change">
            <span>选择分组：</span>
            <el-select v-model="changeImgGroupId" placeholder="请选择分组">
              <el-option 
              v-for='item of grounping' 
              :label="item.groupName" 
              :value="item.id"
              :key = 'item.id'
              ></el-option>
            </el-select> 
            <el-button type="primary" @click='changeGroup(changeImgGroupId)'> 确 定</el-button>       
        </div>
      </el-dialog>
  </div>
</template>
<script>
import materialFn from '@/api/material'
import common from '@/utils/common'
import Page from '@/components/Page'
export default {
  components:{
    Page
  },
  data(){
    return {
      imgList:[],
      page:{
        currentPage:1,
        pageSize:10,
        totalRow:10,
      },
      grounping:[],
      currIndex:0,
      currentGroup:{
      },//这里是当前分组的数据
      dialogFormVisible: false,
      dialogImgVisible:false,//上传图片的弹出框
      dialogChangeGroupVisible:false,//更改图片分组tan
      oneAndAll:false,
      oneImgId:'',
      //上传图片相关
      UpMaterialForm:{
          // delivery: false,
          type:'' ,//上穿时候选择素材的分类 0 普通素材,1 作品 ,2 封面图片,
          id:[],//上传图片成功后返回的ID
          title:[],//素材名字
          author:'未命名',//作者名字
      },
      UpSuccessImg:'',//上传图片成功返回的url
      changeImgGroupId:'-1',//给单个的img更改分组名字
      formLabelWidth: '120px',
      checkAll: false,
      isIndeterminate: true,
      checkedCities: [],//这里是选中的img
      dialogVisible: false,
      group:'',
      postImgUrl:'http://192.168.0.102/api/material/uploadImg',
      count:0,
      //tag
      tags:['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },
  created () {
    this.getGrouping()
    this.getMaterialList()//获取图片
  },
  watch:{
    //在这里 如果监听到上传Img的弹窗被关闭而且上传了图片，但是
    dialogImgVisible(){
      if(this.dialogImgVisible==false){
        if(this.UpMaterialForm.id.length>0){
          this.removeImg(this.UpMaterialForm.id)   
        }
          this.clearForm()    
      }
    }
  } ,
  methods : { 
    handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
    getGrouping(){
      materialFn.getGrouping().then(res=>{
        this.grounping = res.data.data
        this.grounping.unshift({
          groupName:"默认分组^ ^",
          id:"-1"
        })
        this.currentGroup=this.grounping[this.currIndex]
        console.log(res)
      })
    },
    //获取素材列表
    getMaterialList(group=-1,page=1){
      const that = this
      materialFn.getMaterialList({groupId:group,pageNumber:page}).then(res=>{
        if(res.status=200){
          this.imgList=res.data.data.list
          this.page.pageSize = res.data.data.pageSize
          this.page.totalRow = res.data.data.totalRow
        }
      })
    },
    //添加分组
    addGroupBtn() {
      let that = this
      common.promptFn.call(this,'请输入分组名',function(value){
            materialFn.addGroup({groupName:value}).then(res=>{
              if(res.data.code==true){
                that.grounping.push({
                  groupName:res.data.data.groupName,
                  id:res.data.data.id
                })
                common.message.call(that,'success','新增的分组名是',value)
              }
            })        
         })
      },
    // 删除当前分组
    removeGroup(id){
      let that = this
      if(id==-1){
        return  common.message.call(this,'error','默认分组，禁止更改！')
      }
      common.confirmFn.call(this,'此操作将永久删除该分组, 是否继续?',function(){
           materialFn.delGroup({id:id}).then(res=>{
            if(res.data.code==true){
              that.grounping.forEach(function(item,index,arr){
                //如果某个分组的id和需要删除的ID一样，那么把这个分组从页面删除掉（就不需要浪费资源再发送ajax）
                if(item.id==id){
                  arr.splice(index,1)
                }
                //如果被删除的分组是当前显示的分组，那么吧当前显示的分组更改为分组数组的第0个。然后还需要在获取一下现在当前显示分组的内容。
                if(item.id==that.currentGroup.id){
                  that.changeIndex(0)
                }
              });
              common.message.call(that,'success','删除成功')
            }
          })       
      })
    },
  // 重命名分组
    rename(id){
      let that = this
      if(id==-1){
        return  common.message.call(this,'error','默认分组，禁止更改！')
      }
      common.promptFn.call(this,'请输入分组名',function(value){
         materialFn.renameGroup({id:that.currentGroup.id,groupName:value}).then(res=>{
          if(res.data.code==true){
            common.message.call(that,'success','更改成功，现在分组名是',value)
            that.grounping.forEach(function(item,index,arr){
              if(item.id==id){
                item.groupName = value
              }
            })
          }
        })       
       })
    },
    //删除图片
    removeImg(id){
        materialFn.delMaterialImg({id:id}).then(res=>{
          if(res.data.code=='success'){
            this.getMaterialList(this.currentGroup.id,this.page.currentPage)
          }else{
            common.message.call(this,'error','失败了') 
          }
        })
    },
    // 更改当前分组 分组列表的激活样式以及重新请求刷新图片列表
    changeIndex(index){
      this.currIndex = index
      this.checkAll = false
      this.currentGroup=this.grounping[this.currIndex]
      this.page.currentPage = 1
      this.getMaterialList(this.currentGroup.id,1)
      this.clearCheckbox()
      // 发送请求。
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //删除选择的素材 在这里显示的是500
    removeMaterial(id){
        let that = this
        common.confirmFn.call(this,'此操作将永久删除该图片, 是否继续?',function(){
           that.removeImg(id)
        })
    },
    //出现移动分组
    appearChangeGroup(){
      this.dialogChangeGroupVisible = true
    },
    //移动分组 移动分组后刷新本页面
    changeGroup(groupId){
      //判断是一个还是多个。一个的话就是取单个id、
      let imgId = this.oneAndAll?this.oneImgId:this.checkedCities
      materialFn.changeGroup({id:imgId,groupId:groupId}).then(res=>{
        if(res.data.code=='success'){
          common.message.call(this,'success','成功')        
          this.getMaterialList(this.currentGroup.id,this.page.currentPage)
          this.clearCheckbox()
        }else{
         common.message.call(this,'error','失败了')      
        }
      })
          this.dialogChangeGroupVisible=false
          this.oneAndAll =false
    },
    //更改单个的img分组
    oneChangeGroup(id){
      this.oneAndAll = true
      this.oneImgId = id
      this.appearChangeGroup()
    },
    // 改变当前页 发送请求
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);  
      this.page.currentPage = val
       this.getMaterialList(this.currentGroup.id,val)
       this.clearCheckbox()
    },
    // changeImgName更改图片名字 没写没借口
    changeImgName(){
      let that = this
      common.promptFn.call(this,'请输入图片名字',function(value){
          common.message.call(that,'success','更改成功，现在分组名是',value)
      })
    },
    //上传图片成功的回调
    uploadSuccess(response,file,fileList){
      this.UpMaterialForm.id.push(response.data.id)  
      this.UpSuccessImg = response.data.ossUrl
      fileList.id=response.data.id 
      this.count++
      console.log(this.count)
    },
    //在上传的图片列表移除
    upImgRemove(file,fileList){
      console.log( this.UpMaterialForm.id)
      let index = -1;
      let id = file.response.data.id
      for(let i = 0 ; i < this.UpMaterialForm.id.length ; i++){
        if(this.UpMaterialForm.id[i]==id){
          index=i
        }
      }
      materialFn.delMaterialImg(id).then(res=>{
        console.log(res)
        if(res.data.code=='success'){
          this.UpMaterialForm.id.splice(index,1)
          this.UpMaterialForm.title.splice(index,1)
          this.count--
        }else{
          common.message.call(this,'error','失败了')
        }
      })   
    },
    // 上传图片的确定按钮按下。
    addMaterialImg(UpMaterialForm){
      UpMaterialForm.groupId = this.currentGroup.id
      if(UpMaterialForm.type==''||UpMaterialForm.title.length<=0||UpMaterialForm.title.length!=UpMaterialForm.id.length){
        common.message.call(this,'error','上传错误，图片名称需要和图片数量对应哦~')
         return
      }else{
        materialFn.addMaterialImg(UpMaterialForm).then(res=>{
          console.log(res)
          if(res.data.code=='success'){
              common.message.call(this,'success','上传成功')
              this.getMaterialList(this.currentGroup.id)
              this.clearForm()
          }else{
               common.message.call(this,'error','上传错误')    
          }
        })
      }
    },
    //清除选中
    clearCheckbox(){
      this.checkedCities.length =0
    },
    //清除form
    clearForm(){
      this.UpMaterialForm.type=''
      this.UpMaterialForm.id=[]
      this.UpMaterialForm.title.length=0
      this.UpMaterialForm.author='未命名'
      this.$refs.upload.clearFiles();
      this.count = 0;
      this.dialogImgVisible=false
    },
    handlePictureCardPreview(file) {
      console.log(file)
      this.UpSuccessImg = file.url;
      this.dialogVisible = true;
    },
    //这里是上传之前的判断，如果素材分类是没有选择，那么不允许上传。
    upImgBefore(file){
      if(this.UpMaterialForm.materialType==''){
        return false
      }
        const isJPG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';
        const isPSD = file.type === 'image/psd';
        const isLt3M = file.size / 1024 / 1024 < 3;
        if(!/image\/(jpeg|gif|png|bmp|psd)/.test(file.type)){
          common.message.call(this,'error','不要上传奇怪的东西')
        }
    },
    uploadError(){
       common.message.call(this,'error','上传错误,检查网络')
    },
    //这里是全选相关
  handleCheckAllChange(val) {
        let imgSrcList = [];
        for(let i = 0 ; i <　this.imgList.length ; i++){
          imgSrcList.push(this.imgList[i].id)
        }
        this.checkedCities = val ? imgSrcList : [];
        this.isIndeterminate = false;
      },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.imgList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.imgList.length;
    }
  }
}
</script>
<style scoped>
  *{
      -webkit-box-sizing: none;
      box-sizing: none;
      margin: 0;
  }
  #material{
    padding: 0 20px;
  }
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  fieldset{
    margin: 20px 0 ;
    border-width: 1px 0 0;
  }
  .box{
    position: relative;
    border: 1px solid #E7E7EB;
    height: 1000px;
    overflow: hidden;
  }
  .slidebar .slidebar-list{
    border: 1px solid #E7E7EB;
  }
  .slidebar li{
    height: 30px;
    line-height: 30px;
    text-indent: 20px;
    cursor:pointer;
    cursor: hand;
  }
  .slidebar li:hover{
    background-color: #F4F5F9;
  }
  .slidebar li.active{
    background-color: #F4F5F9;
  }
  .slidebar li.add-group{
    text-indent: 0px;
  }
  .add-group-btn{
    height: 100%;
    width: 100%;
  }
  header{
    height: 50px;
    line-height: 50px;
    border: 1px solid #E7E7EB;
    border-right: none;
  }
  header .grouping{
    float: left;
    padding-left: 20px;
  }
  header .btn-list{
    float: right;
    padding-right: 20px;
  }
  header .rename{
    margin-left: 20px;
  }
  .sub-header{
    padding: 20px 0;
    background-color: #F4F5F9;
  }
  .checkbox{
    margin-left: 20px;
  }
  .img-list{
    overflow: hidden;
  }
  .img-list li{
    float: left;
    width: 170px;
    margin-left: 20px;
    margin-top: 20px;
    border: 1px solid #e5e5e5;
    transition: all ease .2s ;
  }
  .img-list li:hover{
    transform: translateY(-5px);
    box-shadow: 5px 0px 10px gray;
  }
  .img-list .img{
    display: block;
    height: 170px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .img-list .img-name{
    height: 30px;
    line-height: 30px;
  }
  .item-title{
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .img-list .hover-date{
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    color: red;
    background-color: #fff;
    z-index: 2;
  }
  .img-list .img-date{
    position: relative;
    font-size: 14px;
    color: #3c3c3c;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .img-list .img-date:hover .hover-date{
    display: block;
  }
  .img-list .option{
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #e5e5e5;
  }
  .img-list .font-icon{
    padding: 0 10px;
    cursor: pointer;
  }
  .img-list .font-icon:hover{
    color: red;
  }
  .details{
    margin-top: 20px;
    width: 270px;
  }
  .up-img{
    position: relative;
  }
  .up-img .mask{
    position: absolute;
    top:0;
    left: 0;
    width:100%;
    height:100%;
background: linear-gradient(#fb3 50%, #58a 0);
    background-size: 100% 2em;
  }
  .slidebar-list li{
    position: relative;
    margin-top: 10px;
  }
  .slidebar-list li:hover{
     background-color: rgba(0,0,0,.4);
  }
  .slidebar-list li.active{
    background-color: rgba(0,0,0,.4);
  }
  .group-remove-btn{
    position: absolute;
    right: 30px;
    height: 30px;
  }
</style>

