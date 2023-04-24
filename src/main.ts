import Vue from "vue"
import App from "./App.vue"


Vue.config.devtools = true;
const v = new Vue({
    el: "#app",
    template: `<App/>`,
    components: {
        App,
    }
});