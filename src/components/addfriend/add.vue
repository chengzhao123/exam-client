<template>
  <div>
    <mt-header :title="title">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-field
      type="text"
      autofocus
      v-model="ct"
      placeholder="输入手机号"
      id="cx"
      :style="{width:this.wa-55+'px'}"
      @keypress.native="searchBtn"
    ></mt-field>
    <router-link to="/" slot="left" tag='div'>
      <span id="adda">取消</span>
    </router-link>
    <!-- <mt-search v-model="ct" cancel-text="取消" autofocus placeholder="输入手机号" @keypress.native="searchBtn" :style="{height:this.heigh-40+'px'}"> -->
    <!-- <mt-cell
    v-for="item in result"
    v-model="ct"
    :key='item.id'
    :title="item.title"
    :value="item.value"
    @click.native="toa()"
    >
    </mt-cell>-->
    <div v-for="(item,k) in result" :key="k" class="item" @click="toa">
      <!-- <mt-cell> -->
      <div class="img" @click.stop="img(item[0])">
        <!-- <p>{{lett.list[k].sex}}</p> -->
        <img src="../../assets/img/boylog.png" alt height="36px" v-if="item[1]=='男'" />
        <img src="../../assets/img/girllog.png" alt height="36px" v-else />
      </div>
      <div class="text">
        <h4 class="name">{{item[0]}}</h4>
        <p class="phone">{{item[2]}}</p>
      </div>
      <!-- </mt-cell> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "add",
  data() {
    return {
      ct: "",
      wa: "",
      heigh: 0,
      autofocus: true,
      title: "添加联系人",
      result: []
    };
  },
  methods: {
    searchBtn(event) {
      var _this = this;
      if (event.keyCode == 13) {
        //如果按的是enter键 13是enter
        event.preventDefault(); //禁止默认事件（默认是换行）
        // _this.toa();
        _this.xians();
      }
    },
    xians() {
      var _this = this;
      _this.result = [];
      var tel = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/; //手机号验证
      if (_this.$store.state.login.login == true) {
        if (tel.test(_this.ct)) {
          sessionStorage.setItem('sendFr',_this.ct);
          _this.$axios
            .get("/api/user/show", {
              params: {
                phoneNum: _this.ct, //把对方电话传过去
                phone: _this.$store.state.login.phoneNum //自己的电话号码
              }
            })
            .then(res => {
              if (res.data.code == 0) {
                //账户不存在
                this.$toast({
                  message: res.data.message,
                  duration: 1000
                });
              } else if (res.data.code == 1) {
                //账户存在
                _this.result.push(res.data.message);
              }
            })
            .catch(err => {
              this.$toast({
                message: "err:" + err,
                duration: 1000
              });
            });
        } else {
          this.$toast({
            message: "手机号格式不对",
            duration: 1000
          });
        }
        _this.ct = "";
      } else {
        this.$toast({
          message: "你还没有登录",
          duration: 1000
        });
        _this.ct = "";
      }
    },
    toa() {
      var _this = this;
      var ph=sessionStorage.getItem('sendFr')
      _this.$axios
        .get("/api/user/sendFriend", {
          params: {
            phoneNum:ph, //把对方电话传过去
            phone: _this.$store.state.login.phoneNum //自己的电话号码
          }
        })
        .then(res => {
            //发送好友申请成功 || 你已经添加了该好友
            this.$toast({
              message: res.data.message,
              duration: 1000
            });
        })
        .catch(err => {
          this.$toast({
            message: "err:" + err,
            duration: 1000
          });
        });
    },
    img(e) {
      this.$toast({
        message: e,
        duration: 1000
      });
    }
  },
  mounted() {
    this.heigh =
      document.documentElement.clientHeight || document.body.clientHeight;
    this.wa = document.documentElement.clientWidth || document.body.clientWidth;
  }
};
</script>
<style scoped>
.mint-search {
  z-index: 10;
  width: 100%;
  background-color: antiquewhite;
  position: absolute;
}
div .mint-cell-title {
  position: absolute;
  top: 20px;
}
.mint-search >>> .mint-searchbar {
  padding: 4px 10px;
}
.mint-cell {
  min-height: 30px;
}
#cx {
  margin: 6px 0px 6px 6px;
  border: 1px solid gray;
  border-radius: 40px;
  min-height: 20px;
}
#adda {
  position: absolute;
  right: 10px;
  top: 50px;
}
.item {
  position: relative;
  padding-bottom: 5px;
  padding-top: 5px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.item .img {
  float: left;
  position: absolute;
  left: 5px;
}
.item .text {
  margin-left: 70px;
}
.item .text h4 {
  color: grey;
}
.item .text p {
  font-size: 12px;
}
</style>