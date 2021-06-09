<template>
  <v-app> 
    <v-app-bar app color="primary" height="120">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="ml-16">
        <v-img src="@/assets/logo.png" contain max-height="90" max-width="90"></v-img>
      </div>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" temporary color="secondary">
      <v-container class="mt-5" style="color:#FCD55F; text-align:center; font-size:30px; font-family: 'Suez One'">
      <v-row>
        <v-col>
	        <v-img src="@/assets/icon.png" contain height="250" width="250"></v-img> 
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <router-link style="display: inline-block; text-decoration: none" :to="{name: 'Home'}">Mesas</router-link>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <router-link style="display: inline-block; text-decoration: none" :to="{name: 'Clientes'}">Clientes</router-link>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <router-link style="display: inline-block; text-decoration: none" :to="{name: 'Productos'}">Productos</router-link>
        </v-col>
      </v-row>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar app color="primary" bottom>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: false,
  }),
};
</script>

<style>
#app {
  background: url('assets/background.png')
}
</style>