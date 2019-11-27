<template>
  <div id="ba">
    <!--顶部-->
    <mt-header :title="title">
      <router-link :to="togo" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <!--文字-->
     <keep-alive>
     <chat></chat>
    </keep-alive>
  </div>
</template>

<script>
import chat from "../components/chatting/chatting";
export default {
  name: "cha",
  components: {
    chat
  },
  data() {
    return {
      title: "联系人",
      togo:"/"
      //聊天记录
    };
  },
  mounted() {
    var a = this.$route.query.id;
    this.title = a;
    this.togo=sessionStorage.getItem('pat')
  },
};
</script>
<style scoped>
/* #ba{ */
  /* position: absolute */
/* } */
</style>