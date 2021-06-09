<template>
  <v-container>
    <v-data-table style="color:black"
    :headers="headers"
    :items="productos"
    :items-per-page="5"
    >
      <template v-slot:top>
          <v-toolbar flat color="primary">
            <v-toolbar-title>Productos</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color = 'success' @click='nl_dialog = true' >Nuevo Producto</v-btn>
          </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{item}">
        <v-icon @click="eliminar_producto(item)" small>
          fas fa-trash
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model='nl_dialog' max-width="500px">
      <v-card>
        <v-card-title>
          Nuevo Producto
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols = '6'>
                <v-text-field v-model="nuevo_producto.prod_nombre" label = 'Nombre'>
                </v-text-field>
              </v-col>
              <v-col cols = '6'>
                <v-select v-model="nuevo_producto.prod_cat_id" label = 'Categoria' :items="categorias" item-text="cat_nombre" item-value="cat_id">
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols = '6'>
                <v-text-field v-model="nuevo_producto.prod_precio" label = 'Precio'>
                </v-text-field>
              </v-col>
              <v-col cols = '6'>
                <v-text-field v-model="nuevo_producto.prod_existencia" label = 'Existencia'>
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
    name: 'Productos',

    data () {
      return {
        headers: [
          { text: 'Identificador', color: 'red', align: 'start', sortable: false, value: 'prod_id',},
          { text: 'Nombre', value: 'prod_nombre'},
          { text: 'Categoría', value: 'cat_nombre'},
          { text: 'Precio', value: 'prod_precio'},
          { text: 'Existencia', value: 'prod_existencia'},
          { text: 'Acciones', value: 'actions'},  
        ],
        productos: [
        ],
        categorias: [
        ],

        nl_dialog: false,

        nuevo_producto: {
          prod_nombre: '',
          cat_nombre: '',
          prod_precio: '',
          prod_existencia: '',
        }
      }
    },

    created(){
      this.llenar_productos();
      this.llenar_categorias();
    },

    methods:{
      async llenar_productos(){
        const api_data = await this.axios.get('productos/todos_los_productos');
        this.productos = api_data.data;
      },
      
      async llenar_categorias(){
        const api_data = await this.axios.get('productos/obtener_categorias');
        this.categorias = api_data.data;
      },

      async eliminar_producto(item){
        const body = {
          prod_id: item.prod_id
        };
        await this.axios.post('productos/eliminar_producto', body);
        this.llenar_productos();
      },

      cancelar(){
          this.nuevo_producto = {};
          this.nl_dialog = false;
      },

      async guardar(){
        await this.axios.post('productos/nuevo_producto', this.nuevo_producto);
        this.llenar_productos();
        this.cancelar();
      },

    },
    components: {

    },
  }
</script>