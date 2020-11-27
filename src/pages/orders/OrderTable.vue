<template>
  <div>
    <FilterOrders v-bind:isVisible="filterIsVisible" @close="closeFilter" />
    <OrderCard :id="currentOrder.id"/>
    <div class="right" @click="filterClick">
      <i class="fa fa-filter"></i>
      <span>Фильтр</span>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>MSG</th>
          <th>Номер</th>
          <th>Время</th>
          <th>Статус</th>
          <th>План/ЕТА</th>
          <th>Сборщик</th>
          <th>Курьер</th>
          <th>Адрес доставки</th>
          <th>Клиент/Телефон</th>
          <th>Поз./Кг.</th>
          <th>Общая стоимость</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orderList" :key="order.id">
          <td></td>

          <td @click="cardClick(order)">{{ order.number }}</td>
          <td>{{ moment(order.moments).format("DD.MM HH:MM") }}</td>
          <td>{{ order.status }}</td>
          <td>
            {{ order.planEta && moment(order.planEta.plan).format("HH:MM") }}
            <span :class="[getDiff(order) > 0 ? 'outrunning' : 'delay']"
              >({{ getDiff(order) }})</span
            >
          </td>
          <td>
            {{ order.packer.name }}
            <p class="status">{{ order.packer.status }}</p>
          </td>
          <td>
            {{ order.courier.name }}
            <p
              class="status oneLine"
              :class="{ notFound: order.courier.status == 'not found' }"
            >
              {{ order.courier.status }}
            </p>
          </td>
          <td>{{ order.deliveryAddress }}</td>
          <td>
            {{ order.client.name }}
            <p>{{ order.client.phone }}</p>
          </td>
          <td>
            <span class="oneLine"
              >{{ order.orderInfo.pos }} поз. /
              {{ order.orderInfo.weight }} кг</span
            >
          </td>
          <td>{{ order.totalPrice }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { OrderSevice } from "@/services/order.service";
import FilterOrders from "@/pages/orders/FilterOrders.vue";
import OrderCard from "@/pages/orders/OrderCard.vue";
import moment from "moment";
import $store from "../../store";

export default {
  name: "TabOrders",

  components: {
    FilterOrders,
    OrderCard
  },

  data() {
    return {
      filterIsVisible: false,
      currentOrder: {}
    };
  },
  computed: {
    orderList() {
      return $store.state.orders ? $store.state.orders.items : [];
    }
  },

  methods: {
    moment: function(dt) {
      return moment(dt);
    },
    getDiff: function(order) {
      var ms = moment(order.planEta.plan).diff(moment(order.planEta.eta));
      ms = Math.round(ms / (1000 * 60));
      return ms;
    },
    filterClick: function(e) {
      this.filterIsVisible = !this.filterIsVisible;
    },
    cardClick: function(order) {
      this.currentOrder = order;
      this.$bvModal.show("modal-1")

    },
    closeFilter: function() {
      this.filterIsVisible = !this.filterIsVisible;
    }
  },

  async mounted() {
    await $store.dispatch("orders/getOrders");
  }
};
</script>

<style lang="scss" scoped>
.delay {
  color: #ff0000;
}
.outrunning {
  color: #008000;
}

.status {
  padding: 2px 10px;
  border-style: solid;
  border-width: 1px;
  border-radius: 12px;
}

.notFound {
  border-color: red;
  background-color: red;
  color: white;
}

tr {
  th {
    font-weight: bold;
  }
}

.oneLine {
  white-space: nowrap;
}

.right {
  margin: 20px 50px 20px 0px;

  color: $color-light-blue;
  text-align: right;
  i {
    font-size: 40px;
    margin-right: 15px;
  }
  span {
    font-size: 25px;
  }
}
</style>
