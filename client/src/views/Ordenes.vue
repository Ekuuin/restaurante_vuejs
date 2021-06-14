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
                <v-icon @click="detalles_orden(item), leer_pedidos(item)" small>
                    fas fa-eye
                </v-icon>
            </template>
        </v-data-table>

        <v-dialog v-model='nl_dialog' max-width="500px">
            <v-card style="background-color:#FCD55F">
                <v-card-title>Nueva Orden</v-card-title>
                <v-card-text>
                    <v-container style="background-color:#FC6C5F">
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
             <v-card style="background-color:#FCD55F">
                <v-card-title>
                    Detalles Orden No.{{dp_ord_id}}
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="agregar_producto()">Agregar Productos</v-btn>
                </v-card-title>
                <v-card-text>
                    <v-container style="background-color:#FC6C5F">
                        <v-data-table
                            :headers="h_prod"
                            :items="pedidos"
                            :items-per-page="10"
                            sort-by="ord_id"
                        >                
                            <template v-slot:[`item.actions`]="{item}">
                                <v-icon @click="eliminar_prod(item)" small class="mr-3">
                                    fas fa-trash
                                </v-icon>
                                <v-icon @click="detalles_producto(item)" small>
                                    fas fa-pencil-alt
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="pagar(), crear_factura(), desocupar_mesa()">Pagar</v-btn> 
                    <v-btn color="error" @click="salir()">Salir</v-btn> 
                   <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model='cantidad_dialog' max-width="500px">
             <v-card style="background-color:#FCD55F">
                <v-card-title>
                    Modificar cantidad
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <v-container style="background-color:#FC6C5F">
                        <v-text-field   v-model="det_pedido.dp_cantidadPedida"
                                        label="Cantidad">
                        </v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="editar_prod()">Guardar</v-btn> 
                    <v-btn color="error" @click="cancelar()">Cancelar</v-btn> 
                   <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model='prod_dialog' max-width="800">
             <v-card style="background-color:#FCD55F">
                <v-card-title>
                    Agregar Productos a Orden No.{{dp_ord_id}}
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="agregar_renglon()">Nuevo Producto</v-btn>
                </v-card-title>
                <v-card-text>
                    <v-container v-for="(articulo, index) in det_pedido" :key="index" style="background-color:#FC6C5F">
                            <v-row>
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
                                    <v-autocomplete
                                       :items="producto.filter(p => p.prod_cat_id === articulo.cat)"
                                       v-model="articulo.dp_prod_id"
                                       label="Producto"
                                       item-text="prod_nombre"
                                       item-value="prod_id"
                                       :disabled="articulo.cat.length == 0"
                                    >
                                    </v-autocomplete>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols = '6'>
                                    <v-text-field 
                                        v-model="articulo.dp_cantidadPedida" 
                                        label = 'Cantidad' 
                                        single-line 
                                        filled
                                        :disabled="articulo.dp_prod_id.length == 0">
                                    </v-text-field>
                                </v-col>
                                <v-col cols = '6'>
                                    <v-text-field 
                                        v-model="articulo.dp_especificaciones" 
                                        label = 'Especificaciones' 
                                        single-line 
                                        filled
                                        :disabled="articulo.dp_prod_id.length == 0">
                                    </v-text-field>
                                </v-col>
                                <hr style="height: 5px ; width: 100%; background-color: #FCD55F; border-color: #FCD55F; border-top: #FCD55F; border-left: #FCD55F">
                            </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color='success' @click="guardar_dp()">Guardar</v-btn>
                    <v-btn color="error" @click="cancelar()">Cancelar</v-btn> 
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
              { text: 'Estado', value: 'ord_estado' },
              { text: 'Acciones', value: 'actions'}
            ],

            h_prod: [
              { text: 'Identificador del producto', align: 'start', value: 'dp_prod_id',},
              { text: 'Nombre del producto', value: 'prod_nombre' },
              { text: 'Precio Unitario', value: 'prod_precio' },
              { text: 'Cantidad', value: 'dp_cantidadPedida' },
              { text: 'Subtotal', value: 'subtotal' },
              { text: 'Acciones', value: 'actions'}
            ],

            orden: [],
            mesero: [],
            producto:[],
            categorias:[],
            det_pedido:[],
            pedidos:[],

            dp_ord_id: '',
            dp_prod_id: '',

            nl_dialog: false,
            np_dialog: false,
            prod_dialog: false,
            cantidad_dialog: false,

            nueva_orden: {
                ord_mesa_id: this.id,
                ord_mro_nue: '',
                ord_estado: 'ABIERTA',
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

        async leer_pedidos(){
            const body = {
              ord_id: this.dp_ord_id
            };
            const api_data = await this.axios.get('/ordenes/todos_los_pedidos', {params: body});
            this.pedidos = api_data.data;
        },

        async guardar_dp(){
            const body = {
                dp_ord_id: this.dp_ord_id,
                dp_prod_id: '',
                dp_cantidadPedida: '',
                dp_especificaciones: '',
            };
            this.det_pedido.forEach(async (articulo) => {
                body.dp_prod_id = articulo.dp_prod_id;
                body.dp_cantidadPedida = articulo.dp_cantidadPedida;
                body.dp_especificaciones = articulo.dp_especificaciones;
                await this.axios.post('/ordenes/detalles_pedido/', body);
            });
            this.cancelar();
            this.leer_pedidos();
        },

        async guardar(){
            await this.axios.post('/ordenes/nueva_orden', this.nueva_orden);
            this.llenar_orden(this.id);
            this.cancelar();
        },
        
        async eliminar_orden(item){
            const body = {
              ord_id: item.ord_id
            };
            await this.axios.post('/ordenes/eliminar_orden/', body);
            this.llenar_orden(this.id);
        },

        async eliminar_prod(item){
            const body = {
              dp_prod_id: item.dp_prod_id,
              dp_ord_id: this.dp_ord_id
            };
            await this.axios.post('/ordenes/eliminar_prod/', body);
            this.leer_pedidos();
        },

        async pagar(){
            const body = {
                dp_ord_id: this.dp_ord_id
            };
            await this.axios.post('/ordenes/pagar_orden/', body);
            this.llenar_orden(this.id);
            this.salir();
        },

        async crear_factura(){
            const body = {
                dp_ord_id: this.dp_ord_id
            };
            await this.axios.post('/ordenes/crear_factura/', body);
        },

        async desocupar_mesa(){
            const body = {
                mesa_id: this.id
                };
            console.log(body.mesa_id);
            await this.axios.post('/ordenes/desocupar_mesa', body);
        },

        async editar_prod(){
            const body = {
                dp_prod_id : this.dp_prod_id,
                dp_ord_id : this.dp_ord_id,
                dp_cantidadPedida : this.det_pedido.dp_cantidadPedida,
            };
            console.log(body);
            await this.axios.post('/ordenes/editar_prod', body);
            this.cancelar();
            this.leer_pedidos();
        },
       

        detalles_orden(item){
            this.dp_ord_id = item.ord_id;
            this.np_dialog = true;
        },

        detalles_producto(item){
            this.dp_prod_id = item.dp_prod_id;
            this.cantidad_dialog = true;
        },

        agregar_producto(){
            this.prod_dialog = true;
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
            this.det_pedido = [];
            this.prod_dialog = false;
            this.cantidad_dialog = false;
        },

        salir(){
            this.np_dialog = false;
        },

        

    },
   
}
</script>
