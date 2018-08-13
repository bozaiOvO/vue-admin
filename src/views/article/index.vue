<template>
  <div>
    <fieldset disabled="disabled" class="header" >
      <legend  class="header-text">文章列表</legend>  
    </fieldset>  
    <div class="btn-list">
      <el-input
        class='retrieval-input'
        placeholder="检索标题"
        v-model="retrieval.title"
        clearable>
      </el-input>
      <el-input
       class='retrieval-input'
        placeholder="检索作者"
        v-model="retrieval.author"
        clearable>
      </el-input>
      <el-button type='primary'>搜索</el-button>
      <router-link :to="{name:'article.edit'}"><el-button type="primary" icon="el-icon-plus">添加文章</el-button></router-link>
    </div>
    <el-table
     ref="multipleTable"
      :data="articleList"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%; margin-top:20px;">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        fixed
        prop="title"
        label="title"
        show-overflow-tooltip
        width="180">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        width="100">
      </el-table-column>
      <el-table-column
       show-overflow-tooltip
        prop="type"
        label="原创"
        width="100">
      </el-table-column>
      <el-table-column
        prop="time"
        label="上传时间||更新时间"
        width="170">
      </el-table-column>
      <el-table-column
        prop="hot"
        label="火热"
        width="70">
      </el-table-column>
      <el-table-column
        prop="jing"
        label="精品"
        width="70">
      </el-table-column>
      <el-table-column
       show-overflow-tooltip
        prop="desc"
        label="描述"
        width="200">
      </el-table-column>
      <el-table-column
      prop="coverUrl"
        label="封面"
        width="220">
          <template slot-scope="scope">
        <img  :src="scope.row.coverUrl" alt="" style="width: 200px;height: 50px">
      </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        prop='id'
        label="操作"
        width="220">
        <template slot-scope="scope">
          <el-button @click="preview(scope.row.id)" type="primary" size="small">查看</el-button>
          <router-link :to="{name:'article.edit',query: { id:scope.row.id }}"> <el-button size="small"   type="warning">编辑</el-button>
          </router-link>
          <el-button size="small"   type="danger" @click='deleteArticle(scope.row.id)'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page :page='page' @handleCurrentChange='handleCurrentChange' @handleSizeChange='handleSizeChange'></page>
  </div>
</template>
<script>
import articleApi from '@/api/article'
import Page from '@/components/Page'
import common from '@/utils/common'
export default {
  components:{
    Page
  },
  created() {
    this.getArticleList(this.page.currentPage)// 获取文章列表
  },
  data() {
    return {
      articleList: [],
      multipleSelection: [],
      page:{
        currentPage:1,
        pageSize:10,
        totalRow:10,
      },
      retrieval:{
        title:'',
        author:'',
      }
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getArticleList(page) {
      articleApi.getArticleList(page).then(res => {
        console.log(res)
        if (res.status ==200) {
          this.articleList = res.data.data.list
          this.page.pageSize = res.data.data.pageSize
          this.page.totalRow = res.data.data.totalRow
          this.articleList.forEach((item,index,arr)=>{
            if(item.updateTime!=null){
              item.time = item.updateTime
            }else{
              item.time = item.addTime
            }
            item.status = this.filterList(item.status,'草稿','发布','隐藏')
            item.hot = this.filterList(item.hot,'正常','hot~')
            item.jing = this.filterList(item.jing,'正常','精品')
            item.type = this.filterList(item.type,'引用','原创','微信公众号')
            item.coverShow = this.filterList(item.coverShow,'没有','正在显示')
            item.desc = item.desc==null?'无':item.desc
          })
          console.log(this.articleList)
        }
      })
    },
    //预览
    preview(id) {
      console.log(id)
      articleApi.preview({id:id}).then(res=>{
        console.log(res)
      })
    },
    //删除
    deleteArticle(id){
      const that = this
      common.confirmFn.call(this,'确认删除吗？',function(){
        articleApi.deleteArticle({id:id}).then(res=>{
          if(res.data.code==true){
            that.getArticleList(that.currentPage)
            common.message.call(that,'success','删除成功')      
          }
        })      
      })
    },
    //过滤器
    filterList(itemType,one,two,three=null){
        switch(itemType){
          case '0':
            return  itemType=one;
          case '1':
            return itemType = two;
          case '2' :
            return itemType = three;
          default:
            return
        }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);  
      this.page.currentPage = val
      this.getArticleList(val)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
  },

}
</script>
<style scoped>
.header{
  border-width: 1px 0 0;
  margin: 10px 0 20px;
  border-style: solid;
  border-color: #e6e6e6;
}
.header-text{
  font-size: 20px;
  padding: 0 10px;
}
.retrieval-input{
  width: 300px;
  margin-left: 10px;
}
</style>


