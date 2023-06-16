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
        name:"pageIndex",
        component: pageIndex,
        meta: {
            index: 1
        }
    },
    {
        path: "/test",
        name:"Test",
        component: TestPage,

    },
    {
        path: '/pageIndex2',
        name: 'pageIndex2',
        component: ()=>import('../PageIndex2.vue'),
        meta:{
            index:2
        }
    }

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
