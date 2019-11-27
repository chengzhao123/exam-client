<template>
<div id="a" :style='{height:b+"px"}'>
    <mt-header title="注册" class="ba">
      <router-link to="/golog" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div id="logi">
        <div id="top">
            <img src="../../assets/img/mine.png" alt=""><span>LRJ</span>
        </div>
        <div id="cent">
            <div id="yhming">
                <mt-field type="text" v-model="username" placeholder="输入用户名"></mt-field>
            </div>
            <div id="zhall">
                <mt-field type="number" v-model="phoneNum" placeholder="输入手机号"></mt-field>
            </div>
            
            <div id="mmalla">
                <mt-field type="password" v-model="password1" placeholder="输入密码"></mt-field>
            </div> 
            <div id="mmallb">
                <mt-field type="password" v-model="password2" placeholder="再次输入密码"></mt-field>
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
            username:'',
            phoneNum:'',
            password1:'',
            password2:''
        }
    },
    methods: {
        sure(){
        var _this=this;
          var tel=/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;//手机号验证
            if($.trim(_this.username).length==0){
                _this.$toast({
                      message:'用户名不能为空',
                      duration:1000
                  })
            }else if($.trim(_this.password1).length==0){
                // console.log('密码不能为空')
                _this.$toast({
                      message:'密码不能为空',
                      duration:1000
                  })
            }else if(_this.password1!==_this.password2){
                // console.log('两次输入密码不一样')
                _this.$toast({
                      message:'两次输入密码不一样',
                      duration:1000
                  })
            }else if(tel.test(this.phoneNum)==false){
                // console.log('电话号码格式不对')
                _this.$toast({
                      message:'电话号码格式不对',
                      duration:1000
                  })
            }else{
                var data={
                    username:_this.username,
                    phoneNum:_this.phoneNum,
                    password:_this.password1
                }
                this.$axios.post('/api/user/gores',this.$qs.stringify(data))
                .then(res=>{
                    if(res.data.code==0){//已经注册
                        // console.log(res.data.message)
                        _this.$toast({
                            message:res.data.message,
                            duration:1000
                        })
                    }else if(res.data.code==1){//成功
                        // console.log(res.data.message)
                        _this.$toast({
                            message:res.data.message,
                            duration:1000
                        })
                        this.$store.state.login.phoneNum=_this.phoneNum
                        this.$store.state.login.password=_this.password1
                        this.$store.state.login.username=_this.username
                        _this.$router.push('/gomibao')
                    }else if(res.data.code==2){//失败
                        // console.log(res.data.message)
                        _this.$toast({
                            message:res.data.message,
                            duration:1000
                        })
                    }  
                    _this.phoneNum='';
                    _this.password1='';
                    _this.password2='';                
                })
                .catch(err=>{
                    // console.log(err+'注册失败')
                    _this.$toast({
                        message:err+',提交失败',
                        duration:1000
                    })
                    _this.phoneNum='';
                    _this.password1='';
                    _this.password2='';
                })
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
#zhall,#mmalla,#mmallb,#yhming{
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