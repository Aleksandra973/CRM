<template>
  <div>
    <nav class="order-menu">
      <div
        v-for="item in orderSubMenu.menuItems"
        :key="item.name"
        @click="subMenuHandler(item)"
      >
        <a
          href="#"
          :class="{
            'order-item-active': item == orderSubMenu.currentItem
          }"><i  class="fa " :class="[item.image]"  ></i
        ></a>
        <br/>
        <a
          href="#"
          :class="{
            'order-item-active': item == orderSubMenu.currentItem
          }"
        >{{ item.name }}</a
        >
      </div>
    </nav>
    <component v-bind:is="currentTabComponent"></component>
  </div>
</template>

<script>
import Orders from "@/pages/orders/OrderTable.vue";

export default {
  name: "OrderMenu",

  components: {
    Orders
  },

  methods: {
    subMenuHandler(item) {
      this.orderSubMenu.currentItem = item;
    }
  },

  computed: {
    currentTabComponent: function () {
      return this.orderSubMenu.currentItem.id;
    }
  },

  data() {
    return {
      orderSubMenu: {
        menuItems: [
          {name: "Реестр заказов", image: "fa-th", id: "Orders"},
          {name: "Оповещения", image: "fa-bullhorn", id: "Notifications"},
          {name: "Карты", image: "fa-map-o", id: "Maps"},
          {name: "Контакты", image: "fa-user-o", id: "Contacts"}
        ],
        currentItem: {id: ""}
      }
    };
  },

  mounted() {
    this.orderSubMenu.currentItem = this.orderSubMenu.menuItems[0];
  }
};
</script>

<style lang="scss" scoped>
$color-grey: #3e4656;
.order-menu {
  div {
    text-align: center;
    margin: 10px 20px;

    a {
      padding: 10px 20px 10px;
      color: white;

      &:hover {
        text-decoration: none !important;
      }
    }
  }

  display: flex;
  background-color: rgba($color-grey, 1);
}

.order-item-active {
  color: rgb(111, 207, 151) !important;
}
</style>
