<template>
  <div class="filter-container" v-if="isVisible">
    <div class="filter-close">
      <button class="btn btn-link " @click="closeFilter">
        Закрыть фильтр
      </button>
    </div>
    <p class="filter-border">
      <span>Отображено:</span><span class="filter-counters">546</span>
      <span>Всего:</span><span class="filter-counters"> 2873</span>
    </p>
    <div class="flex-container">
      <span>Фильтры</span>
      <span><i class="fa fa-filter"></i><span>Cбросить</span></span>
    </div>
    <form action="">
      <label
        class="checkbox-container"
        v-for="box in chekedFilter"
        :key="box.name + box.isChecked"
        >{{ box.name }}
        <input type="checkbox" name="" id="box.id" v-model="box.isChecked" />
        <span class="checkmark"></span>
      </label>
      <p class="filtered-box"></p>
      <label
        class="checkbox-container"
        v-for="box in unChekedFilter"
        :key="box.name"
        >{{ box.name }}
        <input type="checkbox" name="" id="box.id" v-model="box.isChecked" />
        <span class="checkmark"></span>
      </label>
      <div>
        <label class="title-label">Магазин</label>
        <input
          class="s-form-control form-control"
          type="text"
          placeholder="Поиск"
        />
      </div>
      <div>
        <label class="title-label">Курьеры</label>
        <input
          class="s-form-control form-control"
          type="text"
          placeholder="Поиск"
          v-model="filter.courier"
        />
      </div>
      <div>
        <label class="title-label">Сбощики</label>
        <input
          class="s-form-control form-control"
          type="text"
          placeholder="Поиск"
          v-model="filter.packer"
        />
      </div>
      <div>
        <label class="title-label">Временной интервал</label> <br />
        <div class="flex-container">
          <div>
            <span class="time-label">с</span>
            <a-time-picker
              class="time-picker"
              format="HH:mm"
              @change="onChange"
              placeholder=""
              v-model="filter.timeStart"
            />
          </div>
          <div>
            <span class="time-label">по</span>
            <a-time-picker
              class="time-picker"
              format="HH:mm"
              @change="onChange"
              placeholder=""
              v-model="filter.timeEnd"
            />
          </div>
        </div>
      </div>
      <p class="time-border"></p>
      <button type="button" class="applay-button" @click="applyFilters">
        Применить фильтр
      </button>
    </form>
  </div>
</template>

<script>
import moment from "moment";
import $store from "../../store";

export default {
  name: "FilterOrders",

  data() {
    return {
      filter: {
        status: [],
        shop: "",
        courier: "",
        packer: "",
        timeStart: "",
        timeEnd: ""
      },
      checkBoxes: [
        { name: "Проблемные заказы", id: "problemOrders", isChecked: false },
        { name: "Заказы без проблем", id: "ordersWithoutProblems", isChecked: false },
        { name: "Новый", id: "created", isChecked: false },
        { name: "Подтвержден", id: "confirmed", isChecked: false },
        { name: "Сбор товаров", id: "collection", isChecked: false },
        { name: "В пути", id: "onTheWay", isChecked: false },
        { name: "Курьер прибыл", id: "courierArrived", isChecked: false },
        { name: "Выполнен", id: "completed", isChecked: false },
        { name: "Отменен", id: "canceled", isChecked: false }
      ]
    };
  },
  props: ["isVisible"],
  methods: {
    applyFilters: async function() {
      this.filter.status = this.checkBoxes.filter(x => x.isChecked).map(x=>x.id);
      const data = Object.assign({}, this.filter);
      await $store.commit("orderFilters/SET_CURRENT_ORDER_FILTERS", data);
      await $store.dispatch('orders/getOrders')
    },
    moment,
    closeFilter: function() {
      this.$emit("close");
    },
    onChange(time, timeString) {
      console.log(time, timeString);
    }
  },
  computed: {
    chekedFilter: function() {
      return this.checkBoxes.filter(x => x.isChecked);
    },
    unChekedFilter: function() {
      return this.checkBoxes.filter(x => !x.isChecked);
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-container {
  width: 340px;
  height: 850px;
  position: absolute;
  background-color: white;
  border-radius: 7px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.712);
  padding: 15px;
  color: black;
  right: 20px;
  top: 255px;
}

.s-form-control {
  height: 35px;
  font-size: 14px;
  margin-bottom: 10px;
}
.title-label {
  margin-bottom: 5px;
  margin-top: 10px;
}
.filter-close {
  margin-top: -10px;
  margin-left: -15px;
  margin-right: -15px;
  padding-bottom: 5px;
  display: flex;
  justify-content: center;
  border-bottom: solid;
  border-bottom-width: 2px;
  border-bottom-color: rgba($color-light-blue, 0.7);

  button {
    font-size: 14px;
    color: $color-light-blue;
  }
}
.filter-counters {
  font-weight: bold;
  margin-left: 10px;
  margin-right: 20px;
}
.filter-border {
  border-bottom: solid;
  border-bottom-width: 2px;
  border-bottom-color: rgb(235, 235, 235);
  margin-left: -15px;
  margin-right: -15px;
  padding-top: 12px;
  padding-left: 15px;
  padding-bottom: 10px;
}
.checkbox-container {
  display: block;
  position: relative;
  padding-left: 25px;
  margin-bottom: 12px;
  cursor: pointer;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .checkmark {
    position: absolute;
    top: 2px;
    left: 0;
    height: 15px;
    width: 15px;
    background-color: white;
    border: solid;
    border-width: 1px;
    border-color: rgb(160, 155, 155);
    border-radius: 3px;
  }
}
.checkbox-container input:checked ~ .checkmark {
  background-color: $color-light-blue;
  border: hidden;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}
.checkbox-container .checkmark:after {
  left: 5px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 1.5px 1.5px 0;
  transform: rotate(45deg);
}
.filtered-box {
  margin-bottom: 30px;
}
.flex-container {
  display: flex;
  justify-content: space-between;
}
span {
  span {
    color: rgb(160, 155, 155);
  }
  i {
    color: rgb(160, 155, 155);
    margin-right: 6px;
  }
}
.time-picker {
  padding-left: 40px;
}
.time-label {
  position: relative;
  left: 25px;
}
.time-border {
  border-bottom: solid;
  border-bottom-width: 2px;
  border-bottom-color: rgb(235, 235, 235);
  margin-left: -15px;
  margin-right: -15px;
  padding-top: 12px;
}
.applay-button {
  position: relative;
  left: 22%;
  height: 40px;
  width: 170px;
  background-color: white;
  text-decoration: none;
  border-radius: 3px;
  border-color: rgba($color-light-blue, 0.7);
  color: rgba($color-light-blue, 0.7);
  font-size: 14px;
  &:hover {
    color: white;
    background-color: rgba($color-light-blue, 0.7);
  }
}
</style>
