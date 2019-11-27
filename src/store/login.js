import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        login:{
            login:false,
            phoneNum:'',
            password:'',
            username:'',
            sex:"男"
        },
        friend:{
            len:0,
            key:"",
            shouy:"",
            lianxiren:""
        },
        shebei:{
            wid:0,
            hei:0
        }
    },
    mutations:{
        
    },
    actions:{

    },
    modules:{

    }
})