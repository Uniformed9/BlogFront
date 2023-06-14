import { createRouter, createWebHashHistory } from "vue-router";

import pageIndex from "@/components/PageIndex.vue";

import TestPage from "@/components/TestPage.vue";
const routes = [
    {
        path: "/",
        redirect: "/pageIndex"
    },
    {
        path: "/pageIndex",
        component: pageIndex,

    },
    {
        path: "/test",
        component: TestPage,

    },

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
