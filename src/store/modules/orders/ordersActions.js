import { OrderSevice } from '@/services/order.service'

export default {
  getOrders ({ commit }) {
    return OrderSevice.getOrders()
      .then(order => commit('SET_ORDERS', order.data))
      .catch(error => commit('toast/NEW', { type: 'error', message: error.message }, { root: true }))
  }
}
