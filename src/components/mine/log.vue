<template>
  <div>
     <mt-header title="我的">
      <mt-button  slot="left">{{address}}</mt-button>
    </mt-header> 
    <div id="a">
      <div id="ig" @click='xiugai'>
        <!-- <img  v-show="lo==false" src="../../assets/img/lanxi.png" alt="头像图片"> -->
        <img src="../../assets/img/girllog.png" alt="头像图片" v-if="lo&&a=='女'">
        <img src="../../assets/img/boylog.png" alt="头像图片" v-else-if="lo&&a=='男'">
        <img src="../../assets/img/lianxirena.png" alt="头像图片" v-else>
      </div>
      <div id="zhuang">     
        <span v-if="lo">{{name}}<span :style="{marginLeft:5+'px'}">修改资料</span></span>
        <span v-else>未登录</span>
      </div>
    </div> 
      <mt-cell title="修改密码" is-link @click.native='gaimm'>
        <img slot="icon" src="../../assets/img/xiugai.png" width="24" height="24" />
      </mt-cell>
      <mt-cell title="关于我们" is-link to='/about'>
        <img slot="icon" src="../../assets/img/about.png" width="24" height="24" />
      </mt-cell>
      <!-- <mt-cell title="拨打电话" is-link to='/phone'>
        <img slot="icon" src="../../assets/img/about.png" width="24" height="24" />
      </mt-cell> -->
      <mt-cell title="清理缓存" is-link @click.native="clearc">
        <img slot="icon" src="../../assets/img/about.png" width="24" height="24" />
      </mt-cell>
      <mt-button @click.native="log" type='danger' :style="{width:this.wid+'px'}">{{cont}}</mt-button>
  </div>
</template>

<script>
// import xiugai from './gongneng/xiugai'
export default {
  name: "log",
  data() {
    return {
      wid:0,
      lo:'',//判断登录没有
      name:'',
      a:'',//判断修改了头像没
      cont:'',
      address:'',
      phoneNum:''
    }
  },
  methods: {
    //登录
    log(){
      if(this.lo==false){
        this.$router.push('/golog')
      }else{
        this.$store.state.login.login=false
        this.$store.state.login.username=''
        this.$store.state.login.password=''
        this.$store.state.login.phoneNum=''    
        this.name=''
        this.lo=false;
        this.$store.state.friend.len=0;
        this.$toast({
          message:'退出登录ok',
          duration:1000
        })
        sessionStorage.setItem('userLogin',false)
      }
    },
    //修改资料
    xiugai(){
      if(this.lo==true){
        this.$router.push('/xiugai')
      }else{
        this.$toast({
          message:'未登录',
          duration:3000
        })
      }
    },
    //修改密码
    gaimm(){
      if(this.lo==true){
        this.$router.push('/gaimm')
      }else{
        this.$toast({
          message:'未登录',
          duration:3000
        })
      }
    },
    //清理缓存
    clearc(){
      this.$messagebox({
        title: "温馨提示",
        message: "确认清除缓存",
        showCancelButton: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(action => {
        if (action == "confirm") {
          console.log("清除");
        } else {
          console.log("返回");
        }
      });
    }
  },
  mounted() {  
    var _this=this;
    this.phoneNum=this.$store.state.login.phoneNum;
    this.lo=this.$store.state.login.login;
    this.name=this.$store.state.login.username;
    this.a=this.$store.state.login.sex;
    this.phoneNum=this.$store.state.login.phoneNum
    this.wid=document.documentElement.clientWidth || document.clientWidth;
    _this.$store.state.shebei.wid=document.documentElement.clientWidth || document.clientWidth;
    _this.$store.state.shebei.hei=document.documentElement.clientHeight || document.clientHeight;
  },
  watch: {
    lo(v){
      var _this=this;
      if(v==false){
        _this.cont='登录';
        if(_this.phoneNum!=''){
            _this.$axios.get('/api/user/tuichu',{
            params:{
              phoneNum:_this.phoneNum
            }
          })
          .then(res=>{
            _this.$toast({
              message:'退出登录'
            })
          })
          .catch(err=>{
            _this.$toast({
              message:'err:'+err
            })
          })
        }
      
      }else{
        _this.cont='退出登录'
        // console.log(_this.$store.state.login.phoneNum)       
      }
    },
    a(v){
      var _this=this;
      if(v=="男"){
        _this.a='男'
      }else {
        _this.a='女'
      }
    }
  }
};
</script>
<style scoped>
#a{
  width:100%;
  height: 150px;
  background-color: white
}
#ig{
  width:100px;
  height:100px;
  margin: 0px auto;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 50%;
  overflow:hidden;
  border:1px solid lightgray;
}
#ig img{
  width: 100px;
  height:100px;
}
#zhuang{
  display:table;
  margin: 0 auto;
}
#zhuang span{
  font-size: 14px;
  color: lightgray
}
</style>