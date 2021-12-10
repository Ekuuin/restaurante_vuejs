<template>
  <v-container>
    <v-data-table
      style="color: black"
      :headers="headers"
      :items="productos"
      :sort-by="['prod_id']"
      :items-per-page="10"
    >
      <template v-slot:top>
        <v-toolbar flat color="primary">
          <v-toolbar-title>Productos</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            @click="nuevoProducto_dialog = true"
            class="mr-3"
            >Nuevo Producto</v-btn
          >

          <v-btn color="success" @click="nuevaCategoria_dialog = true"
            >Nueva Categoría</v-btn
          >
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="eliminar_producto(item)" small class="mr-3"> fas fa-trash </v-icon>
        <v-icon @click="editar_producto(item)" small> fas fa-pencil-alt</v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="nuevoProducto_dialog" max-width="400px">
      <v-card elevation="1" style="background-color: #fcd55f">
        <v-card-title> Nuevo Producto </v-card-title>
        <v-card-text>
          <v-container style="background-color: #fc6c5f">
            <v-row no-gutters>
              <v-col cols="12">
                <v-autocomplete
                  v-model="nuevo_producto.prod_cat_id"
                  label="Categoria"
                  :items="categorias"
                  item-text="cat_nombre"
                  item-value="cat_id"
                  background-color="#fc6c5f"
                  color="black"
                  outlined
                >
                </v-autocomplete>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  v-model="nuevo_producto.prod_nombre"
                  label="Nombre"
                  background-color="#fc6c5f"
                  color="black"
                  outlined
                  clearable
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  v-model="nuevo_producto.prod_precio"
                  label="Precio"
                  background-color="#fc6c5f"
                  color="black"
                  outlined
                  clearable
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="guardarProducto()">Guardar</v-btn>
          <v-btn color="error" @click="cancelar()">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="nuevaCategoria_dialog" max-width="700px">
      <v-card style="background-color: #fcd55f">
        <v-card-title> Nueva Categoría </v-card-title>
        <v-card-text>
          <v-container style="background-color: #fc6c5f">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="nueva_categoria.cat_nombre"
                  label="Nombre"
                  background-color="#fc6c5f"
                  color="black"
                  outlined
                  clearable
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-data-table
              style="color: black"
              :headers="cat"
              :items="categorias"
              :items-per-page="5"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon @click="eliminarCategoria(item)" small class="mr-3">
                  fas fa-trash
                </v-icon>
                <v-icon @click="editar_categoria(item)" small> fas fa-pencil-alt</v-icon>
              </template>
            </v-data-table>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="guardarCategoria()">Guardar</v-btn>
          <v-btn color="error" @click="cancelar()">Salir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editarProducto_dialog" max-width="400px">
      <v-card elevation="1" style="background-color: #fcd55f">
        <v-card-title> Editar Producto </v-card-title>
        <v-card-text>
          <v-container style="background-color: #fc6c5f">
            <v-row no-gutters>
              <v-col cols="12">
                <v-autocomplete
                  v-model="nuevo_producto.prod_cat_id"
                  label="Categoria"
                  :items="categorias"
                  item-text="cat_nombre"
                  item-value="cat_id"
                  background-color="#fc6c5f"
                  color="black"
                  outlined
                >
                </v-autocomplete>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  v-model="nuevo_producto.prod_nombre"
                  label="Nombre"
                  background-color="#fc6c5f"
                  color="black"
                  outlined
                  clearable
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  v-model="nuevo_producto.prod_precio"
                  label="Precio"
                  background-color="#fc6c5f"
                  color="black"
                  outlined
                  clearable
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="guardarProductoEditado()">Guardar</v-btn>
          <v-btn color="error" @click="cancelar()">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editarCategoria_dialog" max-width="400px">
      <v-card elevation="1" style="background-color: #fcd55f">
        <v-card-title> Editar Categoria </v-card-title>
        <v-card-text>
          <v-container style="background-color: #fc6c5f">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="edit_categoria.cat_nombre"
                  label="Nombre"
                  background-color="#fc6c5f"
                  color="black"
                  outlined
                  clearable
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="guardarCategoriaEditada()">Guardar</v-btn>
          <v-btn color="error" @click="cancelarEdit()">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>



<script>
export default {
  name: "Productos",

  data() {
    return {
      headers: [
        {
          text: "Identificador",
          color: "red",
          align: "start",
          sortable: false,
          value: "prod_id",
        },
        { text: "Nombre", value: "prod_nombre" },
        { text: "Categoría", value: "cat_nombre" },
        { text: "Precio", value: "prod_precio" },
        { text: "Acciones", value: "actions" },
      ],

      cat: [
        {
          text: "Identificador",
          color: "red",
          align: "start",
          sortable: false,
          value: "cat_id",
        },
        { text: "Nombre", value: "cat_nombre" },
        { text: "Acciones", value: "actions" },
      ],

      productos: [],
      categorias: [],

      nuevoProducto_dialog: false,
      nuevaCategoria_dialog: false,
      editarProducto_dialog: false,
      editarCategoria_dialog: false,

      nuevo_producto: {
        prod_nombre: "",
        cat_nombre: "",
        prod_precio: "",
      },

      nueva_categoria: {
        cat_nombre: "",
      },

      edit_categoria: {
        cat_nombre: "",
      },
    };
  },

  created() {
    this.obtenerProductos();
    this.obtenerCategorias();
  },

  methods: {
    async obtenerProductos() {
      const api_data = await this.axios.get("productos/todos_los_productos");
      this.productos = api_data.data;
    },

    async obtenerCategorias() {
      const api_data = await this.axios.get("productos/obtener_categorias");
      this.categorias = api_data.data;
    },

    async eliminar_producto(item) {
      const body = {
        prod_id: item.prod_id,
      };
      await this.axios.post("productos/eliminar_producto", body);
      this.obtenerProductos();
    },

    async eliminarCategoria(item) {
      const body = {
        cat_id: item.cat_id,
      };
      await this.axios.post("productos/eliminar_categoria", body);
      this.obtenerCategorias();
      this.obtenerProductos();
    },

    cancelar() {
      this.nuevo_producto = {};
      this.nueva_categoria = {};
      this.nuevoProducto_dialog = false;
      this.nuevaCategoria_dialog = false;
      this.editarProducto_dialog = false;
    },

    cancelarEdit(){
      this.editarCategoria_dialog = false;
    },

    async guardarProducto() {
      await this.axios.post("productos/nuevo_producto", this.nuevo_producto);
      this.obtenerProductos();
      this.cancelar();
    },

    async guardarProductoEditado(){
      await this.axios.post("productos/editar_producto", this.nuevo_producto);
      this.obtenerProductos();
      this.cancelar();
    },

    async guardarCategoria() {
      if(this.nueva_categoria.cat_nombre == null || this.nueva_categoria.cat_nombre == "")
      {
        return alert("Ingrese nombre de categoría");
      }
      console.log(this.nueva_categoria);
      await this.axios.post("productos/nueva_categoria", this.nueva_categoria);
      this.obtenerCategorias();
      this.nueva_categoria = {};
    },

    async guardarCategoriaEditada(){
      await this.axios.post("productos/editar_categoria", this.edit_categoria);
      this.obtenerCategorias();
      this.obtenerProductos();
      this.cancelarEdit();
    },

    editar_producto(item) {
      this.nuevo_producto = Object.assign({}, item);
      this.editarProducto_dialog = true;
    },
    
    editar_categoria(item){
      this.edit_categoria = Object.assign({}, item);
      this.editarCategoria_dialog = true;
    }

  },
  components: {},
};
</script>