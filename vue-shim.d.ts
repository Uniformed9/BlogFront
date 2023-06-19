// declare module "*.vue" {
//     import Vue from "vue";
//     export default Vue;
// 先不用ts
// }

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
