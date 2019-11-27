<template>
<div>
<shouyeh id="a" v-if="this.rea"></shouyeh>
<!-- <shouyec id="b"></shouyec> -->
<router-view id="b"></router-view>
</div>
</template>

<script>
import shouyeh from "../components/shouye/shouyehead";
// import shouyec from "../components/shouye/shouyecontent";
export default {
    name:'shouye',
    data() {
      return {
        pat:"",
        rea:true
      }
    },
    components:{
        shouyeh
        // shouyec
    },
    watch: {
      pat(){
        var a=['/shouye/shouyec']
        if(a.indexOf(this.$route.path)>=0){
          this.rea=true
        }else{
          this.rea=false
        }
      }
    },
    updated() {
      this.pat=this.$route.path
    },
    mounted() {
      this.rea="/shouye/shouyec";
    },
    beforeRouteLeave(to, from, next) {
      if(from.path=='/shouye/shouyec'&&to.path=='/chatting'){
        sessionStorage.setItem('pat',from.path)
      }
      next();
    }
}
</script>
<style scoped>
#a {
  position: fixed;
  width: 100%;
  top: 0px;
  z-index:3;
}
#b{
  position: relative;
  top:40px;
  margin-bottom:55px;
}
</style>