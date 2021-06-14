<template>
    <v-container>
        <v-data-table style="color:black"
    :headers="headers"
    :items="orden"
    :items-per-page="5">
     <template v-slot:top>
          <v-toolbar flat color="primary">
            <v-toolbar-title>Facturas</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color = 'success' @click="mostrar_las_facturas()" class= 'mr-3'>Todas las facturas</v-btn>
            <v-btn color = 'success' @click='nl_dialog = true' class= 'mr-3' >Factura Mesero-Fecha</v-btn>
            <v-btn color = 'success' @click='fecha_dialog = true'>Facturas por Fecha</v-btn>
          </v-toolbar>
      </template>
        </v-data-table>
        <v-dialog v-model='nl_dialog' max-width="500px">
            <v-card>
                <v-card-title>
                    orde mesero-fecha
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                           <v-col cols="12">
                               
                                <v-select
                                  :items="mesero"
                                  v-model="nueva_factura.ord_mro_nue"
                                  label="Meseros"
                                  item-text="mro_nombre"
                                  item-value="mro_nue"
                                >
                                </v-select>
                                
                          </v-col> 
                        </v-row>
                        
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model='fecha_dialog' max-width="500px">
            <v-card style="background-color:#FCD55F">
                <v-card-title>factura por fecha</v-card-title>
                <v-card-text>
                    <v-container style="background-color:#FC6C5F">
                      <v-row>
                        <v-col cols=6>
                          <v-menu
                          v-model="menu1"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="por_fecha.ord_fecha"
                              label="Facturas por Fecha"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="por_fecha.ord_fecha"
                            @input="menu1 = false"
                          ></v-date-picker>
                        </v-menu>
                        </v-col>
                      </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color='success' @click="mostrar_por_fecha()">Mostrar</v-btn>
                    <v-btn color="error" @click="cancelar()">Cancelar</v-btn> 
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
export default {
    name: 'Facturas',

    data () {
      return {
          headers: [
          { text: 'Identificador', color: 'red', align: 'start', sortable: true, value: 'ord_id',},
          { text: 'Mesa', value: 'ord_mesa_id'},
          { text: 'Mesero', value: 'mro_nombre'},
          { text: 'fecha', value: 'ord_fecha'},
          { text: 'Total', value: 'fac_total'},
          { text: 'Acciones', value: 'actions'},
        ],
    

        orden:[],
        mesero:[],

        por_fecha: {
            ord_fecha: '',
 
        },

        menu1: false,


        

        nl_dialog: false,
        fecha_dialog: false,

        nueva_factura: {
                ord_mesa_id: this.id,
                ord_mro_nue: '',
               
               },

        
      }
    },

    created(){    
        this.llenar_meseros();
    },

    methods: {
        async llenar_meseros(){
            const api_data = await this.axios.get('/ordenes/meseros/');
            this.mesero = api_data.data;
        },

        async mostrar_las_facturas(){
        const api_data = await this.axios.get('facturas/mostrar_las_facturas');
        this.orden= api_data.data;
        },

        async mostrar_por_fecha(){
          const body = {
            ord_fecha : this.por_fecha.ord_fecha
         }
        const api_data = await this.axios.get('facturas/mostrar_por_fecha', {params: body});
        this.orden= api_data.data;
        },

        cancelar(){
          this.fecha_dialog = false;
        },
      
    
   

    },
    components: {
      

    },
  }
</script>
