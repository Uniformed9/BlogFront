import { createRouter, createWebHashHistory } from "vue-router";
import pageIndex from "@/components/PageIndex.vue";
import BlogCreate from "@/components/componet/BlogCreate.vue";
import BlogPage from "@/components/componet/BlogPage.vue";
import UserPage from "@/components/componet/UserPage.vue";
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
