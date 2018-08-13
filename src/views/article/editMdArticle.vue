<template>
  <div class="components-container">
    <div class="box">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="文章名称" prop='title'>
          <el-input v-model="form.title" style='width:500px'></el-input>
        </el-form-item>
        <el-form-item label="作者名称" prop='author'>
          <el-input v-model="form.author" style='width:300px'></el-input>
        </el-form-item>
        <el-form-item label="所属栏位" prop='column'>
          <el-select v-model="form.column" placeholder="请选择活动区域">
            <el-option label="UI" value="0"></el-option>
            <el-option label="前端" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章类型">
          <el-select v-model="form.status" placeholder="请选择文章类型">
            <el-option label="草稿" value="0"></el-option>
            <el-option label="发布" value="1"></el-option>
            <el-option label="隐藏" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否火热">
          <el-switch
            v-model="isHot"
            @change='changeSwitch($event)'
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="是否精品">
          <el-switch
            v-model="isJing"
             @change='changeSwitch($event)'
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="文章来源">
          <el-radio-group v-model="form.type">
            <el-radio label="0" >引用</el-radio>
            <el-radio label="1" >原创</el-radio>
            <el-radio label="2">微信公众号</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="原文网站名称" v-show="form.type==0?true:false">
          <el-input v-model="form.sourceName" style='width:300px'></el-input>
        </el-form-item>
        <el-form-item label="原文连接" v-show="form.type==0?true:false">
          <el-input v-model="form.sourceUrl" style='width:300px'></el-input>
        </el-form-item>
        <el-button 
        type="primary" 
        style="margin-left: 100px;margin-bottom: 10px"
        @click='ispopUpShow=true'
        >从素材图片中选择作品封面
        </el-button>
        <pop-up @coverImgUrl='coverImgUrl' @ispopUpShow='ispopUpShow=false' :ispopUpShow='ispopUpShow'></pop-up>
        <el-form-item label="封面图片URL">
          <el-input v-model="form.coverUrl" style='width:300px'></el-input>
          <el-radio-group v-model="form.coverShow" >
            <el-radio label="1">显示</el-radio>
            <el-radio label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文章描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="editor-container">
      <markdown-editor
       id="contentEditor" 
       ref="contentEditor" 
       v-model="form.contentSource" 
       :height="300" 
       :zIndex="20"></markdown-editor>
    </div>
    <el-button @click="markdown2Html" style="margin-top:80px;" type="primary" icon="el-icon-document">转换成HTML看看</el-button>
    <el-button 
    :disabled='isSubmit'
    @click="upArticle(form)" 
    style="margin-top:80px;" 
    type="primary" 
    icon="el-icon-document">
      提交(必须转义后才可以提交哦)
    </el-button>

    <div v-html="form.content"></div>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import UpImg from '@/components/Upload/singleImage'
import articleApi from '@/api/article'
import common from '@/utils/common'
import PopUp from './components/popUp'
export default {
  components: { MarkdownEditor,UpImg,PopUp },
  data() {
    return {
      upImgNum:'1',
      form: {
        title:'',//文章名字
        author:'',//文章作者
        column:'0',//栏位，0 ui ;  1 h5
        status:'1',//文章类型，0草稿，1发布，2隐藏
        hot:'1',//1为hot
        jing:'1',//0 正常； 1 精品推荐
        type:'1',//来源：0 引用，1 原创，2 微信公众号
        sourceName:'',//原文网站名称
        sourceUrl:'',//原文链接
        coverUrl:'',//封面图片
        coverShow:'1',//封面是否再文章显示 0 否，1是
        desc:'',//
        editor:'1',//编辑器类型，0富文本，1md
        contentSource:'**BuFan**',//内容源码，html或者markdown
        content:'',//转义后的内容,html本身
      },
        isJing:true,
        isHot:true,
        isSubmit:true,//这个是提交按钮，必须先转意在提交。
        ispopUpShow:false,//这个是弹窗选择封面图片
        rules: {
          title: [
            { required: true, message: '请输入名称', trigger: 'blur' },
             { pattern: /\S+/, message: '不允许输入空格' }
          ],
          author: [
            { required: true, message: '请输入作者', trigger: 'blur' },
            { min: 1, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' },
             { pattern: /\S+/, message: '不允许输入空格' }
          ],
          column: [
            { required: true, message: '请选择栏位', trigger: 'change' }
          ]}
    }

  },
  created(){
      if(this.$route.query.id){
        this.initialization()
      }
  },
  methods: {
    //如果路由带有Id的参数，则初始化编辑.
    initialization(){
         articleApi.preview({id:this.$route.query.id}).then(res=>{
          console.log(res)
          this.form = res.data.data
        })     
    },
    markdown2Html() {
      this.isSubmit = false
      import('showdown').then(showdown => {
        const converter = new showdown.Converter()
        this.form.content = converter.makeHtml(this.form.contentSource)
      })
    },
    changeSwitch(value){
      this.form.jing = this.isJing==true?'1':'0'
      this.form.hot = this.isHot==true?'1':'0'
    },
    coverImgUrl(url){
      this.form.coverUrl = url
    },
    upArticle(form){
       this.$refs.form.validate((valid) => {
          if(valid){
              let article = {}
              for(let a in this.form){
                  let b = 'article.'+a
                  article[b] = this.form[a]
              }
              if(this.$route.query.id){
                articleApi.editArticle(article).then(res=>{
                  if(res.data.code==true){
                    common.message.call(this,'success','添加成功')
                  }else{
                    common.message.call(this,'error','添加失败') 
                  }
                })
              }else{
                articleApi.addArticle(article).then(res=>{
                  if(res.data.code==true){
                    common.message.call(this,'success','添加成功')
                  }else{
                     common.message.call(this,'error','添加失败')           
                  }
                })
              }
          }else{
            return false
          }
       })
    }
  }
}
</script>


