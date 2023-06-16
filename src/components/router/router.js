import { createRouter, createWebHashHistory } from "vue-router";

import pageIndex from "@/components/PageIndex.vue";


const routes = [
    {
        path: "/",
        redirect: "/pageIndex"
    },
    {
        path: "/pageIndex",
        component: pageIndex,

    },


];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
