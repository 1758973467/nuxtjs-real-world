module.exports = {
    plugins: ['@/plugins/request', '@/plugins/dayjs'],
    router: {
        linkActiveClass: 'active',

        extendRoutes(routes, resolve) {
            routes.splice(0)
            routes.push(...[{
                path: '/',
                component: resolve(__dirname, 'pages/layout/'),
                children: [
                    {
                        path: '',
                        name: 'home',
                        component: resolve(__dirname, 'pages/home/')
                    },
                    {
                        path: 'login',
                        name: 'login',
                        component: resolve(__dirname, 'pages/login/')
                    },
                    {
                        path: 'register',
                        name: 'register',
                        component: resolve(__dirname, 'pages/login/')
                    },
                    {
                        path: 'profile/:username',
                        name: 'profile',
                        component: resolve(__dirname, 'pages/profile/')
                    },
                    {
                        path: 'profile/:username/favorites',
                        name: 'profileFavorite',
                        component: resolve(__dirname, 'pages/profile/')
                    },
                    {
                        path: 'editor',
                        name: 'editor',
                        component: resolve(__dirname, 'pages/editor/')
                    },
                    {
                        path: 'editor/:slug',
                        name: 'editorArticle',
                        component: resolve(__dirname, 'pages/editor/')
                    },
                    {
                        path: 'settings',
                        name: 'settings',
                        component: resolve(__dirname, 'pages/settings/')
                    },
                    {
                        path: 'article/:slug',
                        name: 'article',
                        component: resolve(__dirname, 'pages/article/')
                    }
                ]
            }])
            // routes.push({
            //     name: 'custom',
            //     path: '*',
            //     component: resolve(__dirname, 'pages/404.vue')
            // })
        }
    }
}