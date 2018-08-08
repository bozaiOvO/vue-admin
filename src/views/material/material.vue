<template>
  <div id="material">
      <fieldset>
        <legend>资源管理</legend>
      </fieldset>
      <div class="box">
        <div class="slidebar">
          <ul class="slidebar-list">
            <li v-for="(item,index) of grounping"
            :key='item.id'
             :class="{active:currIndex===index}"
             @click='changeIndex(index)'
             >{{item.groupName}}
              <el-button 
              type="danger" 
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
        <div class="content">
          <header>
            <div class="grouping">
              <span class="">当前分组:</span>
              <span>{{currentGroup.groupName}}</span>
              <el-button type="warning" icon="el-icon-edit" class="rename" @click="rename(currentGroup.id)">重命名</el-button>
              <el-button type="danger" icon="el-icon-delete" @click='removeGroup(currentGroup.id)'>删除分组</el-button>
            </div>
            <div class="btn-list">
              <el-button type="primary" @click='dialogImgVisible=true'>上传作品<i class="el-icon-upload el-icon--right"></i></el-button>
              <el-button type="primary">选择素材<i class="el-icon-upload el-icon--right"></i></el-button>
            </div>
          </header>
          <main>
            <div class="sub-header">
               <el-checkbox
               :indeterminate="isIndeterminate"
               v-model="checkAll"
               @change="handleCheckAllChange"
               class="checkbox">全选</el-checkbox>
              <el-button type="primary" :disabled='checkedCities.length<=0' @click='moveGroup'>移动分组</el-button>
              <el-button type="primary" :disabled='checkedCities.length<=0' @click='removeMaterial'>删除素材</el-button>              
            </div>
            <ul class="img-list">
              <li v-for="item of imgList" :key='item.id' >
                <a class="img" href="javascript:;" :style="{'background-image':'url('+item.ossUrl+')'}"> </a>
                <p class="img-name">
                  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox :label="item.reviewer"> {{item.fileName}}</el-checkbox>
                  </el-checkbox-group>
                </p>
                
                <p class="img-date">
                  <span class="hover-date">{{item.addTime}}</span>
                  上传时间：{{item.addTime}}
                </p>
                <div class="option">
                  <i class="el-icon-edit font-icon" @click="changeImgName"></i>
                  <i class="el-icon-picture font-icon" @click="dialogFormVisible=true"></i>
                  <i class="el-icon-delete font-icon" @click="removeImg"></i>
                </div>
              </li>
            </ul>
              <div class="block">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="12"
                  background
                  layout="prev, pager, next, jumper"
                  :total="1000">
                  <span class="demonstration">直接前往</span>
                </el-pagination>
              </div>
              <el-dialog title="选择分组" :visible.sync="dialogFormVisible">
               <!--  <el-form :model="form">
                  <el-form-item label="分组" :label-width="formLabelWidth"> -->
                    <el-select v-model="renameImgGroup">
                      <el-option
                       v-for="item of grounping"
                       :value=item.id
                       :label="item.groupName"
                       :key='item.id'>{{item.groupName}}</el-option>
                    </el-select>
                 <!--  </el-form-item>
                </el-form> -->
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
              </el-dialog>
          </main>
        </div>
      </div>
      <el-dialog title="上传图片" :visible.sync="dialogImgVisible">
        <span>请选择素材分类:</span>
        <div>
          <el-radio-group v-model="UpMaterialForm.materialType" size="small">
            <el-radio-button label='0'>普通素材</el-radio-button>
            <el-radio-button label='1' >作品</el-radio-button>
            <el-radio-button label='2' >封面图片</el-radio-button>
          </el-radio-group>
        </div>
        <div class="up-img">
          <el-upload
            :action="postImgUrl"
            list-type="picture-card"
            :onError="uploadError"
            :onSuccess="uploadSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        
        <div class="details">
            <span>素材名称：</span>
            <el-input v-model="UpMaterialForm.materialName" auto-complete="off"></el-input>
            <span>作者：</span>
            <el-input v-model="UpMaterialForm.authorName" auto-complete="off"></el-input>
            <span>选择分组：</span>
            <el-select v-model="UpMaterialForm.upGroupN" placeholder="请选择分组">
              <el-option v-for='item of grounping' :label="item.groupName" :value="item.id"></el-option>
            </el-select>
            <br>

            <br>
             <el-button type="primary">确 定</el-button>
        </div>  
      </el-dialog>

  </div>
</template>
<script>
// import { getImgList,getGrouping,addGroup,delGroup} from '@/api/material'
import materialFn from '@/api/material'
export default {
  data(){
    return {
      imgList:[],
      currentPage:1,
      grounping:[],
      currIndex:0,
      currentGroup:{},//这里是当前分组的数据
      dialogFormVisible: false,
      dialogImgVisible:false,
      //上传图片相关
      UpMaterialForm:{
          delivery: false,
          materialName:'',//素材名字
          authorName:'未命名',//作者名字
          upGroupN:'',//这里是给上传的图片分组名字
          materialType:'' //上穿时候选择素材的分类 0 普通素材,1 作品 ,2 封面图片
      },
      renameImgGroup:'',//给单个的img更改分组名字
      formLabelWidth: '120px',
      checkAll: false,
      isIndeterminate: true,
      checkedCities: [],
      // 上传图片相关
      dialogImageUrl: '',
      imgResId:'',
      dialogVisible: false,
      group:'',
      postImgUrl:'http://192.168.0.100/api/material/uploadImg?type=1'
    }
  },
  created () {
    const that = this
    // getImgList(that.currentPage).then(res => {
    //     console.log(res)
    //     that.imgList = res.data.items;
    //     console.log(that.imgList)
    // })
    this.getGrouping()
    this.getMaterialList()//获取图片
  },
  methods : { 
    getGrouping(){
      const that = this
      materialFn.getGrouping().then(res=>{
        this.grounping = res.data.data
        this.currentGroup=that.grounping[that.currIndex]
        console.log(res)
      })
    },
    getMaterialList(){
      materialFn.getMaterialList().then(res=>{
        console.log(res)
        if(res.status=200){
          this.imgList=res.data.data.list
        }
      })
    },
    //添加分组
    addGroupBtn() {
        this.$prompt('请输入分组名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
            materialFn.addGroup(value).then(res=>{
              if(res.data.code==true){
                this.grounping.push({
                  groupName:res.data.data.groupName,
                  id:res.data.data.id
                })
                this.$message({
                  type: 'success',
                  message: '新增的分组名是: ' + value
                });
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
    // 删除当前分组
    removeGroup(id){
      const that = this
        this.$confirm('此操作将永久删除该分组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          materialFn.delGroup(id).then(res=>{
            console.log(res)
            if(res.data.code==true){
              this.grounping.forEach(function(item,index,arr){
                //如果某个分组的id和需要删除的ID一样，那么把这个分组从页面删除掉（就不需要浪费资源再发送ajax）
                if(item.id==id){
                  arr.splice(index,1)
                }
                //如果被删除的分组是当前显示的分组，那么吧当前显示的分组更改为分组数组的第0个。然后还需要在获取一下现在当前显示分组的内容。
                if(item.id==that.currentGroup.id){
                  that.currentGroup = that.grounping[0]
                  materialFn.getMaterialList(that.currentGroup.id).then(res=>{
                    if(res.status=200){
                      that.imgList = res.data.data.list
                    }
                  })
                }
              });
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
  // 重命名分组
    rename(id){
         this.$prompt('请输入分组名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          materialFn.renameGroup(this.currentGroup.id,value).then(res=>{
            console.log(res)
            if(res.data.code==true){
              this.$message({
                // 应该在这里发送请求。
                type: 'success',
                message: '分组名更改成功ovo'
              });
              this.grounping.forEach(function(item,index,arr){
                if(item.id==id){
                  item.groupName = value
                }
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
    },
    // 更改当前分组 分组列表的激活样式以及重新请求刷新图片列表
    changeIndex(index){
      this.currIndex = index
      this.currentGroup=this.grounping[this.currIndex]
      materialFn.getMaterialList(this.currentGroup.id).then(res=>{
        if(res.status=200){
          this.imgList = res.data.data.list
        }
        console.log(res)
      })
      // 发送请求。
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //删除素材
    removeMaterial(){
      console.log('ffff')
    },
    //移动分组
    moveGroup(){
      console.log('ffffff')
    },
    // 改变当前页 发送请求
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      const that = this
      // getImgList(val).then(res => {
      //     console.log(res)
      //     that.imgList = res.data.items;
      //     console.log(that.imgList)
      // })
    },
    // changeImgName更改图片名字
    changeImgName(){
         this.$prompt('请输入图片名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$message({
            // 应该在这里发送请求。
            type: 'success',
            message: '图片名更改成功ovo'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
    },
    removeImg(){
         this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            // 应该在这里发送请求。
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    //上传图片
    uploadSuccess(response){
      console.log('成功')
      console.log(response)
      this.imgResId = response.data.id 
      this.dialogImageUrl = response.data.ossUrl
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传图片之前
    upImgBefore(){
      if(this.materialType==''){
        console.log('请你先选择分组')
      }
    },
    uploadError(){
      console.log('你失败了！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！')
    },
    handleRemove(){
      //这里文件列表移除的钩子（file，fileList）
    },

    //这里是全选相关
  handleCheckAllChange(val) {
        let imgSrcList = [];
        for(let i = 0 ; i <　this.imgList.length ; i++){
          imgSrcList.push(this.imgList[i].reviewer)
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
  .content{
    position: absolute;
    left:  0;
    width: 800px;
  }
  .slidebar{
    position: absolute;
    left: 800px;
    width: 250px;
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
</style>

