<template>
  <div>
    <mt-tabbar v-model="selected" id="a">
      <router-link to="/shouye" tag="div" @click.native="tabb(1)" >
        <mt-tab-item id="消息" :class="[this.num==1 ? 'yan': '']">
          <img slot="icon" src="../../assets/img/xiaoxib.png" v-if="this.num==1" />
          <img slot="icon" src="../../assets/img/xiaoxia.png" v-else/>
          消息
        </mt-tab-item>
      </router-link>
      <router-link to="/lianxiren" tag="div" @click.native="tabb(2)" >
        <mt-tab-item id="联系人" :class="[this.num==2 ? 'yan': '']">
          <img slot="icon" src="../../assets/img/lianxirenb.png" v-if="this.num==2" />
          <img slot="icon" src="../../assets/img/lianxirena.png" v-else/>
          联系人
        </mt-tab-item>
      </router-link>
      <router-link to="/mapa" tag="div" @click.native="tabb(3)">
        <mt-tab-item id="地图" :class="[this.num==3 ? 'yan': '']">
          <img slot="icon" src="../../assets/img/mapb.png" v-if="this.num==3"/>
          <img slot="icon" src="../../assets/img/mapa.png" v-else />
          地图
        </mt-tab-item>
      </router-link>
      <router-link to="/login" tag="div" @click.native="tabb(4)">
        <mt-tab-item id="设置" :class="[this.num==4 ? 'yan': '']">
          <img slot="icon" src="../../assets/img/shezhib.png" v-if="this.num==4" />
          <img slot="icon" src="../../assets/img/shezhia.png" v-else />
          设置
        </mt-tab-item>
      </router-link>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  data() {
    return {
      selected: "",
      num:"4",
      yan:"4"
    };
  },
  methods: {
    tabb(n){
      this.num=n;
    }
  },
  mounted() {
    this.num=1;
  }
};
</script>
<style scoped>
#a {
  display: flex;
  background-color:white;
  border-top:1px solid lightgray;
}
#a div{
  flex: 1
}
.yan{
  color: rgb(65, 138, 206)
}
</style>