import Vue from 'vue';
import VueRouter from 'vue-router';
import home from "./components/home.vue";

Vue.use(VueRouter)  // Required when using modules

const router = new VueRouter({
    mode: 'history',  // Ensure we get clean urls with no #
    routes: [
        {
            path: '/',
            component: home
        }
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'current'
});

let app = new Vue({
    el: '#app',
    router
})