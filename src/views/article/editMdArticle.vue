<template>
  <div class="components-container">
    <div class="editor-container">
      <markdown-editor id="contentEditor" ref="contentEditor" v-model="content" :height="300" :zIndex="20"></markdown-editor>
    </div>
    <el-button @click="markdown2Html" style="margin-top:80px;" type="primary" icon="el-icon-document">转换成HTML看看</el-button>
    <el-button @click="upArticle" style="margin-top:80px;" type="primary" icon="el-icon-document">提交</el-button>

    <div v-html="html"></div>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import articleApi from '@/api/article'
const content = `
**Bufan**

`

export default {
  name: 'markdown',
  components: { MarkdownEditor },
  data() {
    return {
      content: content,
      html: '',
      upArticleData:{
        column:null,//栏位，0 ui ;  1 h5
        status:0,//文章类型，0草稿，1发布，2隐藏
        hot:0,//1为hot
        jing:0,//0 正常； 1 精品推荐
        author:null,//
        title:null,//
        desc:null,//
        type:0,//来源：0 引用，1 原创，2 微信公众号
        sourceName:null,//原文网站名称
        sourceUrl:null,//原文链接
        editor:0,//编辑器类型，0富文本，1md
        contentSource:null,//内容源码，html或者markdown
        content:null,//转义后的内容,html本身
        coverUrl:null,//封面图片
        coverShow:1//封面是否再文章显示 0 否，1是
      }
    }
  },
  methods: {
    markdown2Html() {
      import('showdown').then(showdown => {
        const converter = new showdown.Converter()
        this.html = converter.makeHtml(this.content)
      })
    },
    upArticle(){
      this.upArticleData={
          column:0,//栏位，0 ui ;  1 h5
          status:1,//文章类型，0草稿，1发布，2隐藏
          hot:1,//1为hot
          jing:1,//0 正常； 1 精品推荐
          author:'Li',//
          title:'zhan',//
          desc:null,//
          type:1,//来源：0 引用，1 原创，2 微信公众号
          sourceName:'null',//原文网站名称
          sourceUrl:'null',//原文链接
          editor:0,//编辑器类型，0富文本，1md
          contentSource:'<p>..</p>',//内容源码，html或者markdown
          content:'hh',//转义后的内容,html本身
          coverUrl:'https://i0.hdslb.com/bfs/archive/6063fb40e90a17912b71d2cfd4ea56f69abb70de.png',//封面图片
          coverShow:1//封面是否再文章显示 0 否，1是        
      }
      articleApi.addArticle(this.upArticleData).then(res=>{
        console.log(res)
      })
    }
  }
}
</script>


