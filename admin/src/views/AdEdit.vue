<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form @submit.native.prevent="save" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-button type="text" @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
      <el-row type="flex" style="flex-wrap: wrap;">
        <el-col :md="12" v-for="(item, index) in model.items" :key="index">
          <el-form-item label="跳转链接">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="res => $set(item,'image',res.url)">
              <img v-if="item.image" :src="item.image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" size="small" @click="model.items.splice(index, 1)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
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
      model: {
        items: []
      }
    }
  },

  created() {
    this.id && this.fetch()
  },

  methods: {

    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`)
      this.model = Object.assign({}, this.model, res.data)
    },
    async save() {
      let res
      if(this.id) { //修改
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else { //新增
        res = await this.$http.post('rest/ads', this.model);
      }
      if(!res) return
      this.$router.push('/ads/list')
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