<template>
  <v-app>
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
export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>
