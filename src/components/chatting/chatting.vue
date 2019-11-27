<template>
  <div id="wa">
    <!--文字-->
    <section class="chatlist" :class="showSelBox>0?'chatlist-bottom-collapse':'chatlist-bottom'">
            <mt-loadmore :top-method="loadTop" top-pull-text="加载更多" top-drop-text="释放加载" ref="loadmore">
                <ul>
                    <template v-for="item in records">
                      <!--自己说的话-->
                        <li class="chat-mine" v-show="item.type==1" :key="item.time">
                            <div class="chat-user"><img src="../../assets/logo.png"></div>
                            <div class="time"><cite><i>{{item.time}}</i>{{item.name}}</cite></div>
                            <div class="chat-text" v-html="item.content"></div>
                        </li>
                      <!--别人说的话-->
                        <!-- <li v-show="item.type==2" :key="item.time">
                            <div class="chat-user"><img src="../../assets/logo.png"></div>
                            <div class="time"><cite>{{item.name}}<i>{{item.time}}</i></cite></div>
                            <div class="chat-text" v-html="replaceFace(item.content)"></div>
                        </li> -->
                    </template>
                </ul>
            </mt-loadmore>
        </section>

        <!--输入的聊天信息-->
        <section class="foot">
            <!--输入框-->
            <mt-field id="txtContent" placeholder="请输入消息" class="con" v-model="content"></mt-field>
            <!--表情的按钮-->
            <!-- <span class="btn-face" v-on:click="showSelBox=showSelBox==1?0:1">
              <i class="fa fa-smile-o" aria-hidden="true"></i> 
            </span> -->
            <!--展开栏-->
            <!-- <span class="btn-plus" v-on:click="showSelBox=showSelBox==2?0:2">
              <i class="fa" aria-hidden="true" :class="showSelBox==2?'fa-minus-circle':'fa-plus-circle'"></i>
            </span> -->
            <!--发送消息-->
            <span class="btn btn-send" v-on:click="sendMsg">发送</span>
            <!-- <section class="selbox" :class="showSelBox>0?'show':'hide'">
              表情包的盒子
                <section v-show="showSelBox==1" class="face-box">
                    <mt-swipe :auto="0" :continuous="false">
                        <mt-swipe-item v-for="n in Math.ceil(EXPS.length/18) " :key='n'>
                            <li v-for="(item, index) in getEXP(n,18)" :key='index'>
                                <img :src="require('../../../static/emotion/'+item.file)" :data="item.code" v-on:click="content+=item.code">
                            </li>
                        </mt-swipe-item>
                    </mt-swipe>
                </section>
                其他功能
                <div v-show="showSelBox==2">{{selOther}}</div>
            </section> -->
        </section>
  </div>
</template>

<script>
import util from "./com";//修改日期的格式
import { Toast } from "mint-ui";
export default {
  name: "chatting",
  data() {
    return {
      showSelBox: 0, // 0隐藏 1显示表情 2显示其他
      selFace: "表情",
      selOther: "其他功能",
      content: "",
      topStatus: "",
      wa:"",
      //聊天记录
      records: [
        {
          type: 1,
          time: util.formatDate.format(new Date(), "yyyy-MM-dd hh:mm:ss"),
          name: "游客",
          content: "你好！"
        }
        // {
        //   type: 2,
        //   time: util.formatDate.format(new Date(), "yyyy-MM-dd hh:mm:ss"),
        //   name: "客户MM",
        //   content:
        //     '这里是<a target="_blank" href="https://github.com/taylorchen709/vue-chat">源码</a>'
        // }
      ],
     
    };
  },

  methods:{
    //发送消息
    sendMsg: function() {
      var _this = this;
      if (this.content == "") {
        Toast("请输入消息");
        return;
      }
      this.records.push({
        type: 1,
        time: util.formatDate.format(new Date(), "yyyy-MM-dd hh:mm:ss"),
        name: "游客",
        content: this.content
      });
    //   setTimeout(function() {
    //     _this.records.push({
    //       type: 2,
    //       time: util.formatDate.format(new Date(), "yyyy-MM-dd hh:mm:ss"),
    //       name: "客服MM",
    //       content: "你好！"
    //     });
    //   }, 1000);
      this.content = "";
      this.scrollToBottom();
      this.focusTxtContent();//聚焦输入框
    },
    //聚焦输入框
    focusTxtContent: function() {
      document.querySelector("#txtContent input").focus();
    },
    //滚动条滚动到底部
    scrollToBottom: function() {
      setTimeout(function() {
        var chatlist = document.getElementsByClassName("chatlist")[0];
        chatlist.scrollTop = chatlist.scrollHeight;
      }, 100);
    },
    loadTop(id) {
      var _this = this;
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded(id);
      }, 1500);
    }
  },
  mounted: function() {
    this.scrollToBottom();
    this.focusTxtContent(); 
    this.wa=document.documentElement.clientWidth || document.clientWidth  
  }
};
</script>

<!-- Add "scoped" {attribute to limit CSS to this component only -->
<style scoped>
.foot >>> .mint-cell-wrapper{
  border-radius: 10px;
  border:1px solid gray;

}
.chatlist {
  position: absolute;
  top: 40px;
  bottom: 48px;
  left: 0px;
  right: 0px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 10px;
}

.chatlist-bottom {
  bottom: 48px;
  background-color:lightcyan
}

.chatlist-bottom-collapse {
  bottom: 198px;
}

.chatlist ul {
  min-height: 300px;
}

.chatlist ul .chat-mine {
  text-align: right;
  padding-left: 0;
  padding-right: 60px;
}

.chatlist ul li {
  position: relative;
  /*font-size: 0;*/
  margin-bottom: 10px;
  padding-left: 60px;
  min-height: 68px;
}

.chat-mine .chat-user {
  left: auto;
  right: 3px;
}
.foot {
  z-index: 100;
}
.chat-user {
  position: absolute;
  left: 3px;
}

.chat-text,
.chat-user {
  display: inline-block;
  vertical-align: top;
  /*font-size: 14px;*/
}

.chat-user img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.time {
  width: 100%;
}

cite {
  left: auto;
  right: 60px;
  text-align: right;
}

cite {
  font-style: normal;
  line-height: 24px;
  font-size: 12px;
  white-space: nowrap;
  color: #999;
  text-align: left;
}

cite i {
  font-style: normal;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 12px;
}

.chat-mine .chat-text {
  margin-left: 0;
  text-align: left;
  background-color: #33df83;
  color: #fff;
}

.chat-text {
  position: relative;
  line-height: 22px;
  /*margin-top: 25px;*/
  padding: 10px 15px;
  background-color: #eee;
  border-radius: 3px;
  color: #333;
  word-break: break-all;
  max-width: 462px\9;
}

.chat-text,
.chat-user {
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
}

.chat-text img {
  max-width: 100%;
  vertical-align: middle;
}

.chat-user {
  position: absolute;
  left: 3px;
}

.chat-text:after {
  content: "";
  position: absolute;
  left: -10px;
  top: 15px;
  width: 0;
  height: 0;
  border-style: solid dashed dashed;
  border-color: #eee transparent transparent;
  overflow: hidden;
  border-width: 10px;
}

.chat-mine .chat-text:after {
  left: auto;
  right: -10px;
  border-top-color: #33df83;
}

.foot {
  width: 100%;
  min-height: 48px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #f8f8f8;
}

.foot .con {
  position: absolute;
  left: 10px;
  right: 60px;
}
.btn {
  display: inline-block;
  vertical-align: top;
  font-size: 20px;
  line-height: 32px;
  margin-left: 5px;
  padding: 3px 6px;
  background-color: #33df83;
  color: #fff;
  border-radius: 3px;
}

.btn-send {
  position: absolute;
  right: 3px;
  top: 5px;
  border-radius: 5px;
}
.mt-swipe-item,li{
  list-style: none
}
</style>