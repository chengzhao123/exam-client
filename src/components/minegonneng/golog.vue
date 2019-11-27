<template>
  <div id="a" :style="{height:b+'px'}">
    <mt-header title="登录" class="ba">
      <router-link :to="addd" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div id="logi">
      <div id="top">
        <img src="../../assets/img/mine.png" alt />
        <span>LRJ</span>
      </div>
      <div id="cent">
        <div id="zhall">
          <mt-field type="number" v-model="phoneNum" placeholder="输入手机号"></mt-field>
        </div>
        <div id="mmall">
          <mt-field type="password" v-model="password" placeholder="输入密码"></mt-field>
        </div>
        <mt-button @click.native="sure" type="primary" id="sure">确认</mt-button>
        <div id="ft">
          <span @click="forget">忘记密码</span>
          <span :style="{margin:'0px 15px'}">|</span>
          <span @click="zhuce">用户注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: "golog",
  data() {
    return {
      b: "",
      phoneNum: "",
      password: "",
      addd:""
    };
  },
  methods: {
   sure() {
     var _this=this;
      var tel=/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;//手机号验证
      if(tel.test(_this.phoneNum)&&$.trim(_this.password).length!=0){        
          _this.$axios.get("/api/user/golog",{
            params:{
              phoneNum:_this.phoneNum,
              password:_this.password
            }
          }       
          )
          .then(res=>{
                if(res.data.code==0){//没注册
                  // console.log(res.data.message)
                  _this.$toast({
                      message:res.data.message,
                      duration:1000
                  })
                }else if(res.data.code==1){//密码错误
                    // console.log(res.data.message)
                    _this.$toast({
                      message:res.data.message,
                      duration:1000
                    })
                }else if(res.data.code==2){//登录成功
                    // console.log(res.data.message)
                    _this.$toast({
                      message:res.data.message,
                      duration:1000
                    })
                    sessionStorage.setItem('userLogin',true)
                    _this.$router.push('/shouye')
                    this.$store.state.login.login=true
                    this.$store.state.login.phoneNum=_this.phoneNum
                    this.$store.state.login.password=_this.password
                    this.$store.state.login.username=res.data.username
                    this.$store.state.login.sex=res.data.sex
                }              
                _this.phoneNum='';
                _this.password='';
          })
          .catch(err=>{
            //  console.log(err+'提交失败')
            _this.$toast({
                message:err+',提交失败',
                duration:1000
            })
             _this.phoneNum='';
             _this.password='';
          })
      }else if(tel.test(_this.phoneNum)==false){
        // console.log('手机号码格式不对')
        _this.$toast({
          message:'手机号码格式不对',
          duration:1000
        })
        _this.phoneNum='';
        _this.password='';
      }else if($.trim(_this.password).length==0){
        // console.log('密码不能为空')
        _this.$toast({
          message:'密码不能为空',
          duration:1000
        })
        _this.phoneNum='';
        _this.password='';
      }
    },
    zhuce() {
      this.$router.push({ path: "/zhuce" });
    },
    forget(){
      this.$router.push({ path: "/forget" });
    }
  },
  mounted() {
    if(!sessionStorage.getItem('userLogin')){
      this.addd=''
      this.$toast({
        message:'请登录',
        duration:1000
      })
    }else{
      this.addd='/shouye'
    }
    this.b = document.documentElement.clientHeight || document.body.clientHeight;
    this.$store.state.shebei.wid=document.documentElement.clientWidth || document.body.clientWidth
    this.$store.state.shebei.hei=document.documentElement.clientHeight || document.body.clientHeight
  },
};
</script>
<style scoped>
#a {
  width: 100%;
  z-index: 4;
  background-color: white;
  position: absolute;
}
#logi {
  width: 100%;
  height: 400px;
}
/*顶部 */
#top img {
  width: 60px;
  height: 60px;
}
#top {
  display: table;
  margin: 0px auto;
  margin-top: 50px;
}
#top span {
  float: right;
  font-size: 50px;
}
/* 中间的登录*/
#cent {
  width: 80%;
  height: 200px;
  display: table;
  margin: 10px auto;
}
#zhall,
#mmall {
  width: 100%;
  height: 48px;
  border: 1px solid lightgray;
  border-radius: 30px;
  margin-bottom: 10px;
}
.mint-cell,
.mint-field,
.is-nolabel,
.mint-cell-wrapper {
  background: none;
}
.mint-cell-wrapper {
  background-color: white;
}
/**底部 */
#sure {
  margin: 20px auto;
  display: table;
  border-radius: 50px;
}
#ft {
  margin: 10px auto;
  display: table;
}
#ft span {
  font-size: 14px;
}
</style>