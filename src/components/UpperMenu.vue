<template>
  <div>
    <nav>
      <div
        class="top-menu"
        v-for="item in topMenuItems"
        :key="item.name"
        @click="menuHandler(item)"
      >
        <router-link
          :to="item.path"
          :class="{ 'crm-active': item == currentItem }"
          >{{ item.name }}
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "UpperMenu",
  methods: {
    menuHandler(item) {
      this.currentItem = item;
      // menuSwitcher(e, "top-menu", "crm-active");
    }
  },

  data() {
    return {
      topMenuItems: [
        { name: "Заказы", path: "/orderMenu" },
        { name: "Отчеты", path: "/report" },
        { name: "Сотрудники", path: "/employeers" }
      ],
      currentItem: {}
    };
  },
  mounted() {
    this.currentItem = this.topMenuItems[0];
  }
};

// function menuSwitcher(e, selectorClass, activeClass) {
//   let menu = document.getElementsByClassName(selectorClass);
//   menu.forEach(element => {
//     element.childNodes.forEach(i => {
//       i.classList.remove(activeClass);
//     });
//   });
//   e.target.classList.add(activeClass);
// }
</script>

<style lang="scss" scoped>
$color-grey: #3e4656;

.crm-active {
  background-color: rgba($color-grey, 1);
  color: white !important;
  border-top-style: solid;
  border-top-width: 3px;
  border-top-color: rgb(111, 207, 151);
}

nav {
  margin-left: 53px;

  .top-menu {
    display: inline;

    a {
      &:hover {
        text-decoration: none !important;
      }

      color: black;
      text-align: center;
      padding: 14px 30px;
      text-decoration: none;
    }
  }
}
</style>
