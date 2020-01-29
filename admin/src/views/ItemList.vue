<template>
  <div>
    <h1>物品列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height: 3rem;">
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleRemove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },

  created() {
    this.fetch()
  },

  methods: {

    async fetch() {
      const res = await this.$http.get('rest/items')
      if(res.status !== 200) return
      this.items = res.data
    },

    async handleRemove(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`rest/items/${row._id}`)
        if(res.data.success) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        }
      })

    },

    handleEdit(row) {
      this.$router.push(`/items/edit/${row._id}`)
    }
  }
}
</script>

<style>

</style>