<template>
<div id="a" :style='{height:b+"px"}'>
    <mt-header title="忘记密码" class="ba">
      <router-link to="/golog" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div id="logi">
        <div id="top">
            <img src="../../assets/img/mine.png" alt=""><span>LRJ</span>
        </div>
        <div id="cent">
            <!-- <div id="mmalla">
                <mt-field type="text" v-model="na" placeholder="输入用户名"></mt-field>
            </div>  -->
            <div id="zhall">
                <mt-field type="number" v-model="phoneNum" placeholder="输入手机号"></mt-field>
            </div>
            <h4>密保问题:<span>你的生日是多少</span></h4>
            <h4 :style="{marginTop:20+'px'}">密保答案:</h4>
            <div id="mmalla">
                <mt-field type="text" v-model="mibaoda" placeholder="例如 1949.01.01"></mt-field>
            </div> 
      <mt-button @click.native="sure" type="primary" id="sure">确认</mt-button>

        </div>
       
    </div>

</div>
</template>

<script>
import $ from 'jquery'
export default {
    name:'gofotget',
    data() {
        return {
            b:'',
            na:'',
            phoneNum:'',
            mibaoda:''
        
        }
    },
    methods: {
        sure(){
            // this.$router.push({path:'/golog'})
            var _this=this;
            var data={
                phoneNum:_this.phoneNum,
                mibao:_this.mibaoda
            }
            var tel=/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;//手机号验证
            if(tel.test(_this.phoneNum)){
                _this.$axios.post('/api/user/goforget',_this.$qs.stringify(data))
                .then(function(res){
                    if(res.data.code==0){//没注册
                        // console.log(res.data.message)
                        _this.$toast({
                            message:res.data.message,
                            duration:1000
                        })
                    }else if(res.data.code==2){//成功
                        // console.log(res.data.message)
                        _this.$toast({
                            message:'密码是'+res.data.message,
                            duration:1000
                        })
                        // this.$router.push('/golog')
                    } else if(res.data.code==1){//密保错误
                        // console.log(res.data.message)
                        _this.$toast({
                            message:'密保答案错误',
                            duration:1000
                        })
                        // this.$router.push('/golog')
                    }
                    _this.phoneNum=''
                })
                .catch(function(err){
                    // console.log('err'+err)
                    _this.$toast({
                        message:'err'+err,
                        duration:1000
                    })
                })
            }else{
                // console.log('电话号码格式有问题')
                _this.$toast({
                    message:'电话号码格式有问题',
                    duration:1000
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
#zhall,#mmalla,#mmallb{
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