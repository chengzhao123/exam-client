<template>
<div id="a" :style='{height:b+"px"}'> 
    <mt-header title="打电话" class="ba">
      <router-link to="/login" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <a :href="'tel：'+110">110</a>
      <!-- <mt-cell title="亲人" is-link to=''>
        <img slot="icon" src="../../assets/img/xiugai.png" width="24" height="24" />
      </mt-cell>
      <mt-cell title="110" is-link to=''>
        <img slot="icon" src="../../assets/img/about.png" width="24" height="24" />
      </mt-cell>
      <mt-cell title="119" is-link to=''>
        <img slot="icon" src="../../assets/img/about.png" width="24" height="24" />
      </mt-cell>
      <mt-cell title="120" is-link to=''>
        <img slot="icon" src="../../assets/img/about.png" width="24" height="24" />
      </mt-cell> -->
</div>
</template>

<script>

export default {
    data() {
        return {
            b:0
        }
    },
    mounted() {
        this.b=document.documentElement.clientHeight || document.clientHeight
    }
}
</script>
<style scoped>
#a{
    width:100%;
    z-index: 4;
    background-color: white;
    position: absolute
}
</style>