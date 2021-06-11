<template>
  <v-container>
    <v-data-table style="color:black"
    :headers="headers"
    :items="meseros"
    :items-per-page="5"
    >
      <template v-slot:top>
          <v-toolbar flat color="primary">
            <v-toolbar-title>Meseros</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color = 'success' @click='nl_dialog = true' >Nuevo Mesero</v-btn>
          </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{item}">
        <v-icon @click="eliminar_mesero(item)" small>
          fas fa-trash
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model='nl_dialog' max-width="500px">
      <v-card>
        <v-card-title>
          Nuevo Mesero
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols = '6'>
                <v-text-field v-model="nuevo_mesero.mro_nombre" label = 'Nombre'>
                </v-text-field>
              </v-col>
              <v-col cols = '6'>
                <v-select v-model="nuevo_mesero.mro_honorarios" label = 'Honorarios' type: int>
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols = '6'>
                <v-text-field v-model="nuevo_mesero.mro_direccion" label = 'Dirección'>
                </v-text-field>
              </v-col>
              <v-col cols = '6'>
                <v-text-field v-model="nuevo_mesero.mro_telefono" label = 'Teléfono'>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
                <v-col cols='auto'>
                    <v-text-field v-model="nuevo_mesero.mro_email" label = 'E-mail'>
                    </v-text-field>
                </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color = 'success' @click="guardar()">Guardar</v-btn>
          <v-btn color = 'error' @click="cancelar()">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>



<script>

  export default {
    name: 'Meseros',

    data () {
      return {
        headers: [
          { text: 'Identificador', color: 'red', align: 'start', sortable: false, value: 'mro_nue',},
          { text: 'Nombre', value: 'mro_nombre'},
          { text: 'Honorarios', value: 'mro_honorarios'},
          { text: 'Dirección', value: 'mro_direccion'},
          { text: 'Teléfono', value: 'mro_telefono'},
          { text: 'Email', value: 'mro_email'},
          { text: 'Acciones', value: 'actions'},  
        ],
        meseros: [
        ],

        nl_dialog: false,

        nuevo_mesero: {
          mro_nombre: '',
          mro_honoraios: '',
          mro_direccion: '',
          mro_telefono: '',
          mro_email: '',
        }
      }
    },

    created(){
      this.llenar_meseros();
    },

    methods:{
      async llenar_meseros(){
        const api_data = await this.axios.get('meseros/todos_los_meseros');
        this.meseros = api_data.data;
      },
    
      async eliminar_mesero(item){
        const body = {
          mro_nue: item.mro_nue
        };
        await this.axios.post('meseros/eliminar_mesero', body);
        this.llenar_meseros();
      },

      cancelar(){
          this.nuevo_mesero = {};
          this.nl_dialog = false;
      },

      async guardar(){
        await this.axios.post('meseros/nuevo_mesero', this.nuevo_mesero);
        this.llenar_meseros();
        this.cancelar();
      },

    },
    components: {

    },
  }
</script>