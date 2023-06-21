import { createRouter, createWebHashHistory } from "vue-router";

import pageIndex from "@/components/PageIndex.vue";
import UserPage from "@/components/componet/UserPage.vue";
import BlogPage from "@/components/componet/BlogPage.vue";
import IndexPage from "@/components/componet/IndexPage.vue";
import BlogCreate from "@/components/componet/BlogCreate.vue";
const routes = [
    {
        path: "/",
        redirect: "/pageIndex"
    },
    {
        path: "/pageIndex",
        component: pageIndex,
        redirect: "/index",
        children: [
            {path: '/index', component: IndexPage},
            {path: '/about', component: UserPage},
            {path: '/blog', component: BlogPage},
        ]
    },
    {
        path: "/BlogCreate",
        name:"BlogCreate",
        component: BlogCreate
    },
    {
        path:"/blog/:userId/:blogId",
        name:"blog",
    }

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
