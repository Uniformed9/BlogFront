import {createRouter, createWebHistory} from "vue-router";

import pageIndex from "@/components/PageIndex.vue";
import UserPage from "@/components/componet/UserPage.vue";
import BlogPage from "@/components/componet/BlogPage.vue";
import IndexPage from "@/components/componet/IndexPage.vue";
import BlogDetail from "@/components/BlogDetail/BlogDetail";
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
        path:"/blogs/:userId/:blogId",
        name:"blogDetail",
        component: BlogDetail,
    },

    {
        path: "/BlogCreate",
        name:"BlogCreate",
        component: BlogCreate
    },

];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
