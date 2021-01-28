<template>
  <div>
    <vue-json-editor
      v-model="json"
      :mode="'code'"
      lang="zh"
      @json-save="onJsonSave"
      @has-error="onError"
    ></vue-json-editor>
  </div>
</template>
<script>
import vueJsonEditor from "vue-json-editor";
export default {
  data() {
    return {
      json: {
        msg: "demo of jsoneditor"
      }
    };
  },
  components: {
    vueJsonEditor
  },

  methods: {
    onJsonSave(value) {
      console.log("save:", value);
    },
    onError(value) {
      console.log("error:", value);
    }
  }
};
</script>

<style></style>
