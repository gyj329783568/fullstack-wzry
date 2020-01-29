<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      const res = await this.$http.get(`rest/items/${this.id}`)
      this.model = res.data
    },

    async fetchParents() {
      const res = await this.$http.get(`rest/items`)
      this.parents = res.data
    },

    handleAvatarSuccess(res) {
      // 显示赋值，否则直接赋值无法响应显示
      this.$set(this.model, 'icon', res.url)
      console.log(res)
    },

    async save() {
      let res
      if(this.id) { //修改
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
      } else { //新增
        res = await this.$http.post('rest/items', this.model);
      }
      if(!res) return
      this.$router.push('/items/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    }
  }
}
</script>