<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form @submit.native.prevent="save" label-width="80px">
      <el-tabs value="skills" type="border-card">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="图标">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item of categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate v-model="model.scores.difficult" :max="9" show-score style="margin-top: 0.7rem;"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate v-model="model.scores.skills" :max="9" show-score style="margin-top: 0.7rem;"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate v-model="model.scores.attack" :max="9" show-score style="margin-top: 0.7rem;"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate v-model="model.scores.survive" :max="9" show-score style="margin-top: 0.7rem;"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input v-model="model.usageTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input v-model="model.battleTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input v-model="model.teamTips" type="textarea"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button type="text" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap;">
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item,'icon',res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="model.skills.splice(index, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem;">
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
        name: '',
        avatar: '',
        scores: {
          difficult: 0
        },
        items1: [],
        items2: [],
        usageTips: '',
        battleTips: '',
        teamTips: ''
      },
      parents: [],
      categories: [],
      items: []
    }
  },

  created() {
    this.id && this.fetch()
    this.fetchParents()
    this.fetchCategories()
    this.fetchItems()
  },

  methods: {

    async fetch() {
      const res = await this.$http.get(`rest/heros/${this.id}`)
      this.model = Object.assign({}, this.model, res.data)
    },

    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },

    async fetchItems() {
      const res = await this.$http.get(`rest/items`)
      this.items = res.data
    },

    async fetchParents() {
      const res = await this.$http.get(`rest/heros`)
      this.parents = res.data
    },

    handleAvatarSuccess(res) {
      // 显示赋值，否则直接赋值无法响应显示
      this.model.avatar = res.url
    },

    async save() {
      let res
      if(this.id) { //修改
        res = await this.$http.put(`rest/heros/${this.id}`, this.model);
      } else { //新增
        res = await this.$http.post('rest/heros', this.model);
      }
      if(!res) return
      this.$router.push('/heros/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    }
  }
}
</script>