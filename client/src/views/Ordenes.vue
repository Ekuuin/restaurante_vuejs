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
            :items-per-page="10"
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

        <v-dialog v-model='np_dialog' max-width="800px" persistent>
             <v-card style="background-color:#FC6C5F">
                <v-card-title>
                    Agregar Productos
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="agregar_renglon()">Agregar Producto</v-btn>
                </v-card-title>
                <v-card-text>
                    <v-container v-for="(articulo, index) in det_pedido" :key="index" style="background-color:#FCD55F">
                            <v-row>
                                {{det_pedido.index}}
                                <v-col cols="6">
                                    <v-select
                                     :items="categorias"
                                     v-model="articulo.cat"
                                     label="Categoria"
                                     item-text="cat_nombre"
                                     item-value="cat_id"
                                    >
                                    </v-select>
                                </v-col>
                                <v-col cols="6">
                                    <v-select
                                       :items="producto.filter(p => p.prod_cat_id === articulo.cat)"
                                       v-model="articulo.dp_prod_id"
                                       label="Producto"
                                       item-text="prod_nombre"
                                       item-value="prod_id"
                                    >
                                    </v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols = '6'>
                                    <v-text-field v-model="articulo.dp_cantidadPedida" label = 'Cantidad' single-line filled>
                                    </v-text-field>
                                </v-col>
                                <v-col cols = '6'>
                                    <v-text-field v-model="articulo.dp_especificaciones" label = 'Especificaciones' single-line filled>
                                    </v-text-field>
                                </v-col>
                                <hr style="height: 5px ; width: 100%; background-color: #FC6C5F; border-color: #FC6C5F; border-top: #FC6C5F; border-left: #FC6C5F">
                            </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color='success' @click="guardar_dp()"> Guardar</v-btn>
                    <v-btn color="error" @click="cancelar()"> Cancelar</v-btn> 
                   <v-spacer></v-spacer>
                </v-card-actions>
                {{det_pedido}}
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
            det_pedido:[],

            dp_ord_id: '',

            nl_dialog: false,
            np_dialog: false,

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
        this.llenar_meseros();
        this.llenar_productos();
        this.llenar_categorias();
    },
    
    methods: {

        async llenar_meseros(){
            const api_data = await this.axios.get('/ordenes/meseros/');
            this.mesero = api_data.data;
        },

        async llenar_categorias(){
        const api_data = await this.axios.get('productos/obtener_categorias');
        this.categorias = api_data.data;
        },

        async llenar_productos() {
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

        async guardar_dp(item){
            const body = {
                dp_ord_id: this.dp_ord_id,
                dp_prod_id: '',
                dp_cantidadPedida: '',
                dp_especificaciones: '',
            };
            this.det_prestamo.forEach(async (articulo) => {
                body.dp_prod_id = articulo.dp_prod_id;
                body.dp_cantidadPedida = articulo.dp_cantidadPedida;
                body.dp_especificaciones = articulo.dp_especificaciones;
                await this.axios.post('/ordenes/detalles_pedido/', body);
            });
            this.cancelar();
        },

        async guardar(){
            await this.axios.post('/ordenes/nueva_orden', this.nueva_orden);
            this.llenar_orden(this.id);
            this.cancelar();
        },

        editar_orden(item){
            this.dp_ord_id = item.ord_id;
            this.np_dialog = true;
        },
       
        agregar_renglon(){
            this.det_pedido.push({
                cat: '',
                dp_prod_id: '',
                dp_cantidadPedida: '',
                dp_especificaciones: '',
            });
        },

        cancelar(){
            this.nueva_orden.ord_mro_nue = {};
            this.nl_dialog = false;
            this.np_dialog = false;
            this.det_pedido = [];
        },

       

    },
   
}
</script>
