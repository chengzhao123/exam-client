<template>
<div id="a" :style='{height:b+"px"}'>
    <mt-header title="密码保护" class="ba">
    </mt-header>
    <div id="logi">
        <div id="top">
            <img src="../../assets/img/mine.png" alt=""><span>LRJ</span>
        </div>
        <div id="cent">
            <h4>密保问题:<span>你的生日是多少</span></h4>
            <h4 :style="{marginTop:20+'px'}">密保答案:</h4>
            <div id="zhall">
                <mt-field type="text" v-model="mibaoda" placeholder="例如 1949.01.01"></mt-field>
            </div>
      <mt-button @click.native="sure" type="primary" id="sure">确认</mt-button>
      <!-- <div id="ft">
          <span>忘记密码</span><span>&nbsp&nbsp|&nbsp&nbsp</span><span @click="zhuce">用户注册</span>
      </div> -->

        </div>
       
    </div>

</div>
</template>

<script>
import $ from 'jquery'
export default {
    name:'gores',
    data() {
        return {
            b:'',
            mibaoda:''
        }
    },
    methods: {
        sure(){
            var _this=this;
            if($.trim(_this.mibaoda).length!=0){
                 this.$axios.get("/api/user/gomibao",{
                    params:{
                        phoneNum:_this.$store.state.login.phoneNum,
                        mibao:_this.mibaoda
                    }
                })      
                .then(res=>{
                    if(res.data.code==0){
                        _this.$toast({
                            message:res.data.message,
                            duration:1000
                        })
                    }else if(res.data.code==1){
                        _this.$toast({
                            message:res.data.message,
                            duration:1000
                        })
                         _this.$router.push('/golog')
                    }else if(res.data.code==2){
                         _this.$toast({
                            message:res.data.message,
                            duration:1000
                          })
                    }
                   
                })
                .catch(err=>{
                    _this.$toast({
                        message:'err:'+err,
                        duration:1000
                    })
                _this.mibao=''
                })
            }else {
                _this.$toast({
                    message:'密保答案不能为空',
                    duration:1000
                })
                _this.mibao=''
            }
        }
    },
    mounted() {
        this.b=document.documentElement.clientHeight || document.clientHeight
    }
}
</script>
<style scoped>
#a{
    width:100%;
    z-index: 4;
    background-color: white;
    position: absolute
}
#logi{
    width:100%;
    height:400px;
}
/*顶部 */
#top img{
    width:60px;
    height:60px;
}
#top {
    display: table;
    margin: 0px auto;
    margin-top: 50px
}
#top span{
    float: right;
    font-size: 50px;
}
/* 中间的登录*/
#cent{
    width: 80%;
    height:200px;
    display: table;
    margin: 10px auto
}
#zhall{
    width:100%;
    height:48px;
    border:1px solid lightgray;
    border-radius: 30px;
    margin-top: 6px
}
.mint-cell ,.mint-field ,.is-nolabel,.mint-cell-wrapper{
    background:none
}
 .mint-cell-wrapper{
    background-color:white;
}
/**底部 */
#sure{
    margin: 20px auto;
    display: table;
    border-radius: 50px;
}
/* #ft{
    margin: 10px auto;
    display: table
}
#ft span{
    font-size: 14px;
} */
</style>