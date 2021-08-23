
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name:"plot", 
        path: '', component: () => import('pages/Index.vue')
     },
     {
       name:"presentation",
       path: 'presentation', component: () => import('pages/Presentation.vue'),
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
