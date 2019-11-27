<template>
  <div>
    <div class="page-loadmore-wrapper" :style="{ height:wrapperHeight + 'px' }">
      <mt-loadmore
        :top-method="loadTop"
        :auto-fill="false"
        ref="loadmore"
        id="a"
        :style="{ height:ha + 'px'}"
        top-pull-text="加载更多" 
        top-drop-text="释放加载"
      >
      <!-- <mt-cell-swipe
       class="ct"
        v-for="(lett,index) in arr" 
        :key="index"
       @click.native="jinru(lett.name)"
         :right="[
    {content: '置顶',style: { background: 'lightgray', color: '#fff'},handler: () => tot(a.id)},
    {content: '删除',style: { background: 'red', color: '#fff' },handler: () => del(a.id)}
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
      </mt-cell-swipe> -->
      <sy></sy>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import sy from "./shouyc";
export default {
  name: "shouyecontent",
  components:{
    sy
  },
  data() {
    return {
      all: [],
      wrapperHeight: 0,
      ha: 1000,
      friend:"",
      arr:""
    };
  },
  methods: {
    del(d) {
      // this.$toast({
      //   message: this.all[d].name + "已经删除",
      //   position: "bottom",
      //   duration: 3000
      // });
    },
    tot(d) {
      // this.$toast({
      //   message: this.all[d].name + "已经没有置顶",
      //   position: "bottom",
      //   duration: 3000
      // });
    },
    jinru(index){
      // console.log(e.index);
      this.$router.push({path:'chatting',query:{ id:index }})
    },
    loadTop() {
      //刷新
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded();
      }, 2000);
    }
  },
  mounted() {
    this.wrapperHeight = 20;
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    this.ha = h - 95; //减去页面底部固定高度height;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-cell-wrapper >>> .mint-cell-title{
  width:0;
}
.mint-loadmore{
  overflow:auto
}
</style>
