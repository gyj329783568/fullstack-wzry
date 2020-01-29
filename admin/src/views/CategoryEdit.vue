<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form @submit.native.prevent="save" label-width="80px">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents: []
    }
  },

  created() {
    this.id && this.fetch()
    this.fetchParents()
  },

  methods: {

    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data
    },

    async fetchParents() {
      const res = await this.$http.get(`rest/categories`)
      this.parents = res.data
    },

    async save() {
      let res
      if(this.id) { //修改
        res = await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else { //新增
        res = await this.$http.post('rest/categories', this.model);
      }
      if(!res) return
      this.$router.push('/categories/list')
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