import { CLEAR_BOOKS_STORE } from './books'

export const cleanStorage = ({ commit }) => {
  const mutations = [
    CLEAR_BOOKS_STORE
  ]

  mutations.map(mutation => commit(mutation))
}
