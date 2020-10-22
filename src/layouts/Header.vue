<template>
  <div class="header">
    <a-dropdown>
      <a-icon type="global" />
      <a-menu
        slot="overlay"
        @click="localeChange"
        :selectedKeys="[$route.query.locale || 'zhCN']"
      >
        <a-menu-item key="zhCN">
          中文
        </a-menu-item>
        <a-menu-item key="enUS">
          英文
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <span class="logout" @click="logout">注销</span>
  </div>
</template>

<script>
import storage from "../utils/storage";
export default {
  methods: {
    localeChange({ key }) {
      this.$router.push({ query: { ...this.$router.query, locale: key } });
      this.$i18n.locale = key;
    },
    logout() {
      storage.clear();
      this.$router.push("/user/login");
    }
  }
};
</script>

<style scoped>
.header {
  float: right;
  margin-right: 30px;
}

.logout {
  margin-left: 20px;
}
</style>
