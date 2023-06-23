import { createRouter, createWebHistory } from "vue-router";

import pageIndex from "@/components/PageIndex.vue";
import UserPage from "@/components/componet/UserPage.vue";
import BlogPage from "@/components/componet/BlogPage.vue";
import IndexPage from "@/components/componet/IndexPage.vue";
import BlogCreate from "@/components/componet/BlogCreate.vue";
import UserSpace from "@/components/componet/UserSpace.vue";
import SearchPage from "../componet/SearchPage.vue";
import BlogDetail from "@/components/BlogDetail/BlogDetail.vue";
const routes = [
    {
        path: "/",
        redirect: "/index"
    },
    {
        path: "/index",
        component: pageIndex,
        children: [
            {path: '/index', component: IndexPage},
            {path: '/about', component: UserPage},
            {path: '/blog', component: BlogPage},
            {path:"/user/:userId", component: UserPage},
        ]
    },
    {
        path: "/search",
        component: SearchPage
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
