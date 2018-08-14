<template>
  <div class="components-container">
    <div>
      <tinymce :height="300" v-model="content"></tinymce>
    </div>
    <div class="editor-content" v-html="content"></div>
    <div class="btn">
      <el-button size="small"   type="primary">上传</el-button>
    </div>
  </div>

</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'tinymce-demo',
  components: { Tinymce },
  data() {
    return {
      content:
      `<h1 style="text-align: center;">Welcome to BuFan!</h1>`
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>


