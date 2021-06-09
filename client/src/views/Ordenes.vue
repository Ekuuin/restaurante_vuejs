<template>
    <v-container>
        <v-data-table
            :headers="headers"
            :items="orden"
            :items-per-page="5"
   >
            <template v-slot:top>
                <v-toolbar flat>
                   <v-toolbar-title>Orden</v-toolbar-title>
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
    </v-container>
</template>

<script>
export default {
    name: 'Orden',

    data(){
        return{
            headers: [
              { text: 'Número de Orden', align: 'start', sortable: false, value: 'ord_id',},
              { text: 'Número de Mesa', value: 'ord_mesa_id' },
              { text: 'Nombre del Mesero', value: 'mro_nombre' },
              { text: 'Producto', value: 'prod_nombre' },
              { text: 'Cantidad', value: 'dp_cantidadPedida' },
              { text: 'Precio por Unidad', value: 'prod_precio' },
              { text: 'Acciones', value: 'actions'}
            ],

            orden: [
            ],
            mesero: [
            ],

            nl_dialog: false,

            nueva_orden: {
                ord_mesa_id: '',
                mro_nombre: '',
                ord_fecha: '',
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
            const api_data = await this.axios.get('/mesa/meseros/');
            this.mesero = api_data.data;
        },

        async llenar_orden(id){
            const body = {
                mesa_id: id
                };
            const api_data = await this.axios.get('/mesa/todas_las_ordenes/', {params: body});
            this.orden = api_data.data;
        },

        async eliminar_orden(item){
            const body = {
              us_id: item.us_id
            };
            await this.axios.post('/prestamos/eliminar_orden/', body);
            this.llenar_orden();
        },

        cancelar(){
            this.nueva_orden = {};
            this.nl_dialog = false;
        },

        async guardar(){
            await this.axios.post('/orden/nueva_orden/', this.nueva_orden);
            this.llenar_orden();
            this.cancelar();
        },

    },
   
}
</script>
