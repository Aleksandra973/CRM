<template>
  <b-modal id="modal-1" @show="getOrderInfo" hide-header hide-footer>
    <p class="modal-title">Карточка заказа № {{ orderInfo.id }}</p>
    <p>Создан {{ moment(orderInfo.info && orderInfo.info.createdAt).format("DD.MM.YY") }} в
      {{ orderInfo.info && moment(orderInfo.info.createdAt).format("HH:mm") }}</p>
    <ul class="modal-nav nav nav-tabs ">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#information">Информация</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#backet">Корзина</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="maps">Карта</a>
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane container active" id="information">
        <div class="order-status">
          <span>Статус заказа</span>
          <span class="status-color">
            <i class="fa fa-circle" aria-hidden="true"></i>{{ orderInfo.info && orderInfo.info.status }}
          </span>
        </div>
        <div class="flex-container">
          <div>
            <span>С момента <br> заказа</span>
            <p class="order-time-style">{{ orderInfo.info && orderInfo.info.timeLeft }}</p>
            <span style="color: #363c52">чч:мм</span>
          </div>
          <div>
            <span>Плановое <br> время</span>
            <p class="order-time-style">{{ moment(orderInfo.info && orderInfo.info.planedTime).format("HH:mm") }}</p>
          </div>
          <div>
            <span>Рассчетное <br> время (ЕТА)</span>
            <p style="color: red" class="order-time-style">
              {{ moment(orderInfo.info && orderInfo.info.eta).format("HH:mm") }}</p>
            <p></p>
          </div>
          <div>
            <span>Собрано <br> в корзину</span>
            <p class="order-time-style">{{
                orderInfo.info && orderInfo.info.cartCompletedItems
              }}/<span>{{ orderInfo.info && orderInfo.info.cartTotalItems }}</span></p>
            <p style="color: #363c52">~ {{ orderInfo.info && orderInfo.info.cartLeftToCollect }}</p>
          </div>
        </div>
        <hr class="line-style">
        <div class="row">
          <div class="col-md-5">
            <div id="timeHistory">
              {{historyLine(orderInfo)}}
            </div>
            <table class="history-status-table">
              <tbody>
              <tr v-for="(item, index) in orderInfo.info.history" :key="item.status">
                <td>
                 <span :class="{'current-status': index == getCurrentStatus(orderInfo)}">{{ item.time ? moment(item.time).format("HH:mm") : null}}</span>
                  <span :class="[{'completed-status': index <= getCurrentStatus(orderInfo)}, {'current-status': index == getCurrentStatus(orderInfo)}]">{{item.status}}</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-7">
            .col-
          </div>
        </div>
      </div>
      <div class="tab-pane container fade" id="backet">...</div>
      <div class="tab-pane container fade" id="maps">...</div>
    </div>
  </b-modal>
</template>

<script>
import {OrderSevice} from "@/services/order.service";
import moment from "moment";

export default {
  name: "OrderCard",
  data() {
    return {
      orderInfo: {
        info: {
          history: []
        }
      },
    }
  },

  props: ["id"],


  methods: {
    createLine: function () {
      const lineElement = document.createElementNS("http://www.w3.org/2000/svg", "line")
      lineElement.setAttribute("x1", "10")
      lineElement.setAttribute("y1", "10")
      lineElement.setAttribute("x2", "10")
      lineElement.setAttribute("y2", "30")
      return lineElement
    },
    createCircle: function () {
      const circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      circleElement.setAttribute("cx", "10")
      circleElement.setAttribute("cy", "5.5")
      circleElement.setAttribute("r", "5")
      return circleElement
    },

    getCurrentStatus: function (orderInfo) {
      var history = orderInfo.info.history;
      var currentStatus
      for (let j = 0; j < history.length; j++) {
        if ("time" in history[j]) {
          currentStatus = j
        }
      }
      return currentStatus;
    },

    historyLine: function (orderInfo) {
      var container = document.getElementById("timeHistory")
      var svgItem
      var circleElement
      var lineElement
      var currentStatus = this.getCurrentStatus(orderInfo)
      var history = orderInfo.info.history;
      for (let i = 0; i < history.length; i++) {
        if (i < currentStatus) {
          svgItem = document.createElementNS("http://www.w3.org/2000/svg", "svg")
          svgItem.setAttribute("height", "30")
          container.appendChild(svgItem)
          circleElement = this.createCircle()
          circleElement.setAttribute("fill", "#0871e3")
          svgItem.appendChild(circleElement)
          lineElement = this.createLine()
          lineElement.setAttribute("style", "stroke:#0871e3;stroke-width:2")
          svgItem.appendChild(lineElement)
        } else {
          if (i == currentStatus) {
            svgItem = document.createElementNS("http://www.w3.org/2000/svg", "svg")
            svgItem.setAttribute("height", "30")
            container.appendChild(svgItem)
            circleElement = this.createCircle()
            circleElement.setAttribute("fill", "#0871e3")
            svgItem.appendChild(circleElement)
            if (i !== history.length - 1) {
              lineElement = this.createLine()
              lineElement.setAttribute("style", "stroke:#0871e37a;stroke-width:2")
              lineElement.setAttribute("stroke-dasharray", "3 3")
              svgItem.appendChild(lineElement)
            }
          } else {
            svgItem = document.createElementNS("http://www.w3.org/2000/svg", "svg")
            svgItem.setAttribute("height", "30")
            container.appendChild(svgItem)
            circleElement = this.createCircle()
            circleElement.setAttribute("style", "stroke:#0871e37a; stroke-width:2")
            circleElement.setAttribute("fill", "white")
            svgItem.appendChild(circleElement)
            if (i !== history.length - 1) {
              lineElement = this.createLine()
              lineElement.setAttribute("style", "stroke:#0871e37a;stroke-width:2")
              svgItem.appendChild(lineElement)
            }
          }
        }
      }
    },

    moment: function (dt) {
      return moment(dt);
    },
    async getOrderInfo() {
      setTimeout(async () => {
        this.orderInfo = (await OrderSevice.getOrderInfo(this.id)).data[0];
        console.log(this.orderInfo.info.history)
      }, 100)

    },

  }
};
</script>

<style lang="scss" scoped>
.modal-title {
  font-size: 18px;
  font-weight: bold;
  color: #363c52;
}

.order-time-style {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: -7px;
  color: #363c52;

  span {
    font-size: 17px;
  }
}

.modal-nav {
  margin-left: -16px;
  margin-right: -16px;

  li {
    a {
      color: #5a5a5a;
      border-top: none;
      border-left: none;
      border-right: none;

      &:hover {
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom-color: $color-blue;
        border-width: 3px;
        color: $color-blue;
      }

      &.active {
        border-bottom: $color-blue;
        color: $color-blue !important;
        border-style: solid;
        border-top: none;
        border-left: none;
        border-right: none;
      }

    }
  }
}


.order-status {
  padding-left: 20px;
  margin-left: -31px;
  margin-right: -31px;
  background-color: #f4f6fc;
  height: 45px;
  padding-top: 15px;
  border-bottom: solid 1px;
  border-bottom-color: #d9d6d6;

  i {
    margin-left: 10px;
    margin-right: 5px;
  }

}

.flex-container {
  display: flex;
  margin-left: -15px;

  div {
    margin-right: 40px;
  }
}

.line-style {
  margin-top: 0px;
  margin-left: -15px;
  margin-right: 15px;
}

.status-color {
  color: $color-light-blue;
}

.completed-status {
  color: $color-light-blue;
  padding-left: 10px;
}
.current-status {
  font-weight: bold;
}
#timeHistory{
  float: left;
  width: 25px;

}
.history-status-table{
  margin-top: -5px;
  td {
    height: 30px;
  }
}
</style>
