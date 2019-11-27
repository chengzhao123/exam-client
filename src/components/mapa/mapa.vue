<template>
  <div>
    <div id="adc" :style="{height:this.heigh-105+'px'}"></div>
    <div id="container" :style="{display:'none'}"></div>
    <div id="zb">
      <li @click="btn(1)">周边超市</li>
      <li @click="btn(2)">周边娱乐</li>
      <li @click="btn(3)">周边医院</li>
    </div>
    <div id="dw" :style="{bottom:180+'px'}" @click="dw">
      <img src="../../assets/img/dingwei.png">
    </div>
    <div id="btm">
       <mt-field type="text" placeholder="搜索" id="cx" :style="{width:wa-12+'px'}" readonly @click.native="mapin"></mt-field>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: "mapa",
  data() {
    return {
      heigh: 0,//页面高度
      lng:0,//经度 100
      lat:0,//纬度 30
      wa:'',//页面宽度
      arriveCoor:[108.947025,34.2613255],//坐标点
      arrive:"",//位置信息
      le:0,
      markers:[]
    };
  },
  methods: {
    /**获取地图定位*/
    mapad(){
      var _this=this;
        var marker, map = new AMap.Map("adc", {
        resizeEnable: true,
        center:_this.arriveCoor,
        zoom: 15,
        animateEnable:true,
        showBuildingBlock:true,
        buildingAnimation:true
        });
        marker = new AMap.Marker({
            position:_this.arriveCoor,
            offset: new AMap.Pixel(-13, -30),
            icon: new AMap.Icon({            
            image: require("../../assets/img/zuobiao.png"),
            size: new AMap.Size(30, 30),  //图标大小
            imageSize:new AMap.Size(30,30)
          })
        });
          // console.log(_this.markers)
          if(_this.markers.length!=0){
            var markr;
            for(var i=0;i<_this.markers.length;i++){
            markr=new AMap.Marker({
            position:[_this.markers[i][0],_this.markers[i][1]],
            offset: new AMap.Pixel(-13, -30),
            icon: new AMap.Icon({            
              image: require("../../assets/img/zuobiao.png"),
              size: new AMap.Size(20, 20),  //图标大小
              imageSize:new AMap.Size(20,20)
            })
          })
           markr.setMap(map);
          }
          }
        AMap.plugin(['AMap.ToolBar'], function(){
              // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
              map.addControl(new AMap.ToolBar({
                  // 简易缩放模式，默认为 false
                  liteStyle: true
              }));
          });
        map.addControl(new AMap.Scale())
        marker.setMap(map);
        //marker.setAnimation('AMAP_ANIMATION_BOUNCE'); //设置点标记的动画效果，此处为弹跳效果
    },//定位
    dingwei(){
      var _this=this;
      if(!window.plus){
        _this.$toast({
          message:'定位失败，请打开定位'
        })
        if(!localStorage.getItem('lng')||!localStorage.getItem('lat')){
          localStorage.setItem('lng',_this.arriveCoor[0])
          localStorage.setItem('lat',_this.arriveCoor[1])
        }else{
          _this.arriveCoor=[localStorage.getItem('lng'),localStorage.getItem('lat')]
        }
      }else{
        window.plus.geolocation.watchPosition(function(p){
            _this.lat= p.coords.latitude;//纬度
            _this.lng= p.coords.longitude;//经度
            _this.arriveCoor=[_this.lng,_this.lat]
            _this.$toast({
              message:"定位成功,坐标是"+_this.arriveCoor //[103.591019,30.886797]
            })
            localStorage.setItem('lng',_this.lng)
            localStorage.setItem('lat',_this.lat)
        },function(e){
          _this.$toast({
          message:'定位失败'
          })
          _this.arriveCoor=[localStorage.getItem('lng'),localStorage.getItem('lat')]
        })
      }
    },
    //重新回到自己的位置
    dw(){
      var _this=this;
      _this.markers=[]
      _this.mapad()
      _this.arriveCoor=[localStorage.getItem('lng'),localStorage.getItem('lat')]
    },//进入地图详情页面
    mapin(){
      this.$router.push({path:'/mapin'})
    },
    btn(e){
      var w;
      if(e=='1'){
        w='超市'
      }else if(e=='2'){
        w='娱乐'
      }else if(e=='3'){
        w='医院'
      }
      var _this=this;
      _this.markers=[];
      AMap.service(["AMap.PlaceSearch"], function() {
            //构造地点查询类
            var placeSearch = new AMap.PlaceSearch({ 
                type: w, // 兴趣点类别
            });
            var cpoint = _this.arriveCoor ; //中心点坐标
            placeSearch.searchNearBy('', cpoint, 500, function(status, result) {
              var items=result.poiList.pois;
              // console.log(result.poiList.pois)
              for(var i=0;i<items.length;i++){
                _this.markers.push([items[i].location.lng,items[i].location.lat])
              }
            //   console.log(_this.markers)
             });
        });
        setTimeout(() => {
          _this.mapad()
        }, 500);
    }
    
    //gps转高德，目前不需要
   //  zhuanhuan(){
    //   var _this=this;
    //    AMap.convertFrom(_this.arriveCoor, "gps", function (status, result) {
    //       // if (result.info === 'ok') {
    //       //   _this.arriveCoor = result.locations[0];
    //       //   _this.lat=result.locations[0][1]
    //       //   _this.lng=result.locations[0][0]
    //       //   alert(result.locations[0])
    //       // }else{
    //       //   alert('fail')
    //       // }
    //       alert(JSON.stringify(result)+';'+";"+_this.arriveCoor)
    //     });
    // }
  },//挂载时候
  mounted() {
    this.mapad();
    this.dingwei();
    this.heigh =document.documentElement.clientHeight || document.body.clientHeight;    
    this.wa=document.documentElement.clientWidth || document.body.clientWidth;
  }
};
</script>
<style scoped>
.amap-sug-result { z-index: 9999; }
#adc {
  width: 100%;
  position: absolute;
  bottom: 56px;
  }
#sx{
  position: relative;
  margin-right: 1px
}
#cx {
  margin: 18px 0px 6px 6px;
  border: 1px solid gray;
  border-radius: 40px;
  min-height: 20px;

}
.mint-cell >>> .mint-field-core{
  text-align: center;
}
#btm{
  position: absolute;
  width:100%;
  top:-8px;
  background-color: white
}
#bt {
  width: 45px;
  color: lightseagreen;
  height: 28px;
  position: absolute;
  top: 22px;
  right: 5px;
  text-align: center;
  border-radius: 5px;
}
#zb{
  position: absolute;
  list-style: none;
  top:50px;
  margin:4px 0px
}
#zb li{
  background-color: white;
  margin:2px 0px;
  padding:5px 5px;
  border-radius: 10px;
  text-align: center;
  opacity: 0.8;
  font-size: 14px;
}
#dw{
  position: absolute;
  right: 17px;
  z-index: 3;
}
#sous{
  position: absolute;
  right:10px;
  top:14px;
  z-index: 3
}
</style>