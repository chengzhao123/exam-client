<template>
  <div>
    <!-- <mt-header title="联系人" :style="{width:wa+'px'}" id="ma"></mt-header>
    
    <span id="sp">
      <mt-field type="text" v-model="ss" placeholder="查询" id="cx" :style="{width:wa-60+'px'}"></mt-field>
      <a id="bt" @click="sousuo">搜索</a>
    </span> -->
    <mt-index-list :style="{height:ha-175+'px',width:wa+'px',marginTop:120+'px',marginBottom:55+'px'}">
        <mt-index-section v-for="(lett,index) in filterData" :key="index" v-show="lett.list.length!=0" :index="lett.index">
        <!-- <mt-cell v-for="(item,k) in lett.list" :key='k' :title="lett.list[k].name">{{lett.list[k].phone}}</mt-cell> --> 
        
        <div v-for="(item,k) in lett.list" :key='k' class="item" @click="com(lett.list[k].name)" :style="{width:wa-18+'px'}">
         <!-- <mt-cell> -->
          <div class="img" @click.stop='img(lett.list[k].name,lett.list[k].sex,lett.list[k].phone)'>
            <!-- <p>{{lett.list[k].sex}}</p> -->
            <img src="../../assets/img/boylog.png" alt="" height="36px" v-if="lett.list[k].sex=='男'">
            <img src="../../assets/img/girllog.png" alt="" height="36px" v-else>
          </div>
          <div class="text">
            <h4 class="name">{{lett.list[k].name}}</h4>
            <p class="phone">{{lett.list[k].phone}}</p>
          </div>
        <!-- </mt-cell> -->
        </div>
        
      </mt-index-section>
    </mt-index-list> 
  </div>
</template>

<script>
import py from './vuepy';
export default {
  data() {
    return {
      ct: "",
      ss: "",
      wa: "",
      ha:"",
      friends:"",
      len:0,//判断朋友的个数是否发生了变化
      ke:"",
      contactlist:[
        {index:'a',list:[]},
        {index:'b',list:[]},
        {index:'c',list:[]},
        {index:'d',list:[]},
        {index:'e',list:[]},
        {index:'f',list:[]},
        {index:'g',list:[]},
        {index:'h',list:[]},
        {index:'i',list:[]},
        {index:'j',list:[]},
        {index:'k',list:[]},
        {index:'l',list:[]},
        {index:'m',list:[]},
        {index:'n',list:[]},
        {index:'o',list:[]},
        {index:'p',list:[]},
        {index:'q',list:[]},
        {index:'r',list:[]},
        {index:'s',list:[]},
        {index:'t',list:[]},
        {index:'u',list:[]},
        {index:'v',list:[]},
        {index:'w',list:[]},
        {index:'x',list:[]},
        {index:'y',list:[]},
        {index:'z',list:[]},
        {index:'#',list:[]}
      ]
    };
  },
  methods: {
     com(index){
      this.$router.push({path:'/chatting',query:{ id:index }})
    },
    img(n,s,p){
      // this.$toast({
      //   message:n,
      //   duration:1000
      // })
      //进入他的个人中心页面
      this.$router.push({path:'/mycenter',query:{name:n,sex:s,phoneNum:p}})
    }
  },
  watch: {
  },
  computed: {
    //过滤
    filterData:function(){
      var cList = this.contactlist;
      return cList.filter(function(item){
        return item.list.length!=0
      })
    }
  },
  mounted() {
    var _this=this;
    this.wa = document.documentElement.clientWidth || document.clientWidth;
    this.ha = document.documentElement.clientHeight|| document.clientHeight;
    if(_this.$store.state.login.login==true){
      this.$axios.get('/api/user/friends',{
        params:{
          phone:_this.$store.state.login.phoneNum
        }
      }).then(res=>{
        if(res.data.code==2){
          _this.$toast({
            message:res.data.message,
            duration:1000
          })
        }else{ 
          _this.friends=res.data.message;
          _this.len=_this.friends.length;
          var a=_this.contactlist.length;
          var b=0;
          var Num=/[0-9]/;//匹配数字
            for(var k=0; k<_this.friends.length;){
                for(var i=0;i<_this.contactlist.length;i++){
                  if(_this.contactlist[i].index==_this.friends[k].fir){
                    _this.contactlist[i].list.push({name:_this.friends[k].name,phone:_this.friends[k].phone,sex:_this.friends[k].sex});
                    b++;
                    k++;
                  }else if(Num.test(_this.friends[k].fir)){
                    _this.contactlist[a-1].list.push({name:_this.friends[k].name,phone:_this.friends[k].phone,sex:_this.friends[k].sex})
                     b++;
                     k++;
                  }
                 if(k==_this.friends.length){
                   break;
                 }
                } 
                if(b==_this.friends.length){
                  break;
                }
                // console.log("b2:"+b+',frined:'+_this.friends.length)
            }
          _this.$store.state.friend.key=_this.contactlist;
        }
        document.getElementsByClassName('mint-indexlist-content')[0].style.height=_this.ha-175+'px';
      }).catch(err=>{
        this.$toast({
          message:'err:'+err,
          duration:1000
        })
      })
    }else{
      _this.contactlist=[]
    }
  }
};
</script>
<style scoped>

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
#b {
  height: 52px;
  background-color: white;
}
#cx {
  margin: 6px 0px 6px 6px;
  width: 85%;
  border: 1px solid gray;
  border-radius: 40px;
  min-height: 20px;
  
}
#bt {
  width: 45px;
  color: lightseagreen;
  height: 28px;
  position: absolute;
  top: 8px;
  right: -45px;
  text-align: center;
  border-radius: 5px;
}
.mint-indexsection >>> .mint-indexsection-index{
  padding: 3px 2px
}
.mint-indexsection >>> .mint-cell{
  min-height:36px;
}
.mint-indexlist >>> .mint-indexlist-navitem {
  padding:0px 2px 0px 0px
}
.mint-indexlist >>> .mint-cell{
  /* border-top: 1px solid rgba(100,100,100,0.1); */
  border-bottom: 1px solid rgba(100,100,100,0.1);
}
 .mint-indexlist >>> .mint-indexlist-content{
   overflow: scroll;
   -webkit-overflow-scrolling: touch;
 }
 .mint-indexlist >>> .mint-indexlist-nav{
   background-color: transparent;
   border:none
 }
 .mint-indexsection >>> .mint-indexsection-index{
   color:lightgray
 }
</style>
