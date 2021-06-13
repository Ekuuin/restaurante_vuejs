<template>
  <v-container>
      <v-row class='ml-16'>
        <v-spacer></v-spacer>
        <v-col cols='auto'>
          <a 
          style="color:#FCD55F; 
              font-family: 'Suez One'; 
              font-size: 50px; 
              text-stroke: 0.2px black; 
              text-shadow: -1px 1px 1px #000, 1px 1px 1px #000, -1px 1px 1px #000, 1px -1px 1px #000">
              Mesas
          </a>
          </v-col>
          <v-spacer></v-spacer>
      </v-row>

    <v-container v-if="disp !== null" class='mx-5' style="color:#FCD55F; 
      font-family: 'Suez One'; 
      font-size: 25px; 
      text-stroke: 0.2px black; 
      text-shadow: -1px 1px 1px #000, 1px 1px 1px #000, -1px 1px 1px #000, 1px -1px 1px #000">
      <v-row>
        <v-spacer></v-spacer>
        <div v-show="disp[0].cli_id !== null">
          <v-img  class='mt-10' src="@/assets/disp.png" contain max-height="70" max-width="70"></v-img>
        </div>
        <v-col cols='auto'>
          <router-link :to="{name: 'Ordenes', params: {id: 1}}"><v-img src="@/assets/mesa.png" contain height="130" width="100"></v-img></router-link>
        </v-col>
        <span> 
          <br>No.1
          <br>Capacidad {{mesas_capacidad[0].mesa_capacidad}}
        </span>
        <v-spacer></v-spacer>
        <div v-show="disp[1].cli_id !== null">
          <v-img  class='mt-10' src="@/assets/disp.png" contain max-height="70" max-width="70"></v-img>
        </div>
        <v-col cols='auto'>
          <router-link :to="{name: 'Ordenes', params: {id: 2}}"><v-img src="@/assets/mesa.png" contain height="130" width="100"></v-img></router-link>
        </v-col>
        <span> 
          <br>No.2
          <br>Capacidad {{mesas_capacidad[1].mesa_capacidad}}
        </span>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <div v-show="disp[2].cli_id !== null">
          <v-img  class='mt-10' src="@/assets/disp.png" contain max-height="70" max-width="70"></v-img>
        </div>
        <v-col cols='auto'>
        <router-link :to="{name: 'Ordenes', params: {id: 3}}"><v-img src="@/assets/mesa.png" contain height="130" width="100"></v-img></router-link>
        </v-col>
        <span>
                <br>No.3
                <br>Capacidad {{mesas_capacidad[2].mesa_capacidad}}
        </span>
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        <div v-show="disp[3].cli_id !== null">
          <v-img  class='mt-10' src="@/assets/disp.png" contain max-height="70" max-width="70"></v-img>
        </div>
        <v-col cols='auto'>
        <router-link :to="{name: 'Ordenes', params: {id: 4}}"><v-img src="@/assets/mesa.png" contain height="130" width="100"></v-img></router-link>
        </v-col>
        <span>
                <br>No.4
                <br>Capacidad {{mesas_capacidad[3].mesa_capacidad}}
        </span>
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        <div v-show="disp[4].cli_id !== null">
          <v-img class='mt-10' src="@/assets/disp.png" contain max-height="70" max-width="70"></v-img>
        </div>
        <v-col cols='auto'>
        <router-link :to="{name: 'Ordenes', params: {id: 5}}"><v-img src="@/assets/mesa.png" contain height="130" width="100"></v-img></router-link>
        </v-col>
        <span>
                <br>No.5
                <br>Capacidad {{mesas_capacidad[4].mesa_capacidad}}
        </span>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <div v-show="disp[5].cli_id !== null">
          <v-img class='mt-10' src="@/assets/disp.png" contain max-height="70" max-width="70"></v-img>
        </div>
        <v-col cols='auto'>
        <router-link :to="{name: 'Ordenes', params: {id: 6}}"><v-img src="@/assets/mesa.png" contain height="130" width="100"></v-img></router-link>
        </v-col>
        <span>
                <br>No.6
                <br>Capacidad {{mesas_capacidad[5].mesa_capacidad}}
        </span>
        <v-spacer></v-spacer>
        <div v-show="disp[6].cli_id !== null">
          <v-img class='mt-10' src="@/assets/disp.png" contain max-height="70" max-width="70"></v-img>
        </div>
        <v-col cols='auto'>
        <router-link :to="{name: 'Ordenes', params: {id: 7}}"><v-img src="@/assets/mesa.png" contain height="130" width="100"></v-img></router-link>
        </v-col>
        <span>
                <br>No.7
                <br>Capacidad {{mesas_capacidad[6].mesa_capacidad}}
        </span>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </v-container>
</template>



<script>

  export default {
    name: 'Home',

    data () {
      return {
        disp: null,

        mesas_capacidad: [],
      }
    },

    created(){
      this.mesas_disponibles();
      this.llenar_capacidad();
    },

    methods: {
      async mesas_disponibles(){
        const api_data = await this.axios.get('/mesas/mesas_disponibles/');
        this.disp = api_data.data;
      },

      async llenar_capacidad(){
        const api_data = await this.axios.get('mesas/llenar_capacidad');
        this.mesas_capacidad = api_data.data;
      },

    },

    components: {
      

    },
  }
</script>

