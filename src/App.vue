<template>
  <main-page></main-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import MainPage from "./pages/main-page.vue";

@Component({
  components: {
    MainPage,
  },
})
export default class App extends Vue { }
</script>

<style lang="less">
html {
  height: 100vh;
}

body {
  height: 100%;
  margin: 0px;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
