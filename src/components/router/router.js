import { createRouter, createWebHashHistory } from "vue-router";

import pageIndex from "@/components/PageIndex.vue";
import UserPage from "@/components/componet/UserPage.vue";
import BlogPage from "@/components/componet/BlogPage.vue";
import IndexPage from "@/components/componet/IndexPage.vue";
const routes = [
    {
        path: "/",

    },
    {   path:"/",
        component: pageIndex,
        redirect: "/index",
        children: [
            {path: '/index', component: IndexPage},
            {path: '/about', component: UserPage},
            {path: '/blog', component: BlogPage},
        ]
    },


];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
