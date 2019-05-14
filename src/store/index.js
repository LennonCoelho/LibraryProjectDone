import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { createModule } from 'vuex-toast'
import 'vuex-toast/dist/vuex-toast.css'
import * as actions from './modules/cleanStorage'
import SearchAddress from './modules/searchAddress'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    SearchAddress,
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
