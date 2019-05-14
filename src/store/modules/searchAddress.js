import axios from 'axios'
import Const from '../../helper/const'

export const GET_ADDRESS_FROM_CEP = 'GET_ADDRESS_FROM_CEP'
export const CLEAR_SEARCH_ADDERSS_STORE = 'CLEAR_SEARCH_ADDERSS_STORE'

const state = {
  addressFromCep: {}
}

const getters = {
  getterAddressFromCep: (state) => state.addressFromCep
}

const mutations = {
  [GET_ADDRESS_FROM_CEP] (state, value) {
    state.addressFromCep = value
  },
  [CLEAR_SEARCH_ADDERSS_STORE] (state) {
    state.addressFromCep = {}
  }
}

const actions = {
  actionGetAddressFromCep ({ commit }, cep) {
    return axios({
      method: 'get',
      url: `${Const.API_VIACEP}/${cep}/json/`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        commit(GET_ADDRESS_FROM_CEP, response.data)
        return Promise.resolve(response)
      })
      .catch((e) => Promise.reject(e))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
