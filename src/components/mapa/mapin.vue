<template>
<div>
    <mt-field
      type="text"
      autofocus
      v-model="ct"
      placeholder="搜索"
      id="cx"
      :style="{width:this.wa-55+'px'}"
      @keypress.native="searchBtn()"
    ></mt-field>
    <router-link to="/mapa" slot="left" tag='div'>
      <span id="adda">取消</span>
    </router-link>
    <!--主要内容-->
</div>
</template>

<script>
import $ from 'jquery'
export default {
    name:'mapin',
    data() {
        return {
            ct:'',//输入的内容
            wa:''
        }
    },
    methods: {
        searchBtn(){
          if($.trim(this.ct).length!=0){
            
          }else{
              
          }
        }
    },
    mounted() {
        this.wa=document.documentElement.clientWidth || document.body.clientWidth;
    },
}
</script>
<style scoped>
#cx {
  margin: 10px 0px 6px 6px;
  border: 1px solid gray;
  border-radius: 40px;
  min-height: 20px;
}
#adda {
  position: absolute;
  right: 10px;
  top: 13px;
}
</style>