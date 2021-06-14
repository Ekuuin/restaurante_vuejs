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
            <v-btn color = 'success' @click='mf_dialog = true' class= 'mr-3' >Factura Mesero-Fecha</v-btn>
            <v-btn color = 'success' @click='mesaf_dialog = true' class= 'mr-3' >Factura Mesa-Fecha</v-btn>
            <v-btn color = 'success' @click='fecha_dialog = true'>Facturas por Fecha</v-btn>
          </v-toolbar>
      </template>
        </v-data-table>

        <v-dialog v-model='mesaf_dialog' max-width="500px">
            <v-card style="background-color:#FCD55F">
                <v-card-title>Factura por Mesa-Fecha</v-card-title>
                <v-card-text>
                    <v-container style="background-color:#FC6C5F">
                      <v-row>
                        <v-col cols='6'>
                          <v-select
                          v-model="select.mesa_id"
                          :items="mesas"
                          label="Número de mesa"
                          item-text="mesa_id"
                          item-value="mesa_id">
                          </v-select>
                        </v-col>
                      </v-row>
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
                              v-model="select.ord_fecha"
                              label="Fecha"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="select.ord_fecha"
                            @input="menu1 = false"
                          ></v-date-picker>
                        </v-menu>
                        </v-col>
                      </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color='success' @click="mostrar_por_mf()">Mostrar</v-btn>
                    <v-btn color="error" @click="cancelar()">Cancelar</v-btn> 
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model='mf_dialog' max-width="500px">
            <v-card style="background-color:#FCD55F">
                <v-card-title>Factura por Mesero-Fecha</v-card-title>
                <v-card-text>
                    <v-container style="background-color:#FC6C5F">
                      <v-row>
                        <v-col cols='6'>
                          <v-select
                          v-model="select.mro_nue"
                          :items="mesero"
                          label="Meseros"
                          item-text="mro_nombre"
                          item-value="mro_nue">
                          </v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols=6>
                          <v-menu
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="select.ord_fecha"
                              label="Fecha"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="select.ord_fecha"
                            @input="menu2 = false"
                          ></v-date-picker>
                        </v-menu>
                        </v-col>
                      </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color='success' @click="mostrar_por_mf()">Mostrar</v-btn>
                    <v-btn color="error" @click="cancelar()">Cancelar</v-btn> 
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model='fecha_dialog' max-width="500px">
            <v-card style="background-color:#FCD55F">
                <v-card-title>Factura por Fecha</v-card-title>
                <v-card-text>
                    <v-container style="background-color:#FC6C5F">
                      <v-row>
                        <v-col cols=6>
                          <v-menu
                          v-model="menu3"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="select.ord_fecha"
                              label="Fecha"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="select.ord_fecha"
                            @input="menu3 = false"
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
          { text: 'Fecha', value: 'ord_fecha'},
          { text: 'Total', value: 'fac_total'},
          { text: 'Acciones', value: 'actions'},
        ],
    

        orden:[],
        mesero:[],
        mesas:[],

        select: {
            ord_fecha: '',
            mro_nue: '',
            mesa_id: '',
 
        },

        menu1: false,
        menu2: false,
        menu3: false,


        

        nl_dialog: false,
        fecha_dialog: false,
        mf_dialog: false,
        mesaf_dialog: false,

        nueva_factura: {
                ord_mesa_id: this.id,
                ord_mro_nue: '',
               
               },

        
      }
    },

    created(){    
        this.llenar_meseros();
        this.llenar_mesa();
    },

    methods: {

        async llenar_mesa(){
        const api_data = await this.axios.get('mesas/llenar_mesa');
        this.mesas = api_data.data;
        },

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
            ord_fecha : this.select.ord_fecha
         };
        const api_data = await this.axios.get('facturas/mostrar_por_fecha', {params: body});
        this.orden= api_data.data;
        this.cancelar(); 
        },

        async mostrar_por_mf(){
          const body = {
            ord_fecha : this.select.ord_fecha,
            mro_nue : this.select.mro_nue
          };
          const api_data = await this.axios.get('facturas/mostrar_por_mf', {params: body});
          this.orden= api_data.data;
          this.cancelar(); 
        },

        async mostrar_por_mesaf(){
          const body = {
            ord_fecha : this.select.ord_fecha,
            mesa_id : this.select.mesa_id
          };
          const api_data = await this.axios.get('facturas/mostrar_por_mesaf', {params: body});
          this.orden= api_data.data;
          this.cancelar(); 
        },

        cancelar(){
          this.select = {};
          this.fecha_dialog = false;
          this.mf_dialog = false;
          this.mesaf_dialog = false;
        },
      
    
   

    },
    components: {
      

    },
  }
</script>
