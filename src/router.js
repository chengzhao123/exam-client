//配置路由相关的信息

import Vue from 'vue'
import Router from 'vue-router'
//不是懒加载的模式
// import home from '../components/home.vue'
// import about from '../components/about.vue'
// import user from '../components/user.vue'


//下面的是路由的懒加载模式
const shouyeh= () => import('./views/shouye.vue')
const shouyec= () => import('./components/shouye/shouyecontent.vue')
const mapa= () => import('./views/mapa.vue')
const log= () => import('./views/mine.vue')
// const chatting =() =>import('../components/chat/chatting.vue')
const cha =() =>import('./views/chat.vue')
const add =()=>import('./views/addfriend.vue')
const xiugai=()=>import('./components/minegonneng/xiugai.vue')
const about=()=>import('./components/minegonneng/about.vue')
const golog=()=>import('./components/minegonneng/golog.vue')
const gores=()=>import('./components/minegonneng/gores.vue')
const goforget=()=>import('./components/minegonneng/goforget.vue')
// const phone=()=>import('./components/minegonneng/phone.vue')
const lianxiren=()=>import('./views/lianxiren.vue')
const lianxirenh=()=>import('./components/lianxiren/lianxirenh.vue')
const gaimm=()=>import('./components/minegonneng/gaimm.vue')
const mibao=()=>import('./components/minegonneng/gomibao.vue')
const sousuo=()=>import('./components/lianxiren/sousuo.vue')
const newFriend=()=>import('./components/lianxiren/newFriend.vue')
const myCenter=()=>import('./components/mycenter/mycenters.vue')
const mapin=()=>import('./components/mapa/mapin.vue')
// //1.Vue.use传入插件 Vue.use(插件)
Vue.use(Router)
//2.创建VueRouter对象
const routes=[
  {
    path:'',
    //redirect重定向，打开页面的默认路径
    redirect:'shouye',
    meta:{keepAlive:true}
  },
  {
    path:'/chatting',//聊天
    component:cha,
    meta:{keepAlive:false},
    query:{id:''}
  },
  {
    path:'/add',//添加朋友
    component:add,
    meta:{keepAlive:true,id:''}
  },
  {
    path:'/shouye',//首页
    component:shouyeh,
    meta:{keepAlive:true},
    children:[
      {
        path:'/',
        redirect:'shouyec',
      },
      {
        path:'shouyec',//首页主干
        component:shouyec
      }
    ]
  },{
    path:'/mapa',//地图
    component:mapa,
    meta:{keepAlive:false}
  }, 
  //设置里面的功能
  {
    path:'/login',//设置页面
    component:log,
    meta:{keepAlive:false}
  },
  {
    path:'/xiugai',//修改密码
    component:xiugai,
    meta:{keepAlive:true}
  },{
    path:'/golog',//登录
    component:golog,
    meta:{keepAlive:true}
  },
  {
    path:'/zhuce',//注册
    component:gores,
    meta:{keepAlive:true}
  },
  {
    path:'/forget',//忘记密码
    component:goforget,
    meta:{keepAlive:true}
  },
  {
    path:'/about',//关于
    component:about,
    meta:{keepAlive:true}
  },
  {
    path:'/gaimm',//改密码
    component:gaimm,
    meta:{keepAlive:true}
  },
  {
    path:'/gomibao',//密保
    component:mibao,
    meta:{keepAlive:true}
  },
  //设置结束
  {
    path:'/lianxiren',//联系人头部
    component:lianxirenh,
    meta:{keepAlive:true},
    children:[
      {
        path:'/',
        redirect:'lianxirenh',
      },
      {
        path:'lianxirenh',
        component:lianxiren//联系人中间部分
      }
    ]
  },
  {//联系人的查找页面
    path:'/sousuo',
    component:sousuo,
    meta:{keepAlive:true}
  },{//联系人的新朋友页面
    path:'/newFriend',
    component:newFriend,
    meta:{keepAlive:false}
  },{//朋友的个人中心页面
    path:'/mycenter',
    component:myCenter,
    meta:{keepAlive:false}
  },{
    path:'/mapin',
    component:mapin,
    meta:{keepAlive:false}
  }
]
const router=new Router({
  //routes配置router和路径属性
  routes,
  mode:'hash'
  // linkActiveClass:'active'
})
//路由导航函数（前置钩子）
// router.beforeEach(function(to,from,next){
//   var _this=this;
//   var nextRoute=['/shouye/shouyec','/lianxiren/lianxirenh','/mapa','/login']
//   var a=to.path;
//   var b=sessionStorage.getItem('userLogin');
//   if(nextRoute.indexOf(a)>=0){
//     if(!b){
//       router.push({path:'/golog'})
//     }else if(b==true){
//       router.push('/shouye/shouyeh')
//     }
//   }
//   next();
// });

// //后置钩子(hook)
// router.afterEach(function(to,from){
  
// })
//将这个router对象传入数据中
export default router//导出
