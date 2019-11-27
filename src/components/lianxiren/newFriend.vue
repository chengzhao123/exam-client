<template>
  <div>
    <mt-header :title="title" id="hd" :style='{width:wa+"px"}'>
      <router-link to="/lianxiren/lianxirenh" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div id="ba" :style="{width:wa+'px',height:heigh-40+'px'}">
        <div v-for="(item,k) in result" :key='k' class="item">
            <!-- <mt-cell> -->
            <div class="img" @click.stop='img(item.name)'>
                <!-- <p>{{lett.list[k].sex}}</p> -->
                <img src="../../assets/img/boylog.png" alt="" height="36px" v-if="item.sex=='男'">
                <img src="../../assets/img/girllog.png" alt="" height="36px" v-else>
            </div>
            <!--拒绝还是接受-->
            <div class='btn'>
                <span><mt-button size='small' type="default" id="reject" @click.native="reject(item.phone)">拒绝</mt-button></span>
                <span><mt-button size='small' type="default" id="add" @click.native="agree(item.phone)">添加</mt-button></span>
            </div>
            <!--名字和电话-->
            <div class="text">
                <h4 class="name">{{item.name}}</h4>
                <p class="phone">{{item.phone}}</p>
            </div>
            <!-- </mt-cell> -->
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sousuo",
  data() {
    return {
      wa:0,
      heigh:0,
      autofocus:true,
      title:'新朋友',
      result:[],//好友发送的申请
      rejec:[]//好友拒绝的申请
    }
  },
  methods: {
      img(e){
          this.$toast({
              message:e,
              duration:1000
          })
      },
      reject(e){
        var _this=this;
        _this.$axios.get('/api/user/reject',{
            params:{
                phone:_this.$store.state.login.phoneNum,//自己的电话
                phoneNum:e//别人的电话
            }
        }).then(res=>{
            _this.$toast({
                message:res.data.message,
                duration:1000
            })
        }).catch(err=>{
            _this.$toast({
                message:'err:'+err,
                duration:1000
            })
        })
      },
      agree(e){
        var _this=this;
        _this.$axios.get('/api/user/add',{
            params:{
                phone:_this.$store.state.login.phoneNum,//自己的电话
                phoneNum:e//别人的电话
            }
        }).then(res=>{
            _this.$toast({
                message:res.data.message,
                duration:1000
            })
        }).catch(err=>{
            _this.$toast({
                message:'err:'+err,
                duration:1000
            })
        })
      }
  },
  mounted() {
      this.heigh=document.documentElement.clientHeight || document.body.clientHeight;
      this.wa=document.documentElement.clientWidth || document.body.clientWidth;
      this.result=JSON.parse(sessionStorage.getItem('getSendFr'))//好友发送的申请
      this.rejec=JSON.parse(sessionStorage.getItem('getRejeFr'))//好友拒绝的申请
      // console.log(this.result+";"+this.rejec)
  }
};
</script>
<style scoped>
#hd{
    position: fixed;
    top:0px;
    z-index: 10
}
#ba{
    position: absolute;;
    top: 40px;
    overflow: scroll
}
.item{
  position: relative;
  padding-bottom: 5px;
  padding-top: 5px;
  height:38px;
  border-bottom: 1px solid rgba(100,100,100,0.1)
}
.item .img{
  float: left;
  position: absolute;
  left:5px;
}
.item .text{
  margin-left: 70px;
  float: left;
}
.item .text h4{
  color: grey
}
.item .text p{
  font-size: 12px;
}
.btn{
    float: right;
}
#add,#reject{
    background-color: transparent;
    outline: none;
    box-shadow: none;
    margin-top: 3px;
}
</style>