<template>
  <div>
    <a-list class="list" :grid="{ gutter: 16, column: 4 }" :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <div v-if="item.add_button">
          <a-card class="button" type="inner" @click="add">
            <a-icon class="icon" type="plus" />
          </a-card>
        </div>
        <div v-else>
          <a-tooltip>
            <template slot="title">
              点击可以修改
            </template>
            <a-card class="card" :title="item.name" @click="update(item)">
              <a slot="extra" @click.stop="showRemove(index)">删除</a>
              保质期:{{ formate(item.default_safe_date) }}
            </a-card>
          </a-tooltip>
        </div>
      </a-list-item>
    </a-list>
    <!-- 删除确认框 -->
    <a-modal
      title="是否确认删除"
      :visible="delVisible"
      :confirm-loading="confirmLoading"
      @ok="handleRemove"
      @cancel="handleCancel"
    >
      <p>删除: {{ deleteTitle }} 后无法恢复</p>
    </a-modal>
    <!-- 新增输入框 -->
    <a-modal :visible="addVisible" title="新增分类" @ok="handleAdd" @cancel="handleCancel">
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 10 }">
        <a-form-item label="分类名称">
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '请输入分类名称' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="保质期">
          <a-input
            v-decorator="[
              'default_safe_date',
              {
                rules: [{ required: true, message: '请输入保质期天数' }]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 修改输入框 -->
    <a-modal :visible="updateVisible" title="修改分类" @ok="handleUpdate" @cancel="handleCancel">
      <a-form-model ref="ruleForm" :model="updateForm" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item ref="name" label="分类名称" prop="name">
          <a-input
            v-model="updateForm.name"
            @blur="
              () => {
                $refs.name.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item ref="default_safe_date" label="保质期" prop="default_safe_date">
          <a-input
            v-model="updateForm.default_safe_date"
            @blur="
              () => {
                $refs.default_safe_date.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { add, list, remove, update } from "../../api/type";
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: "rule" }),
      addVisible: false,
      updateVisible: false,
      delVisible: false,
      confirmLoading: false,
      deleteTitle: "",
      deleteId: "",
      deleteIndex: 0,
      data: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      updateForm: {
        _id: "",
        name: "",
        default_safe_date: 0
      },
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        default_safe_date: [{ required: true, message: "请输入保质期天数", trigger: "blur" }]
      }
    };
  },
  computed: {
    // 闭包 计算属性传参
    formate() {
      return function(default_safe_date) {
        return default_safe_date + "天";
      };
    }
  },
  async mounted() {
    await this.getData();
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
