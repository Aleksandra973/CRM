import {BaseService} from "./base.service";
import {ErrorWrapper, ResponseWrapper} from "./util";
import $store from "../store";

export class OrderSevice extends BaseService {
  static get entity() {
    return "orders";
  }

  static get combineParams() {
    var filters = $store.state.orderFilters.currentOrderFilters;
    var res = "";
    if (filters.status && filters.status.length > 0) {
      res += `?status=${filters.status[0]}`;
    }
    return res;
  }

  static async getOrders() {
    try {
      const response = await this.request({auth: false}).get(
        `${this.entity}${this.combineParams}`
      );
      return new ResponseWrapper(response, response.data);
    } catch (error) {
      const message = error.response.data
        ? error.response.data.error
        : error.response.statusText;
      throw new ErrorWrapper(error, message);
    }
  }

  static async getOrderInfo(id) {
    try {
      const response = await this.request({auth: false}).get(`orderInfo?id=${id}`);
      return new ResponseWrapper(response, response.data);
    } catch (error) {
      const message = error.response.data
        ? error.response.data.error
        : error.response.statusText;
      throw new ErrorWrapper(error, message);
    }
  }

}
