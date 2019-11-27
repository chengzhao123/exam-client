<template>
  <div>
      <mt-cell-swipe
       class="ct"
        v-for="(lett,index) in arr" 
        :key="index"
       @click.native="jinru(lett.name)"
         :right="[
    {content: '置顶',style: { background: 'lightgray', color: '#fff'},handler: () => tot(index)},
    {content: '删除',style: { background: 'red', color: '#fff' },handler: () => del(index)}
]"
        >
        <div class="item">
          <div class="img">
            <img src="../../assets/img/boylog.png" alt="" height="36px" v-if="lett.sex=='男'">
            <img src="../../assets/img/girllog.png" alt="" height="36px" v-else>
          </div>
          <div class="text">
            <h5 class="name">{{lett.name}}</h5>
            <p class="phone">发送的内容</p>
          </div>
        </div>
      </mt-cell-swipe>
  </div>
</template>

<script>
export default {
  name: "shouyecontent",
  data() {
    return {
      friend:"",
      arr:"",
      arr2:"",
      shuaxin:false
    };
  },
  methods: {
    //删除
    del(d) {
      this.$toast({
        message: this.arr[d].name+ "已经删除",
        position: "bottom",
        duration: 2000
      });
      this.arr.splice(d,1);
      this.$store.state.friend.shouy=this.arr;
    },
    //置顶
    tot(d) {
      this.$toast({
        message: this.arr[d].name + "已经置顶",
        position: "bottom",
        duration: 2000
      });
      var temp=this.arr[d];//拿到要置顶的
      this.arr.splice(d,1);//删除这个要置顶的
      //把这前保存的要置顶的unshift(unshift:添加到数组的最前面)到数组中去
      this.arr.unshift(temp);
      // document.getElementsByClassName('mint-cell-wrapper')[0].style.backgroundColor='rgba(100,100,100,0.3)';
      //在数组中添加置顶的标识
      this.$store.state.friend.shouy=this.arr;
    },
    jinru(index){
      this.$router.push({path:'/chatting',query:{ id:index }})
    },
    loadTop() {
      //刷新
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded();
      }, 2000);
    }
  },
  watch: {
      arr(n){
        this.arr=n
      }
  },
  mounted() {
      var a=this.$store.state.friend.key;//固定的朋友添加顺序
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
        this.arr2=cc; //联系人的排列顺序
        var ind=0;
        if(this.$store.state.friend.lianxiren!=""&&this.arr2!=""&&this.arr2.length==this.$store.state.friend.lianxiren.length){
          for(var w=0;w<this.arr2.length;w++){
            if(this.arr2[w].phone==this.$store.state.friend.lianxiren[w].phone){
              ind++;
            }
            if(w==this.arr2.length){
              if(ind==this.arr2.length){
                this.shuaxin=false
              }else{
                this.shuaxin=true
              }
            }
          }
        }
      if(this.$store.state.friend.shouy==""||this.arr2==""&&this.shuaxin==true){
        this.$route.meta.keepAlive=false;
        if(this.$store.state.login.login==true){
        //获取cc用户列表
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
        this.arr=cc; 
        this.$store.state.friend.shouy=cc;
        }else{
        this.arr=[]; 
        }
      }else{
          this.arr=this.$store.state.friend.shouy;
          var a=this.$store.state.friend.key;
          var b=[];
          for(var i=0;i<a.length;i++){
              if(a[i].list.length!=0){
              b.push(a[i])
              }
          }
          var cc=[];
          for(var j=0;j<b.length;j++){
              for(var k=0;k<b[j].list.length;k++){
              cc.push(b[j].list[k])
              }
          }
          this.$store.state.friend.lianxiren=cc;
      }
    
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item{
  position: absolute;
  left: 0px;
}
.item .img{
  float: left;
  position: absolute;
  left:5px;
}
.item .text{
  margin-left: 60px;
  margin-top: 5px
}
.item .text h5{
  color: grey;
  margin-bottom: 5px
}
.item .text p{
  font-size: 12px;
}
</style>
