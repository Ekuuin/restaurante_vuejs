<template>
  <v-container>
    <v-data-table style="color:black"
    :headers="headers"
    :items="meseros"
    :items-per-page="10"
    >
      <template v-slot:top>
          <v-toolbar flat color="primary">
            <v-toolbar-title>Meseros</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color = 'success' @click='nuevoMesero_dialog = true' >Nuevo Mesero</v-btn>
          </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]={item}>
        <v-icon @click="eliminar_mesero(item)" small class="mr-3">
          fas fa-trash
        </v-icon>
        <v-icon @click="editar_mesero(item)" small>
          fas fa-pencil-alt
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="editarMesero_dialog" max-width="500px">
      <v-card style="background-color: #fcd55f">
        <v-card-title>
          <v-btn color="gray">Editar Mesero #{{nuevo_mesero.mro_nue}}</v-btn>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <v-container style="background-color: #fc6c5f" class="mt-0">
            <v-row>
              <v-col cols='12'>
                <v-text-field
                v-model="nuevo_mesero.mro_nombre"
                label=Nombre
                background-color="#fc6c5f"
                color="black"
                outlined
                clearable
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
            <v-col class="pr-3" cols='6'>
                <v-text-field
                v-model="nuevo_mesero.mro_honorarios"
                label=Honorarios
                background-color="#fc6c5f"
                color="black"
                outlined
                clearable
                >
                </v-text-field>
            </v-col>
            <v-col class="pl-3" cols='6'>
            <v-text-field
              v-model="nuevo_mesero.mro_telefono"
              label=Teléfono
              background-color="#fc6c5f"
              color="black"
              outlined
              clearable
            >
            </v-text-field>
            </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
            <v-text-field
              v-model="nuevo_mesero.mro_direccion"
              label=Dirección
              background-color="#fc6c5f"
              color="black"
              outlined
              clearable
            ></v-text-field>
            </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
            <v-text-field
              v-model="nuevo_mesero.mro_email"
              label=Email
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
          <v-btn color="success" @click="guardar_editMesero()">Guardar</v-btn>
          <v-btn color="error" @click="cancelar()">Cancelar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model='nuevoMesero_dialog' max-width="500px">
      <v-card style="background-color:#FCD55F">
        <v-card-title>
          Nuevo Mesero
        </v-card-title>
        <v-card-text>
          <v-container style="background-color:#FC6C5F">
            <v-row>
              <v-col cols = '6'>
                <v-text-field 
                v-model="nuevo_mesero.mro_nombre" 
                label = 'Nombre'
                background-color="#fc6c5f"
                color="black"
                outlined
                clearable>
                </v-text-field>
              </v-col>
              <v-col cols = '6'>
                <v-text-field 
                v-model="nuevo_mesero.mro_honorarios" 
                label = 'Honorarios' 
                type: int
                background-color="#fc6c5f"
                color="black"
                outlined
                clearable>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols = '6'>
                <v-text-field 
                v-model="nuevo_mesero.mro_direccion" 
                label = 'Dirección'
                background-color="#fc6c5f"
                color="black"
                outlined
                clearable>
                </v-text-field>
              </v-col>
              <v-col cols = '6'>
                <v-text-field 
                v-model="nuevo_mesero.mro_telefono" 
                label = 'Teléfono'
                background-color="#fc6c5f"
                color="black"
                outlined
                clearable>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
                <v-col cols='auto'>
                    <v-text-field 
                    v-model="nuevo_mesero.mro_email" 
                    label = 'E-mail'
                    background-color="#fc6c5f"
                    color="black"
                    outlined
                    clearable>
                    </v-text-field>
                </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color = 'success' @click="guardar()">Guardar</v-btn>
          <v-btn color = 'error' @click="cancelar()">Cancelar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>



<script>
export default {
  name: "Meseros",

  data() {
    return {
      headers: [
        {
          text: "Identificador",
          color: "red",
          align: "start",
          sortable: false,
          value: "mro_nue",
        },
        { text: "Nombre", value: "mro_nombre" },
        { text: "Honorarios", value: "mro_honorarios" },
        { text: "Dirección", value: "mro_direccion" },
        { text: "Teléfono", value: "mro_telefono" },
        { text: "Email", value: "mro_email" },
        { text: "Acciones", value: "actions" },
      ],
      meseros: [],

      nuevoMesero_dialog: false,
      editarMesero_dialog: false,

      nuevo_mesero: {
        mro_nue: "",
        mro_nombre: "",
        mro_honorarios: "",
        mro_direccion: "",
        mro_telefono: "",
        mro_email: "",
      },
    };
  },

  created() {
    this.obtenerMeseros();
  },

  methods: {
    async obtenerMeseros() {
      const api_data = await this.axios.get("meseros/todos_los_meseros");
      this.meseros = api_data.data;
    },

    async eliminar_mesero(item) {
      const body = {
        mro_nue: item.mro_nue,
      };
      await this.axios.post("meseros/eliminar_mesero", body);
      this.obtenerMeseros();
    },

    cancelar() {
      this.nuevo_mesero = {};
      this.nuevoMesero_dialog = false;
      this.editarMesero_dialog = false;
    },

    async guardar() {
      await this.axios.post("meseros/nuevo_mesero", this.nuevo_mesero);
      this.obtenerMeseros();
      this.cancelar();
    },

    async guardar_editMesero() {
      await this.axios.post("meseros/editar_mesero", this.nuevo_mesero);
      this.obtenerMeseros();
      this.cancelar();
    },

    editar_mesero(item) {
      this.nuevo_mesero = Object.assign({}, item); //Copia los valores del objeto item al objeto nuevo_mesero para mostrarlos
      this.editarMesero_dialog = true; //en el dialog. Evita resultados raros.
    },
  },
  components: {},
};
</script>