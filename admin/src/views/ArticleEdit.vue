<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor
          v-model="model.body"
          useCustomImageHandler
          @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {

  components: {
    VueEditor
  },

  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents: [],
      categories: []
    }
  },

  created() {
    this.id && this.fetch()
    this.fetchCategories()
  },

  methods: {

    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)
      const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', res.data.url)
      resetUploader()
    },

    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`)
      this.model = res.data
    },

    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },

    async save() {
      let res
      if(this.id) { //修改
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else { //新增
        res = await this.$http.post('rest/articles', this.model);
      }
      if(!res) return
      this.$router.push('/articles/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    }
  }
}
</script>

<style>

</style>