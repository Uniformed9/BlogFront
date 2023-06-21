import {createRouter, createWebHashHistory} from "vue-router";

import pageIndex from "@/components/PageIndex.vue";
import UserPage from "@/components/componet/UserPage.vue";
import BlogPage from "@/components/componet/BlogPage.vue";
import IndexPage from "@/components/componet/IndexPage.vue";
import SearchPage from "../componet/SearchPage.vue";
const routes = [
    {
        path: "/",
        redirect: "/pageIndex"
    },
    {
        path: "/pageIndex",
        component: pageIndex,
        children: [
            {path: '/index', component: IndexPage},
            {path: '/about', component: UserPage},
            {path: '/blog', component: BlogPage},
        ]
    }, {
        path: "/search",
        component: SearchPage
    }


];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
