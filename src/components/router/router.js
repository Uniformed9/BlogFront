import { createRouter, createWebHashHistory } from "vue-router";
import pageIndex from "@/components/PageIndex.vue";
import BlogCreate from "@/components/BlogCreate.vue";
import BlogPage from "@/components/componet/BlogPage.vue";
import UserPage from "@/components/componet/UserPage.vue";
import IndexPage from "@/components/componet/IndexPage.vue";


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
    },
    {
        path: "/BlogCreate",
        name:"BlogCreate",
        component: BlogCreate
    }

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
