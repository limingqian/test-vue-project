<template>
  <div>
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="(good, key) in goods" :key="key">
        名称:{{ good.text }} 价格:{{ good.price }}
        <button @click="add(key)">加入购物车</button>
      </li>
    </ul>
    <Cart :data="cart" @add="onAdd" @sub="sub"></Cart>

    <h1>总价:{{ all }}</h1>
    <button @click="clear()">清空</button>
    <button @click="test()">测试方法</button>
  </div>
</template>

<script>
import Cart from "../../components/Cart";
import storage from "../../utils/storage";
export default {
  components: {
    Cart
  },
  data() {
    return {
      title: "商品列表",
      goods: [
        { text: "ke1", price: 1 },
        { text: "ke2", price: 2 },
        { text: "ke3", price: 3 }
      ],
      cart: []
    };
  },
  computed: {
    all() {
      return this.cart.reduce((prev, cur) => {
        return prev + cur.count * cur.price;
      }, 0);
    }
  },

  methods: {
    add(i) {
      let item = this.goods[i];
      let cart = this.cart.find(v => v.text === item.text);

      if (cart) {
        cart.count += 1;
      } else {
        this.cart.push({ ...item, count: 1 });
      }
    },
    clear() {
      this.all = 0;
      this.cart = [];
    },
    test() {
      storage.get("username");
    },
    onAdd(arg) {
      let { index } = arg;
      this.cart[index].count += 1;
    },
    sub(arg) {
      let { index } = arg;
      if (this.cart[index].count > 1) {
        this.cart[index].count -= 1;
      } else {
        this.cart.splice(index, 1);
      }
    }
  }
};
</script>

<style>
h1 {
  color: red;
}
</style>
