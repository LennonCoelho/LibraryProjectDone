import { CLEAR_SEARCH_ADDERSS_STORE } from './searchAddress'

export const cleanStorage = ({ commit }) => {
  const mutations = [
    CLEAR_SEARCH_ADDERSS_STORE
  ]

  mutations.map(mutation => commit(mutation))
}
