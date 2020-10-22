<template>
  <div>
    <a-table :columns="columns" :data-source="data">
      <a slot="name" slot-scope="text">{{ text }}</a>
    </a-table>
  </div>
</template>

<script>
import { add, list, remove, update } from "../../api/type";
export default {
  data() {
    return {
      columns: [
        {
          title: "名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "分类名称",
          dataIndex: "type_name",
          key: "type_name"
        },
        {
          title: "保质期",
          dataIndex: "safe_date",
          key: "safe_date"
        }
      ],
      data: [
        {
          key: "1",
          name: "猪肉",
          type_name: "肉类",
          safe_date: "30"
        },
        {
          key: "2",
          name: "黄瓜",
          type_name: "蔬菜类",
          safe_date: "7"
        }
      ]
    };
  },
  computed: {
    // 闭包 计算属性传参
    // formate() {
    //   return function(default_safe_date) {
    //     return default_safe_date + "天";
    //   };
    // }
  },
  async mounted() {
    // await this.getData();
  },
  methods: {
    update(i) {
      this.updateVisible = true;
      this.updateForm._id = i._id;
      this.updateForm.name = i.name;
      this.updateForm.default_safe_date = i.default_safe_date;
    },
    async handleUpdate() {
      this.confirmLoading = true;
      let result = await update(this.updateForm);
      if (result) {
        this.$message.success("修改成功", 2);
        let data = this.data.filter(item => {
          return item._id === this.updateForm._id;
        });
        data[0].name = this.updateForm.name;
        data[0].default_safe_date = this.updateForm.default_safe_date;
      } else {
        this.$message.error("修改失败", 2);
      }
      this.confirmLoading = false;
      this.updateVisible = false;
    },
    add() {
      this.addVisible = true;
    },
    async handleAdd() {
      this.confirmLoading = true;
      this.form.validateFields(async (err, value) => {
        if (!err) {
          this.addVisible = false;
          this.confirmLoading = false;
          let result = await add(value);
          if (result) {
            this.$message.success("新增成功", 2);
            this.data.push(value);
          } else {
            this.$message.error("新增失败", 2);
          }
        }
      });
    },

    showRemove(i) {
      this.deleteTitle = this.data[i].title;
      this.deleteId = this.data[i]._id;
      this.deleteIndex = i;
      this.delVisible = true;
    },
    async handleRemove() {
      this.confirmLoading = true;
      this.delVisible = false;
      let result = await remove({ _id: this.deleteId });
      if (result.status === 200) {
        this.data.splice(this.deleteIndex, 1);
        this.deleteIndex = 0;
        this.$message.success("删除成功", 2);
      } else {
        this.$message.error("删除失败", 2);
      }
      this.confirmLoading = false;
      this.deleteId = "";
    },

    handleCancel() {
      this.delVisible = false;
      this.addVisible = false;
      this.updateVisible = false;
    },

    async getData() {
      let result = await list();
      if (result.status === 200) {
        this.data = result.data;
      }
      // 添加新增图标
      this.data.unshift({
        add_button: true
      });
    }
  }
};
</script>

<style>
.list {
  margin-top: 4vh;
}

.button {
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  height: 130px;
}
.card:hover {
  background-color: rgba(170, 238, 204, 0.363);
}

.icon {
  font-size: 50px;
}
</style>
