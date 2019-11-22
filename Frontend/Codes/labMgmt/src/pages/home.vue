<template>
  <div class="fullWidth" v-bind:style="{ height: info.fullHeight, padding: '0px'}">
    <el-row :gutter="15">
      <el-col :span="18">
        <el-row>
          <el-col :span="24">
            <el-carousel
              :height="info.carouselHeight"
              indicator-position="outside"
              style="overflow: hidden"
            >
              <el-carousel-item>
                <img src="@/assets/img/lab1.jpg" style="width:100%;" />
              </el-carousel-item>
              <el-carousel-item>
                <img src="@/assets/img/lab2.jpg" style="width:100%;" />
              </el-carousel-item>
              <el-carousel-item>
                <img src="@/assets/img/lab3.jpg" style="width:100%;" />
              </el-carousel-item>
              <el-carousel-item>
                <img src="@/assets/img/lab4.jpg" style="width:100%;" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
        <el-row v-if="info.isManager" :gutter="15" style="margin-top: 15px">
          <el-col :span="10">
            <el-card class="box-card" style="height: 320px">
              <div slot="header" class="clearfix">
                <span>库存预警</span>
                <el-button
                  v-if="!info.isRead"
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="enterSearch"
                >进入...</el-button>
              </div>
              <div id="numContainer" style="height: 280px"></div>
            </el-card>
          </el-col>
          <el-col :span="14">
            <el-card class="box-card" style="height: 320px">
              <div slot="header" class="clearfix">
                <span style="padding: 3px 0">人员使用率</span>
                <el-button
                  v-if="!info.isRead"
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="exportUserRate"
                >导出</el-button>
              </div>
              <div id="rateContainer" style="height: 280px;"></div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" v-bind:style="{ height: info.msgHeight }">
          <div slot="header" class="clearfix">
            <span>最新消息</span>
            <el-button
              v-if="info.isManager && !info.isRead"
              style="float: right; padding: 3px 0"
              type="text"
              @click="enterMsg"
            >进入...</el-button>
          </div>
          <div v-for="o in info.msg.data" :key="o.Id" class="text item newsItem">
            <div class="newsTitle">
              <el-row>
                <el-col :span="16">
                  <i class="el-icon-message"></i>
                  {{o.Title}}
                </el-col>
                <el-col :span="8">
                  <span>{{o.PublishTime}}</span>
                </el-col>
              </el-row>
            </div>
            <span class="newsContent">{{ o.Content }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-if="info.isManager" :gutter="15" style="margin-top: 15px">
      <el-col :span="18">
        <el-row :gutter="15">
          <el-col :span="24">
            <el-card class="box-card" style="height: 240px">
              <div slot="header" class="clearfix">
                <span>今日汇总</span>
              </div>
              <el-row>
                <el-col :span="8">
                  <div class="loading borrow">
                    <div class="left"></div>
                    <div class="right"></div>
                    <div v-if="info.isRead" class="progress">
                      <p>借出数量</p>
                      <span>{{info.today.Item1}}</span>
                    </div>
                    <div v-else class="progress" @click="enterBorrow(1)" style="cursor: pointer;">
                      <p>借出数量</p>
                      <span>{{info.today.Item1}}</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="loading return">
                    <div class="left"></div>
                    <div class="right"></div>
                    <div v-if="info.isRead" class="progress">
                      <p>归还数量</p>
                      <span>{{info.today.Item2}}</span>
                    </div>
                    <div v-else class="progress" @click="enterBorrow(2)" style="cursor: pointer;">
                      <p>归还数量</p>
                      <span>{{info.today.Item2}}</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="loading">
                    <div class="left"></div>
                    <div class="right"></div>
                    <div v-if="info.isRead" class="progress">
                      <p>逾期未还</p>
                      <span>{{info.today.Item3}}</span>
                    </div>
                    <div v-else class="progress" @click="enterBorrow(3)" style="cursor: pointer;">
                      <p>逾期未还</p>
                      <span>{{info.today.Item3}}</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="15" style="margin-top: 15px"></el-row>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" style="height: 440px; margin-top: -200px">
          <div slot="header" class="clearfix">
            <span style="padding: 3px 0">热门借用排行榜</span>
          </div>
          <div
            v-for="(item, index) in info.hotParts"
            :key="item.Item3"
            class="text item hotItem"
            v-bind:class="{ text: true, item: true, hotItem: true, itemLink: !info.isRead }"
            @click="enterPart(item.Item1, item.Item2)"
          >
            <div :class="['circle', 'hotItemNum', 'index'+index]">{{index+1}}</div>
            <span class="hotItemTitle">{{ item.Item3 }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="15" style="margin-top: 15px">
      <el-col :span="8">
        <el-card
          class="box-card"
          style="background-color: #f0f9eb; border-color: #c2e7b0; color: #67C23A; height: 14em"
        >
          <div slot="header" class="clearfix">
            <span>最新消息</span>
            <el-button style="float: right; padding: 3px 0" type="text">进入...</el-button>
          </div>
          <div v-for="o in info.msg.data" :key="o" class="text item">{{ o.Title }}</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card
          class="box-card"
          style="background-color: #fdf6ec; border-color: #f5dab1; color: #E6A23C; height: 14em"
        >
          <div slot="header" class="clearfix">
            <span>库存预警</span>
            <el-button style="float: right; padding: 3px 0" type="text">进入...</el-button>
          </div>
          <div
            v-for="o in info.storage.data"
            :key="o.ModelDesc"
            class="text item"
            style="line-height: 1.8em"
          >{{ o.ModelDesc+'，库存量：' + o.AssetNum }}</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card
          class="box-card"
          style="background-color: #fef0f0; border-color: #fbc4c4; color: #F56C6C; height: 14em"
        >
          <div slot="header" class="clearfix">
            <span>逾期未还</span>
            <el-button style="float: right; padding: 3px 0" type="text">进入...</el-button>
          </div>
          <div
            v-for="o in info.late.data"
            :key="o"
            class="text item"
          >{{'借用人：' + o.BorrowerAccountNo + ' ' + o.AssetDesc }}</div>
        </el-card>
      </el-col>
    </el-row>-->
    <!-- <el-row :gutter="15" style="margin-top: 18px">
      <el-col :span="24">
        <el-card
          class="box-card"
          style="background-color: #ecf5ff; border-color: #b3d8ff; color: #409EFF"
        >
          <div slot="header" class="clearfix" style="text-align: center">
            <h3>人员使用率</h3>
          </div>
          <div id="rateContainer" style="height: 400px"></div>
        </el-card>
      </el-col>
    </el-row>-->
  </div>
</template>
<script>
import BorrowAndReturnService from "../apis/BorrowAndReturnService";
import WorkStationService from "../apis/WorkStationService";
import AssetService from "../apis/AssetService";
import { mapActions, mapState } from "vuex";
import { dateFormat } from "../utils/helper";
import "../assets/css/pages/home.css";
import { setInterval } from "timers";

const roles = ["系统管理员", "实验室管理员"];

export default {
  data() {
    return {
      info: {
        late: {
          data: [],
          loading: false
        },
        msg: {
          data: [],
          loading: false
        },
        storage: {
          data: [],
          loading: false
        },
        today: {},
        hotParts: [],
        isManager: true,
        carouselHeight: "200px",
        msgHeight: "360px",
        fullHeight: "820px",
        isRead: false
      },
      listQuery: {
        PageIndex: 1,
        PageSize: 4
      }
    };
  },
  computed: {
    ...mapState({
      loginUser(state) {
        return state.user.user;
      }
    })
  },
  created: function() {
    if (roles.find(_ => this.loginUser.Role.RoleName == _)) {
      // this.info.isManager = true;
      this.info.isRead = false;
    } else {
      // this.info.isManager = false;
      this.info.isRead = true;
    }
  },
  mounted() {
    this.info.msg.loading = true;
    WorkStationService.getMessageList(this.listQuery).then(res => {
      this.info.msg.data = res.Data;
      this.info.msg.loading = true;
    });
    //if (this.info.isManager) {
    // 引入 ECharts 主模块
    var echarts = require("echarts/lib/echarts");
    // 引入柱状图
    require("echarts/lib/chart/bar");
    require("echarts/lib/chart/pie");
    // 引入提示框和标题组件
    require("echarts/lib/component/tooltip");
    require("echarts/lib/component/title");
    require("echarts/lib/component/dataZoom");

    this.info.late.loading = true;
    BorrowAndReturnService.getBorrowedRecordsToday().then(res => {
      this.info.today = res;
      this.info.late.loading = false;
    });

    BorrowAndReturnService.getHotParts().then(res => {
      this.info.hotParts = res;
    });

    const numDom = document.getElementById("numContainer");
    var numChart = echarts.init(numDom);
    this.info.storage.loading = true;
    AssetService.getAssetNum().then(res => {
      numChart.setOption({
        tooltip: {
          trigger: "item"
        },
        series: [
          {
            name: "型号",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: res.map(_ => {
              return {
                name: _.ModelNo,
                value: _.AssetNum ? _.AssetNum : 0.5,
                tooltip: {
                  formatter:
                    "资产大类: " +
                    _.AssetCategoryLevel1Name +
                    "<br/>小分类: " +
                    _.AssetCategoryLevel2Name +
                    "<br/>型号类别: " +
                    _.AssetCategoryModelName +
                    "<br/>型号: " +
                    _.ModelNo +
                    "<br/>数量：" +
                    _.AssetNum
                }
              };
            }),
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
      setTimeout(() => {
        numChart.resize({
          width: "auto"
        });
      }, 0);
      this.info.storage.loading = true;
    });

    // 基于准备好的dom，初始化echarts实例
    const rateDom = document.getElementById("rateContainer");
    var rateChart = echarts.init(rateDom);
    BorrowAndReturnService.getUserRates().then(res => {
      // 绘制图表
      rateChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: true
            }
          },
          formatter: function(params, ticket, callback) {
            return (
              "用户: " +
              params[0].name +
              "<br/>使用率: " +
              echarts.format.addCommas(params[0].value * 100) +
              "%"
            );
          }
        },
        calculable: true,
        legend: {
          show: false
        },
        grid: {
          top: "10%",
          left: "6%",
          right: "6%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: res.map(_ => _.Item1)
          // axisTick: {
          //   interval: 0
          // },
          // axisLabel: {
          //   interval: 0 // 强制显示所有标签
          // }
        },
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: function(a) {
                a = +a;
                return isFinite(a)
                  ? echarts.format.addCommas(+a * 100) + "%"
                  : "";
              }
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            type: "slider",
            startValue: 0,
            endValue: 15,
            showDetail: false,
            showDataShadow: "",
            bottom: "-15px"
          }
        ],
        series: [
          {
            name: "使用率",
            type: "bar",
            data: res.map(_ => {
              let colorName = "LightSeaGreen";
              if (_.Item2 < 0.1) {
                colorName = "red";
              } else if (_.Item2 < 0.2) {
                colorName = "Orange";
              } else if (_.Item2 < 0.3) {
                colorName = "Magenta";
              } else if (_.Item2 < 0.4) {
                colorName = "MediumSlateBlue";
              }
              return {
                value: _.Item2,
                itemStyle: {
                  color: colorName
                }
              };
            })
          }
        ]
      });
    });

    window.cnode = this.$refs.cnode;
    // } else {
    //   this.info.carouselHeight = "600px";
    //   this.info.msgHeight = "600px";
    //   this.info.fullHeight = "650px";
    //   this.listQuery.PageSize = 7;
    // }
  },
  methods: {
    exportUserRate() {
      BorrowAndReturnService.exportUserRate();
    },
    enterSearch() {
      this.$router.push({ name: "search" });
    },
    enterMsg() {
      this.$router.push({ name: "work_publish" });
    },
    enterBorrow(type) {
      const today = dateFormat(new Date(), "yyyy-MM-dd");
      switch (type) {
        case 1:
          this.$router.push({
            name: "borrow_search",
            params: {
              BorrowDateRange: [today + " 00:00:00", today + " 23:59:59"],
              PageIndex: 1
            }
          });
          break;
        case 2:
          this.$router.push({
            name: "return_search",
            params: {
              ActualReturnDateRange: [today + " 00:00:00", today + " 23:59:59"],
              PageIndex: 1
            }
          });
          break;
        case 3:
          this.$router.push({ name: "late_search" });
          break;
        default:
          break;
      }
    },
    enterPart(assetType, assetId) {
      if (this.info.isRead) {
        return;
      }
      const inParameters = { id: assetId, type: "read", src: "home" };
      if (assetType == 1) {
        this.$router.push({
          name: "asset_edit",
          params: inParameters
        });
      } else {
        this.$router.push({
          name: "asset_compEdit",
          params: inParameters
        });
      }
    }
  }
};
</script>
<style scoped>
.loading {
  margin: 2em auto;
  width: 10em;
  height: 10em;
  position: relative;
}

.loading .progress {
  position: absolute;
  width: 8em;
  height: 8em;
  background-color: white;
  border-radius: 50%;
  left: 1em;
  top: 1em;
  line-height: 4em;
  text-align: center;
}

.loading .progress span {
  font-size: 2em;
  font-weight: bold;
  color: red;
}

.loading .progress p {
  margin-top: 2.5em;
  line-height: 1em;
}

.left,
.right {
  width: 5em;
  height: 10em;
  overflow: hidden;
  position: relative;
  float: left;
  background-color: #ffffff;
}

.left {
  border-radius: 10em 0 0 10em;
}

.right {
  border-radius: 0 10em 10em 0;
}

.left:after,
.right:after {
  content: "";
  position: absolute;
  display: block;
  width: 5em;
  height: 10em;
  background-color: white;
  border-radius: 10em 0 0 10em;
  background-color: red;
}

.right:after {
  content: "";
  position: absolute;
  display: block;
  border-radius: 0 10em 10em 0;
}
.left:after {
  transform-origin: right center;
}

.right:after {
  transform-origin: left center;
  transform: rotateZ(45deg);
}

.borrow .left:after,
.borrow .right:after {
  background-color: #67c23a;
}

.borrow span {
  color: #67c23a !important;
}

.return span {
  color: #409eff !important;
}

.return .left:after,
.return .right:after {
  background-color: #409eff;
}
</style>
