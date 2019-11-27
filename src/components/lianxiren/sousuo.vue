<template>
  <div>
    <mt-header :title="title">
      <router-link to="/lianxiren/lianxirenh" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
     <mt-field type="text" v-model="ct" placeholder="查询" id="cx" :style="{width:this.wa-50+'px'}" @keypress.native="searchBtn"></mt-field>
     <router-link to="/lianxiren/lianxirenh" slot="left">
     <span id="adda">取消</span>
     </router-link>
      <!-- <mt-cell
    v-for="item in result"
    v-model="ct"
    :key='item.id'
    :title="item.title"
    :value="item.value"
    @click.native="toa()"
    >
  </mt-cell> -->
  <div v-for="(item,k) in result" :key='k' class="item" @click="com(item.name)">
         <!-- <mt-cell> -->
          <div class="img" @click.stop='img(item.name)'>
            <!-- <p>{{lett.list[k].sex}}</p> -->
            <img src="../../assets/img/boylog.png" alt="" height="36px" v-if="item.sex=='男'">
            <img src="../../assets/img/girllog.png" alt="" height="36px" v-else>
          </div>
          <div class="text">
            <h4 class="name">{{item.name}}</h4>
            <p class="phone">{{item.phone}}</p>
          </div>
        <!-- </mt-cell> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "sousuo",
  data() {
    return {
      ct: "",
      heigh:0,
      wa:"",
      autofocus:true,
      title:'查找联系人',
      result:[]
    }
  },
  methods: {
    searchBtn(event) {
      var _this=this;
      if (event.keyCode == 13) {
        //如果按的是enter键 13是enter
        event.preventDefault(); //禁止默认事件（默认是换行）
          _this.toa();
      }
    },
    toa(){
      var _this=this;
      this.result=[]
       var tel=/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;//手机号验证
       if(_this.$store.state.login.login==true){
              if(tel.test(_this.ct)){
                   var a=this.$store.state.friend.key;//朋友发生变化的新列表
                    var b=[];
                    for(var i=0;i<a.length;i++){
                        if(a[i].list.length!=0){
                        b.push(a[i])
                        }
                    }
                    var cc=[];
                    for(var j=0;j<b.length;j++){
                        for(var k=0;k<b[j].list.length;k++){
                        cc.push(b[j].list[k]);
                        }
                    }
                var w=0;
                for(var i=0;i<cc.length;i++){
                    if(_this.ct==cc[i].phone){
                        _this.result.push(cc[i])
                        break;
                    }else{
                        w++
                        if(w==cc.length){
                            this.$toast({
                                message:'没有该好友',
                                duration:3000
                            })
                            break;
                        }
                    }
                }
              }else{
                  this.$toast({
                    message:'格式出错',
                    duration:3000
                 })
              }
          }else{
            this.$toast({
                  message:'你还没有登录',
                  duration:3000
            })
          }
          _this.ct=''
       },
      com(index){
        this.$router.push({path:'/chatting',query:{ id:index }})
      },
      img(e){
        this.$toast({
          message:e,
          duration:1000
        })
      }
  },
  mounted() {
      this.wa = document.documentElement.clientWidth || document.clientWidth;
      this.heigh=document.documentElement.clientHeight || document.body.clientHeight;
  },
  watch: {
      wa(n){
          n=document.documentElement.clientWidth || document.clientWidth;
      }
  },
  beforeRouteLeave(to, from, next) {
      if(from.path=='/sousuo'&&to.path=='/chatting'){
        sessionStorage.setItem('pat','/lianxiren/lianxirenh')
      }
      next();
    }
};
</script>
<style scoped>
#cx {
  margin: 6px 0px 6px 6px;
  width: 85%;
  border: 1px solid gray;
  border-radius: 40px;
  min-height: 20px;
}
#adda{
    position: absolute;
    right:10px;
    top:50px;
}
.item{
  position: relative;
  padding-bottom: 5px;
  padding-top: 5px;
  border-bottom: 1px solid rgba(100,100,100,0.1)
}
.item .img{
  float: left;
  position: absolute;
  left:5px;
}
.item .text{
  margin-left: 70px;
}
.item .text h4{
  color: grey
}
.item .text p{
  font-size: 12px;
}
</style>