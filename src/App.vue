<template>
  <div v-title data-title="java职位数据分析">
    <div class="menu-component">
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo"
        :router="true"
        mode="horizontal"
        background-color="#F3F3F3"
        text-color="#202340"
        active-text-color="#3398DB"
        :class="{nav_fixed : isFixed}"
        id="nav-fixed"
      >
        <el-menu-item index="/positions">
          <i class="el-icon-menu"></i>列表
        </el-menu-item>
        <el-menu-item index="/position/histogram">
          <i class="el-icon-s-data"></i>柱状图
        </el-menu-item>
        <el-menu-item index="/position/line">
          <i class="el-icon-sort-down"></i>折线图
        </el-menu-item>
        <el-menu-item index="/position/pie">
          <i class="el-icon-pie-chart"></i>极坐标
        </el-menu-item>
      </el-menu>
    </div>
    <transition name="component" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import positionApi from "@/api/position.js";
import store from "@/store/index.js";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import URLConfig from "@/config/URLConfig.js";
export default {
  data() {
    return {
      isFixed: false,
      offsetTop: 0,
      content: "",
      isConnect: false,
      stompClient: null,
      URL: URLConfig
    };
  },
  methods: {
    initHistogramAndLineData() {
      //查看Vuex中是否有这条数据，如果没有就重新请求，如果有就不用了
      let _data = store.getters.getHistogramAndLineData;
      // console.log(_data);
      if (_data.counts === undefined || _data.counts.length === 0) {
        positionApi.getHistogramAndLineData().then(res => {
          console.log(res);
          store.commit("SET_HISTOGRAM_AND_LINE_DATA", res);
        });
      }
    },
    // 滚动监听  滚动触发的效果写在这里
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >= this.offsetTop) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
    connect() {
      console.log("connect");
      const socket = new SockJS(this.URL.connectUrl); //连接上端点(基站)
      const stompClient = Stomp.over(socket);
      this.stompClient = stompClient;
      //连接->发送消息->找订阅点
      stompClient.connect({}, () => {
        this.isConnect = true;
        stompClient.subscribe(this.URL.subscribeUrl, result => {
          console.log(result.body)
          this.content = JSON.parse(result.body).content;
          this.$notify({
            title: "tip!",
            offset: 68,
            message: this.content
          });
        });
      });
      console.log(socket);
      console.log(this.isConnect);
      console.log(this.stompClient);
    },
    sendMessage() {
      console.log("sendMessage");
      this.stompClient.send(
        this.URL.sendUrl,
        {},
        JSON.stringify({ hello: "hello" })
      );
    },
    disconnect() {
      if (this.stompClient !== null) {
        this.stompClient.disconnect();
      }
      this.isConnect = false;
    }
  },
  watch: {
    isConnect(newVal, oldVal) {
      // console.log(this);
      // console.log(newVal)
      if (newVal === true) {
        this.sendMessage();
      }
    }
  },
  created() {
    this.initHistogramAndLineData();
    this.connect();
  },
  mounted() {
    // 设置bar浮动阈值为 #fixedBar 至页面顶部的距离
    this.offsetTop = document.querySelector("#nav-fixed").offsetTop;
    // 开启滚动监听
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    this.disconnect();
    // 离开页面 关闭监听 不然会报错
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped>
.nav_fixed {
  position: fixed;
  z-index: 2;
  top: 0;
  width: 100%;
}
.el-icon-menu:hover {
  color: rgb(33, 204, 216);
}
.el-icon-pie-chart:hover {
  color: rgb(99, 83, 34);
}
.el-icon-s-data:hover {
  color: rgb(71, 32, 243);
}
.el-icon-sort-down:hover {
  color: rgb(201, 33, 216);
}
/**
        v-enter     进入之前的状态
        v-leave-to  动画离场的状态
    */
.component-enter,
.component-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

/**
       v-enter-active 入场动画的时间段
       v-leave-active 离场动画的时间段
    */
.component-enter-active,
.component-leave-active {
  transition: all 0.2s ease;
}
.menu-component {
  margin-bottom: 15px;
}
</style>


