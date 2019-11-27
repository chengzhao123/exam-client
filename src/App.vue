<template>
  <div>
  <keep-alive>
    <router-view v-if="this.kep"></router-view>
  </keep-alive>
  <router-view v-if="!this.kep"></router-view>  
    <tabbar id="c" v-show="this.rot"></tabbar>
  </div>
</template>

<script>
import tabbar from "./components/tabbar/tabbar";
export default {
  name: "app",
  data() {
    return {
      kep:true,
      ha:0,
      rot:true,
      pat:""
    }
  },
  components: {
    tabbar
  },
  watch: {
    ha(n){
      document.getElementById('c').style.top=n+'px'
    },
    pat(){
      var a=['/shouye','/lianxiren','/mapa','/login','/shouye/shouyec','/lianxiren/lianxirenh'];
      // console.log(a.indexOf(this.$route.path))
      // console.log(this.$route.path)
      if(a.indexOf(this.$route.path)>=0){
        this.rot=true
      }else{
        this.rot=false
      }
    }
  },
  updated() {
    this.kep=this.$route.meta.keepAlive;
    this.pat=this.$route.path;
  },
  mounted() {
    this.pat="/shouye";
    this.ha=document.documentElement.clientHeight ||document.clientHeight;
  },
  methods: {
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#c {
  position: absolute;
  width: 100%;
  z-index: 1;
}
</style>
