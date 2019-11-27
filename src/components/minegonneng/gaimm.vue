<template>
<div id="a" :style='{height:b+"px"}'>
    <mt-header title="修改改密码" class="ba">
      <router-link to="/login" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div id="logi">
        <div id="top">
            <img src="../../assets/img/mine.png" alt=""><span>LRJ</span>
        </div>
        <div id="cent">
            <div id="zhall">
                <mt-field type="number" v-model="phoneNum" placeholder="输入手机号"></mt-field>
            </div>
            <div id="mmalla">
                <mt-field type="password" v-model="password1" placeholder="输入原密码"></mt-field>
            </div> 
            <div id="mmallb">
                <mt-field type="password" v-model="password2" placeholder="输入新密码"></mt-field>
            </div>    
            <div id="mmallc">
                <mt-field type="password" v-model="password3" placeholder="再次输入新密码"></mt-field>
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
            phoneNum:'',
            password1:'',
            password2:'',
            password3:''
        }
    },
    methods: {
        sure(){
            var _this=this;
            var tel=/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;//手机号验证
            if(_this.password2==''||_this.password3==''){
                // console.log('新密码不能为空')
                _this.$toast({
                    message:'新密码不能为空',
                    duration:1000
                })
                _this.phoneNum='';
                _this.password1='';
                _this.password2='';
                _this.password3='';
            }else if(_this.password2!=_this.password3){
                // console.log('两次密码不一致')
                _this.$toast({
                    message:'两次密码不一致',
                    duration:1000
                })
                _this.phoneNum='';
                _this.password1='';
                _this.password2='';
                _this.password3='';
            }else if(_this.password1!=_this.$store.state.login.password){
                // console.log('旧密码错误')
                _this.$toast({
                    message:'旧密码错误',
                    duration:1000
                })
                _this.phoneNum='';
                _this.password1='';
                _this.password2='';
                _this.password3='';
            }else if(_this.password1==_this.password3){
                // console.log('新旧密码一样')
                _this.$toast({
                    message:'新旧密码一样',
                    duration:1000
                })
                _this.phoneNum='';
                _this.password1='';
                _this.password2='';
                _this.password3='';
            }else if(tel.test(_this.phoneNum)){
                _this.$axios.get('/api/user/gaimm',{
                    params:{
                        phoneNum:_this.phoneNum,
                        password:_this.password2
                        }
                })
                .then(res=>{
                    if(res.data.code==0){
                        _this.$toast({
                            message:res.data.message,
                            duration:1000
                        })
                        // console.log(res.data.message)
                    }else if(res.data.code==1){
                        // console.log(res.data.message)
                        _this.$toast({
                            message:res.data.message,
                            duration:1000
                        })
                    }
                })
                .catch(err=>{
                    // console.log('err'+err)
                    _this.$toast({
                            message:'err'+err,
                            duration:1000
                        })
                })
            }else if(tel.test(_this.phoneNum)==false){
                console.log('手机号码格式不对')
                _this.$toast({
                    message:'手机号码格式不对',
                    duration:1000
                 })
                _this.phoneNum='';
                _this.password1='';
                _this.password2='';
                _this.password3='';
            }else if($.trim(_this.password1).length==0){
                _this.$toast({
                    message:'密码不能为空',
                    duration:1000
                })
                _this.phoneNum='';
                _this.password1='';
                _this.password2='';
                _this.password3='';
            }           
        }
    },
    mounted() {
       this.phoneNum=this.$store.state.login.phoneNum
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
#zhall,#mmalla,#mmallb,#mmallc{
    width:100%;
    height:48px;
    border:1px solid lightgray;
    border-radius: 30px;
    margin-bottom: 10px
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