<template>
  <v-app>
    <toast
      :key="0"
      position="se"
    />

    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Library</span>
        <span class="font-weight-light">Project</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link to="/">
        <v-btn
          flat
          href="#"
        >
          Home
        </v-btn>
      </router-link>

      <router-link to="/address">
        <v-btn
          flat
          href="#"
        >
          Buscar endereço
        </v-btn>
      </router-link>
    </v-toolbar>

    <v-content :class="$route.name">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { Toast } from 'vuex-toast'

export default {
  components: {
    Toast
  }
}
</script>
