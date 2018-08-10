<template>
  <div>
    <fieldset disabled="disabled" class="header" >
      <legend  class="header-text">文章列表</legend>  
    </fieldset>  
    <div class="btn-list">
      <router-link to="content/article/edit"><el-button type="primary" icon="el-icon-plus"></el-button></router-link>
      <el-button type="danger" icon="el-icon-delete"></el-button>
    </div>
  <el-table
   ref="multipleTable"
    :data="articleList"
    border
    @selection-change="handleSelectionChange"
    style="width: 100%;">
    <el-table-column
      type="selection"
      width="50"></el-table-column>
    <el-table-column
      fixed
      prop="title"
      label="title"
      show-overflow-tooltip
      width="200"></el-table-column>
    <el-table-column
      prop="author"
      label="作者"
      width="120"></el-table-column>
    <el-table-column
     show-overflow-tooltip
      prop="是"
      label="原创"
      width="100"></el-table-column>
    <el-table-column
      prop="addTime"
      label="上传时间||更新时间"
      width="170"></el-table-column>
    <el-table-column
      prop="jing"
      label="精品"
      width="80"></el-table-column>
    <el-table-column
      prop="jing"
      label="精品"
      width="80"></el-table-column>
    <el-table-column
     show-overflow-tooltip
      prop="content_short"
      label="描述"
      width="220"></el-table-column>
    <el-table-column
      label="封面"
      width="220">
      <template slot-scope="scope">
        <img  :src="scope.row.image_uri" alt="" style="width: 200px;height: 50px">
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="250">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
        <el-button size="small"   type="warning">编辑</el-button>
        <el-button size="small"   type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import articleApi from '@/api/article'
export default {
   methods: {
      handleClick(row) {
        console.log(row);
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getAllArticleList(){
        articleApi.getAllArticleList().then(res=>{
          console.log(res)
          if(res.data.data.list.length>0){
            this.articleList = res.data.data.list 
          }
        })
      }
    },
    created(){
      this.getAllArticleList()//获取文章列表
    },
    data() {
      return {
        articleList:[],
        multipleSelection: []
      }
    }
};
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
.text{
  overflow:hidden;

text-overflow:ellipsis; 

white-space:nowrap;
line-height: 30px;
background-color: red !important;
}
.el-table .cell{
  height: 30px !important;
    overflow:hidden !important;

text-overflow:ellipsis !important; 

white-space:nowrap !important;
background-color: red !important;
}
</style>


