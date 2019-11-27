<template>
<div>
    <mt-header title="联系人" :style="{width:wa+'px'}" id="ma">
      <!-- <mt-button  slot="right" @click.native="ad">
        <img src="../../assets/img/jia.png" class="tupian">
      </mt-button> -->
    </mt-header>
    <span id="sp">
      <router-link to="/sousuo">
       <mt-field type="text" v-model="ss" placeholder="查询" id="cx" :style="{width:wa-12+'px'}" readonly></mt-field>
      </router-link>
     
        <mt-cell title="新朋友" is-link to='/newFriend' id="so">
          <mt-badge size="small" type="error" v-show="num>0">{{num}}</mt-badge>
        </mt-cell>
    </span>
    <router-view ></router-view>
</div>
</template>

<script>

export default {
    name:'lianxirenh',
    data() {
        return {
            ss:"",
            wa:"",
            num:0
        }
    },
   methods: {
   
   },
    mounted() {
      var _this=this;
      if(_this.$store.state.login.login==true){
        _this.$axios.get('/api/user/getSendFr',{
        params:{
          phone:_this.$store.state.login.phoneNum //自己的电话，自己电话传过去，后端判断是否有人把自己放在sendFriend当中，有，则返回是谁添加了，无，则没事
        }
        }).then(res=>{
          var Fr=res.data.messagea;
          var Rj=res.data.messageb;
          _this.num=Fr.length;
          sessionStorage.setItem('getSendFr',JSON.stringify(Fr))
          sessionStorage.setItem('getRejeFr',JSON.stringify(Rj))
        }).catch(err=>{
          _this.$toast({
            message:'err:'+err,
            duration:1000
          })
        })
      }
      this.wa = document.documentElement.clientWidth || document.clientWidth;
    }
}
</script>
<style scoped>
#ma{
  position: fixed;
  z-index: 100;
  top:0px;
}
#sp{
  top: 40px;
  position:absolute;
  z-index:90
}
.tupian{
  width:18px;
  height:18px;
  right: 10px;
}
#cx {
  margin: 6px 0px 6px 6px;
  width: 85%;
  border: 1px solid gray;
  border-radius: 40px;
  min-height: 20px;
}
div >>> .mint-field-core{
  text-align:center;
}
div >>> .mint-cell{
 border-top:1px solid rgb(187, 190, 190,0.2);
 border-bottom:1px solid rgb(187, 190, 190,0.2)
}
#so{
  background: transparent;
  min-height: 39px;
}
/* #bt {
  width: 45px;
  color: lightseagreen;
  height: 28px;
  position: absolute;
  top: 8px;
  right: -45px;
  text-align: center;
  border-radius: 5px;
} */
</style>