<template>
  <div>
    <v-toolbar flat>
      <v-spacer></v-spacer>
      <v-btn color="success" dark to="/Candidatos/New">Agregar Candidato</v-btn>
    </v-toolbar>

    <v-data-table :items="candidatos" :headers="encabezados" class="elevation-1">
      <template v-slot:items="props">
        <td class="justify-center layout px-0">
          <v-btn small flat icon :to="rutaEdicion(props.item.id_candidato)">
            <v-icon small>edit</v-icon>
          </v-btn>
          <v-btn small flat icon>
            <v-icon small>delete</v-icon>
          </v-btn>
        </td>
        <td class="text-xs-left" v-text="props.item.persona.nombre"></td>
        <td class="text-xs-left" v-text="props.item.persona.apellido_paterno"></td>
        <td class="text-xs-left" v-text="props.item.persona.apellido_materno"></td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      encabezados: [
        { sortable: false },
        {
          text: "",
          align: "Center",
          sortable: false,
          value: "persona.nombre"
        },
        {
          text: "",
          align: "Center",
          sortable: false,
          value: "persona.apellido_paterno"
        },
        {
          text: "",
          align: "Center",
          sortable: false,
          value: "persona.apellido_materno"
        }
      ],
      candidatos: []
    };
  },
  computed: {
    fullName: function() {
      return this._props;
    }
  },
  mounted() {
    this.$http.get("/candidatos").then(rs => (this.candidatos = rs.data));
  },
  methods: {
    rutaEdicion: function(idCandidato) {
      return "/Candidatos/Edit/" + idCandidato;
    }
  }
};
</script>
