<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
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
      const res = await this.$http.get('rest/admin_users')
      if(res.status !== 200) return
      this.items = res.data
    },

    async handleRemove(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`rest/admin_users/${row._id}`)
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
      this.$router.push(`/admin_users/edit/${row._id}`)
    }
  }
}
</script>

<style>

</style>