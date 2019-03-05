<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field solo v-model="persona.nombre" label="Nombre" required></v-text-field>
    <v-text-field solo v-model="persona.apellido_paterno" label="Apellido Paterno" required></v-text-field>
    <v-text-field solo v-model="persona.apellido_materno" label="Apellido Materno" required></v-text-field>
    <v-text-field solo v-model="persona.tel_celular" label="Telefono Celular" required></v-text-field>
    <v-text-field solo v-model="persona.email" label="E-Mail" required></v-text-field>
    <v-text-field solo v-model="candidato.pais" label="Pais" required></v-text-field>
    <v-text-field solo v-model="candidato.ciudad" label="Ciudad" required></v-text-field>
    <v-text-field solo v-model="candidato.codigo_postal" label="Codigo Postal" required></v-text-field>

    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="candidato.fecha_graduacion"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <v-text-field
        slot="activator"
        v-model="candidato.fecha_graduacion"
        label="Fecha Graduacion"
        prepend-icon="event"
        readonly
      ></v-text-field>
      <v-date-picker v-model="candidato.fecha_graduacion" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
        <v-btn flat color="primary" @click="$refs.menu.save(candidato.fecha_graduacion)">OK</v-btn>
      </v-date-picker>
    </v-menu>

    <v-text-field solo v-model="candidato.universidad" label="Universidad" required></v-text-field>
    <v-text-field solo v-model="candidato.curriculum_vitae" label="Curriculum Vitae" required></v-text-field>
    <v-text-field solo v-model="candidato.cv_digital" label="CV Digital" required></v-text-field>
    <v-text-field solo v-model="candidato.skype" label="Usuario Skype" required></v-text-field>
    <v-select
      solo
      v-model="candidato.grado_estudios"
      :items="estudios"
      item-text="nivel"
      item-value="valor"
      label="Ultimo Grado de Estudios"
    ></v-select>
    <v-select
      solo
      v-model="candidato.grado_ingles"
      :items="ingles"
      item-text="nivel"
      item-value="valor"
      label="Nivel Ingles"
    ></v-select>
    <v-expansion-panel>
      <v-expansion-panel-content v-for="grupo in grupoSkills" :key="grupo.id_grupo_skill">
        <div slot="header" v-text="grupo.nombre"></div>
        <v-card v-for="skill in skillsFiltered(grupo.id_grupo_skill)" :key="skill.id_skill">
          <v-card-title v-text="skill.nombre"></v-card-title>
          <v-card-text>
            <v-slider
              label="Experiencia"
              v-model="skill.nivel"
              :tick-labels="nivelSkill"
              :max="4"
              step="1"
              ticks="always"
              tick-size="1"
            ></v-slider>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-btn color="primary" to="/Candidatos">Cancelar</v-btn>
    <v-btn color="primary" @click.prevent="sendCandidato()">Guardar</v-btn>
  </v-form>
</template>

<script>
export default {
  name: "Candidato",
  data() {
    return {
      valid: true,
      menu: false,
      estudios: [
        { nivel: "Preparatoria", valor: 1 },
        { nivel: "Licenciatura", valor: 2 },
        { nivel: "Maestria", valor: 3 },
        { nivel: "Doctorado", valor: 4 }
      ],
      ingles: [
        { nivel: "Basico", valor: 1 },
        { nivel: "Intermedio", valor: 2 },
        { nivel: "Avanzado", valor: 3 }
      ],
      nivelSkill: [
        "No lo conosco",
        "Principiante",
        "Intermedio",
        "Avanzado",
        "Experto"
      ],

      grupoSkills: null,
      skills: null,

      candidato: {
        pais: null,
        ciudad: null,
        codigo_postal: null,
        fecha_graduacion: null,
        universidad: null,
        curriculum_vitae: null,
        cv_digital: null,
        foto: null,
        skype: null,
        grado_estudios: null,
        grado_ingles: null,
        skills: []
      },
      persona: {
        nombre: null,
        apellido_paterno: null,
        apellido_materno: null,
        tel_celular: null,
        email: null
      }
    };
  },
  computed: {
    addSkills: function() {
      return this.skills
        .filter(s => s.nivel > 0)
        .map(s => ({ id_skill: s.id_skill, nivel: s.nivel }));
    },
    id_candidato: function() {
      return this.$route.params.id_candidato;
    }
  },
  mounted() {
    this.$http.get("/skills").then(rs => {
      this.grupoSkills = rs.data.grupoSkills;
      this.skills = rs.data.skills;
    });

    if (this.id_candidato !== undefined || this.id_candidato > 0) {
      this.$http.get("/candidatos/" + this.id_candidato).then(rs => {
        this.candidato = rs.data[0];
        this.persona = rs.data[0].persona;
      });
    }
  },
  methods: {
    sendCandidato: function() {
      this.candidato.skills = this.addSkills;

      if (
        this.candidato.id_candidato === undefined ||
        this.candidato.id_candidato == null
      ) {
        this.$http
          .post("/candidatos/new", {
            candidato: this.candidato,
            persona: this.persona
          })
          .then(rs => {
            console.log(rs);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$http
          .put("/candidatos", {
            candidato: this.candidato,
            persona: this.persona
          })
          .then(rs => {
            console.log(rs);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    skillsFiltered: function(idGrupoSkill) {
      return this.skills.filter(s => s.id_grupo_skill == idGrupoSkill);
    }
  }
};
</script>
