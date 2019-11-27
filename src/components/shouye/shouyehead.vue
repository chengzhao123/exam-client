<template>
  <div class="hello">
    <mt-header title="消息">
      <mt-button  slot="right" @click.native="ad">
        <img src="../../assets/img/jia.png" class="tupian">
      </mt-button>
    </mt-header>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" class="b" position="right" >
      <ul class="a">
        <li @click='cr'>加好友/群</li>
        <li @click='jia'>创建群聊</li>
      </ul>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: "shouyehead",
  data() {
    return {
      popupVisible: false
    };
  },
  methods: {
    ad() {
      this.popupVisible = true;
    },
    cr(){
      this.$router.push({path:'/add'})
    },
    jia(){
      this.$toast({
        message:'创建群聊失败',
        duration:1000      
      })
    }
  },
  mounted() {
    this.popupVisible = false;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.a{
  list-style: none;
  width:75px;
}
.a li{
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  font-family: "微软雅黑";
  margin: 5px;
  text-align: left
}
.b{
  position:fixed;
  top:80px;
  right: 3px;
  border-radius: 4px;
}
.b::before{
  display: inline-block;
    width: 0;
    height: 0;
    border: solid transparent;
    border-width: 8px;
    border-bottom-color: #fff;
    content: "";
    position: absolute;
    top: -16px;
    right: 10px;
}
.tupian{
  width:18px;
  height:18px;
  right: 10px;
}
</style>
