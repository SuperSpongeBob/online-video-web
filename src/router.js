import { RouterView, createRouter, createWebHistory } from "vue-router/dist/vue-router";
import { h } from 'vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: () => import('./components/Login.vue') },
        { path: '/register', component: () => import('./components/Register.vue') },
        { path: '/forgetPassword', component: () => import('./components/subcomponents/ForgetPassword.vue') },
        { path: '/home', component: () => import('./components/home.vue') },
        { path: '/videoPlay', component: () => import('./components/VideoPlay.vue') },
        { path: '/history', component: () => import('./components/PersonalCenter/subcomponents/History.vue') },
        { path: '/videoUpload', component: () => import('./components/VideoUpload.vue') },
        {
            path: '/index', component: () => import('./components/Index.vue'), redirect: '/index/videoList', children: [
                {
                    path: 'videoList',
                    component: { render: () => h(RouterView) },
                    children: [{
                        path: '',
                        component: () => import('./components/subcomponents/VideoList.vue')
                    }]
                },
                {
                    path: 'recommend',
                    component: { render: () => h(RouterView) },
                    children: [
                        {
                            path: '',
                            component: () => import('./components/subcomponents/Recommend.vue')
                        }
                    ]
                },
                {
                    path: `search/:searchText?`,
                    component: { render: () => h(RouterView) },
                    children: [
                        {
                            path: '',
                            component: () => import('./components/subcomponents/Search.vue')
                        }
                    ]
                },
                {
                    path: 'memberZone',
                    component: { render: () => h(RouterView) },
                    children: [{
                        path: '',
                        component: () => import('./components/subcomponents/MemberZone.vue')
                    }]
                },
                {
                    path: 'freeZone',
                    component: { render: () => h(RouterView) },
                    children: [{
                        path: '',
                        component: () => import('./components/subcomponents/FreeZone.vue')
                    }]
                },

            ]
        },
        {
            path: '/personalCenterIndex', name: 'personalCenterIndex', component: () => import('./components/PersonalCenter/PersonalCenterIndex.vue'), redirect: '/personalCenterIndex/basicInformation', children: [
                {
                    path: 'basicInformation',
                    component: { render: () => h(RouterView) },
                    children: [
                        {
                            path: '',
                            component: () => import('./components/PersonalCenter/subcomponents/BasicInformation.vue')
                        }
                    ]
                },
                {
                    path: 'infoEditor',
                    component: { render: () => h(RouterView) },
                    children: [
                        {
                            path: '',
                            component: () => import('./components/PersonalCenter/subcomponents/InfoEditor.vue')
                        }
                    ]
                },
                {
                    path: 'securityCenter',
                    component: { render: () => h(RouterView) },
                    children: [
                        {
                            path: '',
                            component: () => import('./components/PersonalCenter/subcomponents/SecurityCenter.vue')
                        }
                    ]
                },
                {
                    path: 'uploadRecord',
                    component: { render: () => h(RouterView) },
                    children: [
                        {
                            path: '',
                            component: () => import('./components/PersonalCenter/subcomponents/UploadRecord.vue')
                        }
                    ]
                },
                {
                    path: 'history',
                    component: { render: () => h(RouterView) },
                    children: [
                        {
                            path: '',
                            component: () => import('./components/PersonalCenter/subcomponents/History.vue')
                        }
                    ]
                }
            ]
        },


        {
            path: '/admin', name: 'Admin', component: () => import('./components/Admin/Index.vue'), redirect: '/Admin/User',
            children: [
                {
                    path: 'User', name: 'User',
                    component: { render: () => h(RouterView) },
                    component: () => import('./components/Admin/SubComponents/User.vue')
                },
                {
                    path: 'AddUser', name: 'AddUser',
                    component: { render: () => h(RouterView) },
                    component: () => import('./components/Admin/SubComponents/AddUser.vue')
                },
                {
                    path: 'Video', name: 'Video',
                    component: { render: () => h(RouterView) },
                    component: () => import('./components/Admin/SubComponents/Video.vue')
                },
                {
                    path: 'Check', name: 'Check',
                    component: { render: () => h(RouterView) },
                    component: () => import('./components/Admin/SubComponents/Check.vue')
                },

                {
                    path: 'Security', name: 'Security',
                    component: { render: () => h(RouterView) },
                    component: () => import('./components/Admin/SubComponents/Security.vue')
                },

            ]
        }

    ]
})

router.beforeEach((to, from, next) => {


    if (to.path === ('/') || to.path === ('/login') || to.path === ('/register') || to.path === ('/forgetPassword') || to.path === ('/index') || to.path == ("/home")) {
        return next()
    }
    //  由于服务器在未登录情况下敏感数据也无法获取到，前端页面进去了也没用，取消守卫功能了

    // const token = sessionStorage.getItem('LoginState')

    // if (!token) {
    //     return next('/login')

    // }

    next()


    // if(!token){
    //      next('/login')
    // }
    // next()
})
export default router