import axios from 'axios'
import Vue from 'vue'
import _ from 'lodash'
import Const from '../../helper/const'

export const GET_ALL_BOOKS = 'GET_ALL_BOOKS'
export const ADD_BOOK = 'ADD_BOOK'
export const EDIT_BOOK = 'EDIT_BOOK'
export const DELETE_BOOK = 'DELETE_BOOK'
export const SET_SELECTED_BOOK = 'SET_SELECTED_BOOK'
export const CLEAR_BOOKS_STORE = 'CLEAR_BOOKS_STORE'

const state = {
  allBooks: [],
  selectedBook: {}
}

const getters = {
  getterAllBooks: (state) => state.allBooks,
  getterSelectedBook: (state) => state.selectedBook
}

const mutations = {
  [GET_ALL_BOOKS] (state, value) {
    state.allBooks = value
  },
  [ADD_BOOK] (state, book) {
    state.allBooks = state.allBooks.concat(book)
  },
  [EDIT_BOOK] (state, book) {
    let index = _.findIndex(state.allBooks, { id: book.id })

    if (index > -1) {
      Vue.set(state.allBooks, index, book)
    }
  },
  [DELETE_BOOK] (state, book) {
    let index = _.findIndex(state.allBooks, { id: book.id })

    if (index > -1) {
      state.allBooks.splice(index, 1)
    }
  },
  [SET_SELECTED_BOOK] (state, book) {
    if (book) {
      state.selectedBook = book
    } else {
      state.selectedBook = {}
    }
  },
  [CLEAR_BOOKS_STORE] (state) {
    state.allBooks = []
    state.selectedBook = {}
  }
}

const actions = {
  actionGetAllBooks ({ commit }) {
    return axios({
      method: 'get',
      url: Const.API_BOOKS
    })
      .then((response) => {
        commit(GET_ALL_BOOKS, response.data)
        return Promise.resolve(response)
      })
      .catch((e) => Promise.reject(e))
  },
  actionAddBook ({ commit }, book) {
    return axios({
      method: 'post',
      url: Const.API_BOOKS,
      data: book
    })
      .then((response) => {
        commit(ADD_BOOK, response.data)
        return Promise.resolve(response)
      })
      .catch((e) => Promise.reject(e))
  },
  actionEditBook ({ commit }, book) {
    return axios({
      method: 'put',
      url: `${Const.API_BOOKS}/${book.id}`,
      data: book
    })
      .then((response) => {
        commit(EDIT_BOOK, response.data)
        return Promise.resolve(response)
      })
      .catch((e) => Promise.reject(e))
  },
  actionDeleteBook ({ commit }, book) {
    return axios({
      method: 'delete',
      url: `${Const.API_BOOKS}/${book.id}`
    })
      .then((response) => {
        commit(DELETE_BOOK, book)
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
