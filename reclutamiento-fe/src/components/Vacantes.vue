<template>
  <div>
    <v-toolbar flat>
      <v-spacer></v-spacer>
      <v-btn color="success" dark to="/Vacantes/New">Agregar Vacante</v-btn>
    </v-toolbar>

    <v-data-table :items="vacantes_formated" :headers="encabezados" class="elevation-1">
      <template v-slot:items="props">
        <td class="justify-center layout px-0">
          <v-btn small flat icon :to="rutaEdicion(props.item.id_vacante)">
            <v-icon small>edit</v-icon>
          </v-btn>
          <v-btn small flat icon>
            <v-icon small>delete</v-icon>
          </v-btn>
        </td>
        <td class="text-xs-left" v-text="props.item.nombre_corto"></td>
        <td class="text-xs-left" v-text="props.item.requerimientos"></td>
        <td class="text-xs-left" v-text="props.item.ciudad"></td>
        <td class="text-xs-left" v-text="props.item.fecha_inicio"></td>
      </template>
      <template v-slot:no-data>No hay Vacantes</template>
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
          text: "Vacante",
          align: "Center",
          sortable: false,
          value: "nombre_corto"
        },
        {
          text: "Requerimientos",
          align: "center",
          sortable: false,
          value: "requerimientos"
        },
        {
          text: "Ciudad",
          align: "center",
          sortable: false,
          value: "ciudad"
        },
        {
          text: "Fecha Inicio",
          align: "center",
          sortable: false,
          value: "fecha_inicio"
        }
      ],
      vacantes: []
    };
  },
  computed: {
    vacantes_formated: function() {
      this.vacantes.forEach(v => {
        let tmpFecha = new Date(v.fecha_inicio);
        v.fecha_inicio =
          tmpFecha.getFullYear() +
          "-" +
          (tmpFecha.getMonth() + 1) +
          "-" +
          tmpFecha.getDate();
      });
      return this.vacantes;
    }
  },
  mounted() {
    this.$http.get("/vacantes").then(rs => (this.vacantes = rs.data.vacantes));
  },
  methods: {
    rutaEdicion: function(idVacante) {
      return "/Vacantes/Edit/" + idVacante;
    }
  }
};
</script>
