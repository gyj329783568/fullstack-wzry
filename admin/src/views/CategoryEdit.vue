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

    <el-form>
      <el-form-item label="年龄">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="岁数">
        <el-input v-model="formData.age"></el-input>
      </el-form-item>
      <el-form-item label="filters">
        <div>{{ '123' | abc }}</div>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleClear">Clear</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { haha } from '../mixin/haha'
export default {

  mixins: [haha],

  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents: [],
      formData: {
        name: '',
        age: null
      }
    }
  },

  created() {
    this.id && this.fetch()
    this.fetchParents()

    //console.log(this._.chunk(['a', 'b', 'c', 'd'], 5))
    //console.log(this._.concat([1], [1,2,3,4]))
    // console.log(this._.dropRightWhile([1,2,3,4], (o) => {
    //   console.log(o)
    //   return o !== 3
    // }))
    // var users = [
    //   { 'user': 'barney',  'active': false },
    //   { 'user': 'fred',    'active': false },
    //   { 'user': 'pebbles', 'active': true },
    //   { 'user': 'yjgui', 'active': true }
    // ];
    // console.log(this._.findIndex(users, (o) => {
    //   return o.user === 'barney'
    // }))
    //console.log(this._.indexOf([1,2,3], 1, 2))
    // let a = [1,2,3]
    // let b = [2,3,4]
    // let c = [3,4,5]
    // console.log(this._.intersection(a,b,c))
    console.log(this._.intersectionBy([{ 'x': 1 }, {'y':2}],[{ 'x': 1 }, {'y':2}],[{ 'x': 1 }, {'y':2}], 'x'))

  },

  methods: {
    handleClear() {
      this.clear()
      //this.formData = this.$options.data().formData
    },

    clear() {
      this.$data = JSON.parse(JSON.stringify(this.$options.data()))
      //Object.assign(this.$data, this.$options.data())
    },

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