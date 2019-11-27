<template>
  <div id="a" :style="{height:this.heigh+'px'}">
    <mt-header title="修改资料" class="ba">
      <router-link to="/login" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div id="b">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号" type="number" v-model="phoneNum" readonly></mt-field>
      <mt-field label="生日" placeholder="请输入生日" type="date" v-model="birthday"></mt-field>
      <mt-radio title="性别" v-model="va" :options="['男', '女']"></mt-radio>
      <mt-button @click.native="handleClick" type="primary" :style="{width:this.wid+'px'}">确认</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "xiugai",
  data() {
    return {
      wid: 0,
      heigh: 0,
      username: "",
      phoneNum: "",
      birthday: "",
      va: ""
    };
  },
  methods: {
    handleClick() {
      var _this=this;
      _this.$axios.get('/api/user/xiugai',{
        params:{
          username:_this.username,
          phoneNum:_this.phoneNum,
          sex:_this.va,
          birthday:_this.birthday
        }
      })
      .then(res=>{
        if(res.data.code==0){
          this.$toast({
            message:res.data.message,
            position: "center"
          });
          _this.$store.state.login.username=_this.username
        }else if(res.data.code==1||res.data.code==2) {
          this.$toast({
            message:'err'+res.data.message,
            position: "center"
          });
        }
         
      })
      .catch(err=>{
         this.$toast({
          message: 'err:'+err,
          position: "center"
        });
      })
     
    }
  },
  mounted() {
    this.username=this.$store.state.login.username
    this.phoneNum=this.$store.state.login.phoneNum
    this.heigh = document.documentElement.clientHeight || document.clientHeight;
    this.wid = document.documentElement.clientWidth || document.clientWidth;
    this.va='男'
  },
  watch: {
    va(v){
      var _this=this
      if(v=='女'){
        _this.$store.state.login.sex="女"
      }else {
        _this.$store.state.login.sex="男"
      }
    }
  },
};
</script>
<style scoped>
#a {
  width: 100%;
  /* height: 100%; */
  position: absolute;
  background-color: white;
  z-index: 3;
  scroll-behavior: unset;
}
#b {
  position: relative;
  margin-top: 40px;
}
.ba {
  position: fixed;
  top: 0px;
  z-index: 6;
  width: 100%;
  margin-bottom: 40px;
}
</style>