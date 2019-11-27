<template>
  <div>
     <mt-header :title="name">
      <router-link to="/lianxiren" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header> 
    <div id="a">
      <div id="ig">
        <img src="../../assets/img/girllog.png" alt="头像图片" v-if="sex=='女'">
        <img src="../../assets/img/boylog.png" alt="头像图片" v-else-if="sex=='男'">
      </div>
      <div id="zhuang">     
        <span>{{name}}</span>
      </div>
    </div> 
      <mt-cell :title="sex" readOnly>
        <img slot="icon" src="../../assets/img/about.png" width="24" height="24" />
      </mt-cell>
      <mt-cell :title="phoneNum" readOnly>
        <img slot="icon" src="../../assets/img/about.png" width="24" height="24" />
      </mt-cell>
      <mt-button @click.native="sendMsg" type='default' :style="{width:this.wid-40+'px'}" id="sendM">发消息</mt-button>
      <mt-button @click.native="delFr" type='danger' :style="{width:this.wid-40+'px'}" id="deleF">删除好友</mt-button>
  </div>
</template>

<script>
// import xiugai from './gongneng/xiugai'
export default {
  name: "log",
  data() {
    return {
      wid:0,//宽度
      name:'',//姓名
      sex:'',//性别
      address:'',//地址
      phoneNum:''//手机号码
    }
  },
  methods: {
    sendMsg(){
        this.$router.push({path:'/chatting',id:this.name})
    },
    delFr(){
        this.$messagebox({
        title: "温馨提示",
        message: "你确定删除改好友吗",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(action => {
        if (action == "confirm") {
          //确定删除执行的事情
          var _this=this;
          _this.$axios.get('/api/user/deletFr',{
            params:{
              phone:_this.$store.state.login.phoneNum,//自己的电话,
              phoneNum:_this.phoneNum//别人的电话号码
            }
          }).then(res=>{
            _this.$toast({
              message:res.data.message,
              duration:1000
            })
            _this.$router.push({path:'/lianxiren/lianxirenh'})
          }).catch(err=>{
            _this.$toast({
              message:'err:'+err,
              duration:1000
            })
          })
        } else {
          _this.$toast({
              message:'取消',
              duration:1000
            })
        }
      });
    }
  },
  mounted() {  
    var _this=this;
    this.name=this.$route.query.name;
    this.sex=this.$route.query.sex;
    this.phoneNum=String(this.$route.query.phoneNum);//别人的电话
    this.wid=document.documentElement.clientWidth || document.clientWidth;
    _this.$store.state.shebei.wid=document.documentElement.clientWidth || document.clientWidth;
    _this.$store.state.shebei.hei=document.documentElement.clientHeight || document.clientHeight;
  },
   beforeRouteLeave(to, from, next) {
      if(from.path=='/mycenter'&&to.path=='/chatting'){
        sessionStorage.setItem('pat','/lianxiren/lianxirenh')
      }
      next();
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
#sendM,#deleF{
  margin:6px auto;
  display: table;
  text-align: center
}
</style>