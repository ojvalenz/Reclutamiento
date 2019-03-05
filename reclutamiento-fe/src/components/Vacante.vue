<template>
  <v-form ref="form" lazy-validation>
    <v-text-field solo v-model="vacante.nombre_corto" required label="Nombre"></v-text-field>
    <v-text-field solo v-model="vacante.descripcion" required label="Descripcion"></v-text-field>
    <v-select
      solo
      v-model="vacante.id_tiempo_vacante"
      label="Tiempo Vacante"
      :items="tiempo_vacante"
      item-value="id_tiempo_vacante"
      item-text="tiempo_vacante"
    ></v-select>
    <v-select
      solo
      v-model="vacante.id_tipo_contrato"
      label="Tipo Contrato"
      :items="tipo_contrato"
      item-value="id_tipo_contrato"
      item-text="tipo_contrato"
    ></v-select>
    <v-text-field solo v-model="vacante.ciudad" required label="Ciudad"></v-text-field>
    <v-text-field solo v-model="vacante.duracion" required label="Duracion"></v-text-field>
    <v-text-field solo v-model="vacante.requerimientos" required label="Requerimientos"></v-text-field>
    <v-text-field solo v-model="vacante.costo_maximo" required label="Costo Maximo"></v-text-field>

    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="vacante.fecha_inicio"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <v-text-field
        slot="activator"
        v-model="vacante.fecha_inicio"
        label="Fecha Inicio"
        prepend-icon="event"
        readonly
      ></v-text-field>
      <v-date-picker v-model="vacante.fecha_inicio" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
        <v-btn flat color="primary" @click="$refs.menu.save(vacante.fecha_inicio)">OK</v-btn>
      </v-date-picker>
    </v-menu>

    <v-text-field solo v-model="vacante.posiciones" required label="Posiciones"></v-text-field>
    <v-select
      solo
      v-model="vacante.prioridad"
      label="Prioridad"
      :items="prioridad"
      item-value="prioridad"
      item-text="texto"
      :selected="vacante.prioridad"
    ></v-select>
    <v-text-field solo v-model="vacante.Comentarios" required label="Comentarios"></v-text-field>

    <div>
      <v-checkbox
        :label="grupo.nombre"
        v-for="grupo in grupoSkills"
        :key="grupo.id_grupo_skill"
        :value="grupo.id_grupo_skill"
        v-model="vacante.grupo_skills"
      ></v-checkbox>
    </div>

    <v-btn color="primary" to="/Vacantes">Cancelar</v-btn>
    <v-btn color="primary" @click.prevent="guardarVacante()">Guardar</v-btn>
  </v-form>
</template>

<script>
//const axios = require("axios");

export default {
  data() {
    return {
      menu: false,
      tiempo_vacante: null,
      tipo_contrato: null,
      grupoSkills: [],
      prioridad: [
        { texto: "Alta", prioridad: 1 },
        { texto: "Media", prioridad: 2 },
        { texto: "Baja", prioridad: 3 },
        { texto: "No Existe", prioridad: 4 }
      ],

      vacante: {
        nombre_corto: null,
        descripcion: null,
        id_tiempo_vacante: null,
        id_tipo_contrato: null,
        ciudad: null,
        duracion: null,
        requerimientos: null,
        costo_maximo: null,
        fecha_inicio: null,
        posiciones: null,
        prioridad: null,
        comentarios: null,
        grupo_skills: []
      }
    };
  },
  computed: {
    id_vacante: function() {
      return this.$route.params.id_vacante;
    }
  },
  mounted() {
    this.$http.get("/vacantes/vacante/new").then(rs => {
      this.tiempo_vacante = rs.data.vacantes;
      this.tipo_contrato = rs.data.contratos;
    });

    this.$http
      .get("/skills")
      .then(rs => (this.grupoSkills = rs.data.grupoSkills));

    if (this.id_vacante !== undefined || this.id_vacante > 0) {
      this.$http
        .get("/vacantes/" + this.id_vacante)
        .then(rs => (this.vacante = rs.data.vacante));
    }
  },
  methods: {
    guardarVacante: function() {
      if (
        this.vacante.id_vacante === undefined ||
        this.vacante.id_tiempo_vacante == null
      ) {
        this.$http
          .post("/vacantes", this.vacante)
          .then(rs => console.log(rs))
          .catch(err => console.log(err));
      } else {
        this.$http
          .put("/vacantes", this.vacante)
          .then(rs => console.log(rs))
          .catch(err => console.log(err));
      }
    }
  }
};
</script>
