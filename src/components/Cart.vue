<template>
  <div>
    <table border="1">
      <tr>
        <td>
          商品
        </td>
        <td>
          单价
        </td>
        <td>
          数量
        </td>
        <td>
          价格
        </td>
        <td>
          操作
        </td>
      </tr>
      <tr v-for="(e, key) in data" :key="key">
        <td>
          {{ e.text }}
        </td>
        <td>
          {{ e.price }}
        </td>
        <td>
          {{ e.count }}
        </td>
        <td>
          {{ e.count * e.price }}
        </td>
        <td>
          <button @click="add(key)">添加</button>
          <button @click="sub(key)">减少</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    add(i) {
      this.$emit("add", { index: i });
    },
    sub(i) {
      this.$emit("sub", { index: i });
    }
  }
};
</script>

<style></style>
