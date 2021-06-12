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
            sort-by="ord_id"
   >
            <template v-slot:top>
                <v-toolbar flat>
                   <v-spacer></v-spacer>
                   <v-btn color='success' @click="nl_dialog = true" >Nueva Orden</v-btn>
                </v-toolbar>
            </template>

            <template v-slot:[`item.actions`]="{item}">
                <v-icon @click="eliminar_orden(item)" small class="mr-3">
                    fas fa-trash
                </v-icon>
                <v-icon @click="editar_orden(item)" small>
                    fas fa-pencil-alt
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
                     <v-btn color='success' @click="guardar()">Guardar</v-btn>
                    <v-btn color="error" @click="cancelar()">Cancelar</v-btn> 
                   <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model='np_dialog' fullscreen>
             <v-card>
                <v-card-title>
                    Agregar Productos
                    <v-spacer></v-spacer>
                    <v-btn color='success' @click="agregar_renglon()">Agregar Producto</v-btn>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-select
                                  :items="categorias"
                                  v-model="selected.cat"
                                  label="Categoria"
                                  item-text="cat_nombre"
                                  item-value="cat_id"
                                >
                                </v-select>
                            </v-col>
                            <v-col cols="6">
                                <v-select
                                    :items="producto.filter(p => p.prod_cat_id === this.selected.cat)"
                                    v-model="detalles_pedido.dp_prod_id"
                                    label="Producto"
                                    item-text="prod_nombre"
                                    item-value="prod_id"
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols = '6'>
                                <v-text-field v-model="detalles_pedido.dp_cantidadPedida" label = 'Cantidad'>
                                </v-text-field>
                            </v-col>
                            <v-col cols = '6'>
                                <v-text-field v-model="detalles_pedido.dp_especificaciones" label = 'Especificaciones'>
                                </v-text-field>
                            </v-col>
                         </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn color='success' @click="guardardp()"> Guardar</v-btn>
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
              { text: 'Número de Orden', align: 'start', value: 'ord_id',},
              { text: 'Nombre del Mesero', value: 'mro_nombre' },
              { text: 'Fecha', value: 'ord_fecha' },
              { text: 'Estado', value: 'ord_pagada' },
              { text: 'Acciones', value: 'actions'}
            ],

            orden: [],
            mesero: [],
            producto:[],
            categorias:[],
            selected: [],

            nl_dialog: false,
            np_dialog: false,

            nueva_orden: {
                ord_mesa_id: this.id,
                ord_mro_nue: '',
                ord_pagada: 'n',
               },

            detalles_pedido: [],
        }
    },

    props: {
        id: {
        },
    },

    created(){
        this.llenar_orden(this.id);
        this.meseros();
        this.productos();
        this.llenar_categorias();
    },
    
    methods: {

        async meseros(){
            const api_data = await this.axios.get('/ordenes/meseros/');
            this.mesero = api_data.data;
        },

        async productos() {
            const api_data = await this.axios.get('/ordenes/productos/');
            this.producto = api_data.data;
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
            this.selected = {};
            this.detalles_pedido = {};
            this.np_dialog = false;
        },

        async guardardp(item){
            await this.axios.post('/ordenes/detalles_pedido', this.detalles_pedido);
            this.llenar_orden(this.id);
            this.cancelar();
        },

        async guardar(){
            await this.axios.post('/ordenes/nueva_orden', this.nueva_orden);
            this.llenar_orden(this.id);
            this.cancelar();
        },

        editar_orden(item){
            this.dp_ord_id = item.ord_id
            this.np_dialog = true;
      },
       
        agregar_renglon(){
            this.selected.push({
                cat: '',
            });
            this.detalles_pedido.push({
                dp_prod_id: '',
                dp_cantidadPedida: '',
                dp_especificaciones: '',
            });
        },

        async llenar_categorias(){
        const api_data = await this.axios.get('productos/obtener_categorias');
        this.categorias = api_data.data;
      },

       

    },
   
}
</script>
