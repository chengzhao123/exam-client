<template>
<div id="a" :style='{height:b+"px"}'>
<mt-header title="关于我们" class="ba">
      <router-link to="/login" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <h1>这是关于我们的内容</h1>
</div>
</template>

<script>

export default {
    name:'about',
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