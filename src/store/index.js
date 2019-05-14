import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { createModule } from 'vuex-toast'
import 'vuex-toast/dist/vuex-toast.css'
import * as actions from './modules/cleanStorage'
<<<<<<< HEAD
import Books from './modules/books'
=======
import SearchAddress from './modules/searchAddress'
>>>>>>> d3514a376740dcebce080d7cd409d4dc30f5b7c3

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
<<<<<<< HEAD
    Books,
=======
    SearchAddress,
>>>>>>> d3514a376740dcebce080d7cd409d4dc30f5b7c3
    toast: createModule({
      dismissInterval: 3000
    })
  },
  strict: false,
  plugins: [
    createPersistedState({
      key: 'vuex-library.project'
    })
  ]
})
