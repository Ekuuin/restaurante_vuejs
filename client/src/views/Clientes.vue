<template>
  <v-container>
    <v-data-table
      style="color: black"
      :headers="headers"
      :items="clientes"
      :items-per-page="5"
    >
      <template v-slot:top>
        <v-toolbar flat color="primary">
          <v-toolbar-title>Clientes</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="nl_dialog = true">Nuevo Cliente</v-btn>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="eliminar_cliente(item)" small> fas fa-trash </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="nl_dialog" max-width="500px">
      <v-card style="background-color: #fcd55f">
        <v-card-title>
          <v-btn color="gray">Nuevo Cliente</v-btn>
        </v-card-title>
        <v-card-text>
          <v-container style="background-color: #fc6c5f">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="nuevo_cliente.cli_nombre"
                  label="Nombre"
                  background-color="#fc6c5f"
                  color="black"
                  outlined
                  clearable
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="nuevo_cliente.cli_direccion"
                  label="Dirección"
                  background-color="#fc6c5f"
                  color="black"
                  outlined
                  clearable
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="nuevo_cliente.cli_telefono"
                  label="Teléfono"
                  background-color="#fc6c5f"
                  color="black"
                  outlined
                  clearable
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="nuevo_cliente.cli_mesa_id"
                  label="Mesa"
                  :items="mesas"
                  item-text="mesa_id"
                  item-value="mesa_id"
                  background-color="#fc6c5f"
                  color="black"
                  outlined
                  clearable
                >
                </v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="guardar()">Guardar</v-btn>
          <v-btn color="error" @click="cancelar()">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>



<script>
export default {
  name: "Clientes",

  data() {
    return {
      headers: [
        {
          text: "Identificador",
          color: "red",
          align: "start",
          sortable: true,
          value: "cli_id",
        },
        { text: "Nombre", value: "cli_nombre" },
        { text: "Teléfono", value: "cli_telefono" },
        { text: "Dirección", value: "cli_direccion" },
        { text: "Mesa", value: "cli_mesa_id" },
        { text: "Acciones", value: "actions" },
      ],
      clientes: [],
      mesas: [],

      nl_dialog: false,

      nuevo_cliente: {
        cli_nombre: null,
        cli_telefono: null,
        cli_mesa_id: null,
        cli_direccion: null,
      },
    };
  },

  created() {
    this.obtenerClientes();
    this.obtenerMesas();
  },

  methods: {
    async obtenerClientes() {
      const api_data = await this.axios.get("clientes/todos_los_clientes");
      this.clientes = api_data.data;
    },

    async obtenerMesas() {
      const api_data = await this.axios.get("mesas/llenar_mesa");
      this.mesas = api_data.data;
    },

    async eliminar_cliente(item) {
      const body = {
        cli_id: item.cli_id,
      };
      await this.axios.post("clientes/eliminar_cliente", body);
      this.obtenerClientes();
    },

    cancelar() {
      this.nuevo_cliente = {};
      this.nl_dialog = false;
    },

    async guardar() {
      for (let index = 0; index < this.clientes.length; index++)
        if (
          this.clientes[index].cli_telefono == this.nuevo_cliente.cli_telefono
        )
          return alert("Número de teléfono repetido :(");

      const response = await this.axios.post(
        "clientes/nuevo_cliente",
        this.nuevo_cliente
      );
      if (response.data != "OK")
        return alert("No hay lugares disponibles en esta mesa :(");
      this.obtenerClientes();
      this.cancelar();
    },
  },
  components: {},
};
</script>