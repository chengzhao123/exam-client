<template>
<div>
    <!-- <router-view></router-view> -->
    <lianxi></lianxi>
</div>
</template>

<script>
import lianxi from '../components/lianxiren/lianxiren'
export default {
    components:{
        lianxi:lianxi
    },
     beforeRouteLeave(to, from, next) {
      if(from.path=='/lianxiren/lianxirenh'&&to.path=='/chatting'){
        sessionStorage.setItem('pat',from.path)
      }
      next();
    }
}
</script>
<style scoped>
</style>