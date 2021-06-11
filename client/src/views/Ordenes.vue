<template>
    <v-container>
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols='auto'>
                <a 
                style="color:#FCD55F; 
                    font-family: 'Suez One'; 
                    font-size: 50px; 
                    text-stroke: 0.2px black; 
                    text-shadow: -1px 1px 1px #000, 1px 1px 1px #000, -1px 1px 1px #000, 1px -1px 1px #000">
                    Órdenes - Mesa {{$route.params.id}}
                </a>
            </v-col>
            <v-spacer></v-spacer>
      </v-row>
        <v-data-table
            :headers="headers"
            :items="orden"
            :items-per-page="5"
   >
            <template v-slot:top>
                <v-toolbar flat>
                   <v-spacer></v-spacer>
                   <v-btn color='success' @click="nl_dialog = true" >Nueva Orden</v-btn>
                </v-toolbar>
            </template>

            <template v-slot:[`item.actions`]="{item}">
                <v-icon @click="eliminar_orden(item)" small>
                    fas fa-trash
                </v-icon>
            </template>
        </v-data-table>

        <v-dialog v-model='nl_dialog' max-width="500px">
            <v-card>
                <v-card-title>Nueva Orden</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-select
                                  :items="mesero"
                                  v-model="nueva_orden.ord_mro_nue"
                                  label="Meseros"
                                  item-text="mro_nombre"
                                  item-value="mro_nue"
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn color='success' @click="guardar()"> Guardar</v-btn>
                    <v-btn color="error" @click="cancelar()"> Cancelar</v-btn> 
                   <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
export default {
    name: 'Orden',

    data(){
        return{
            headers: [
              { text: 'Número de Orden', align: 'start', sortable: false, value: 'ord_id',},
              { text: 'Nombre del Mesero', value: 'mro_nombre' },
              { text: 'Fecha', value: 'ord_fecha' },
              { text: 'Estado', value: 'ord_pagada' },
              { text: 'Acciones', value: 'actions'}
            ],

            orden: [
            ],
            mesero: [
            ],

            nl_dialog: false,

            nueva_orden: {
                ord_mesa_id: this.id,
                ord_mro_nue: '',
                ord_pagada: 'n',
               },
        }
    },

    props: {
        id: {
        },
    },

    created(){
        this.llenar_orden(this.id);
        this.meseros();
    },
    
    methods: {

        async meseros(){
            const api_data = await this.axios.get('/ordenes/meseros/');
            this.mesero = api_data.data;
        },

        async llenar_orden(id){
            const body = {
                mesa_id: id
                };
            const api_data = await this.axios.get('/ordenes/todas_las_ordenes/', {params: body});
            this.orden = api_data.data;
        },

        async eliminar_orden(item){
            const body = {
              ord_id: item.ord_id
            };
            await this.axios.post('/ordenes/eliminar_orden/', body);
            this.llenar_orden(this.id);
        },

        cancelar(){
            this.nueva_orden.ord_mro_nue = {};
            this.nl_dialog = false;
        },

        async guardar(){
            await this.axios.post('/ordenes/nueva_orden', this.nueva_orden);
            this.llenar_orden(this.id);
            this.cancelar();
        },

    },
   
}
</script>
