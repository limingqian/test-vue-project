<template>
  <div>
    <a-form layout="horizontal" :form="form" style="width:600px">
      <a-form-item label="付款账户" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-input
          v-decorator="[
            'payAccount',
            {
              initialValue: step.payAccount,
              rules: [{ required: true, message: '请输入付款账号' }]
            }
          ]"
          placehoder="请输入付款账号"
        ></a-input>
      </a-form-item>
      <a-form-item label="收款账户" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <ReceiveAccount
          v-decorator="[
            'receiveAccount',
            {
              initialValue: step.receiveAccount,
              rules: [
                {
                  required: true,
                  message: '请输入收款账号',
                  validator: (rule, value, callback) => {
                    if (value && value.number) {
                      callback();
                    } else {
                      callback(false);
                    }
                  }
                }
              ]
            }
          ]"
          placehoder="请输入付款账号"
        ></ReceiveAccount>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
// @是webpack配置的,指src目录,自定义别名
import ReceiveAccount from "@/components/ReceiveAccount";

// import ReceiveAccount from "../../../components/ReceiveAccount";
export default {
  // import 加 components ,引入加注册
  components: {
    ReceiveAccount
  },
  data() {
    this.form = this.$form.createForm(this);

    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    }
  },
  methods: {
    handleSubmit() {
      const { form, $router, $store } = this;
      form.validateFields((err, values) => {
        if (!err) {
          $store.commit({
            type: "form/saveStepFormData",
            payload: values
          });
          // 跳转
          $router.push("/form/step-form/confirm");
        }
      });
    }
  }
};
</script>
