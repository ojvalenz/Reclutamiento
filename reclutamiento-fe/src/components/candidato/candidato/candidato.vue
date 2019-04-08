<style src="./candidato.css" scoped></style>
<template src="./candidato.html"></template>

<script>
  import { api_SaveCandidato, api_UpdateCandidato, api_GetCandidato, api_GetSkills } from '../../../utils/js/api';
  import DatePicker from 'vue2-datepicker'; //https://github.com/mengxiong10/vue2-datepicker
  import { isEmpty } from '../../../utils/js/helper';

  const beanPersona = () => {
    return {
      nombre: null, apellido_paterno: null, apellido_materno: null,
      tel_celular: null, email: null
    }
  }
  const beanCandidato = () => {
    return {
      pais: null, ciudad: null, codigo_postal: null, fecha_graduacion: null,
      universidad: null, curriculum_vitae: null, cv_digital: null,
      foto: null, skype: null,grado_estudios: null, grado_ingles: null, skills: []
    }
  }

  export default {
    name: 'Candidato',
    components: { DatePicker },
    data () {
      return {
        persona: beanPersona(),
        candidato: beanCandidato(),
        grupoSkills: [],
        skills: [],
        catalogs: {
          estudios: [],
          ingles: [],
          nivelSkill: []
        }
      }
    },
    methods: {

      fnGetSkills() {
        const self = this;
        api_GetSkills(this, true, function (response) {
          self.grupoSkills = response.grupoSkills;
          self.skills = response.skills;

          if (!isEmpty(self.$route.params.id_candidato)) {
            //Edicion de usuario, cargamos sus datos
            self.fnGetCandidato();
          }
        }, null);
      },

      fnGetCandidato() {
        const self = this;
        api_GetCandidato(this, this.$route.params.id_candidato, true, function (candidatos) {
          if (candidatos && candidatos.length > 0) {
            self.candidato = candidatos[0];
            self.persona = candidatos[0].persona;
            if (self.candidato.skills && self.candidato.skills.length > 0) {
              self.candidato.skills.forEach(function (cSkill) {
                self.skills.find(function (skill) {
                  return skill.id_skill == cSkill.id_skill;
                }).nivel = cSkill.nivel;
              });
            }
          }
        }, null);
      },

      loadData() { //Este metodo carga los catalogos y las entidades requeridas
        this.fnGetSkills();
        //Se deben de cargar de un web service
        this.catalogs.estudios = [{ nivel: "Preparatoria", valor: 1 }, { nivel: "Licenciatura", valor: 2 }, { nivel: "Maestria", valor: 3 }, { nivel: "Doctorado", valor: 4 }];
        this.catalogs.ingles = [{ nivel: "Basico", valor: 1 }, { nivel: "Intermedio", valor: 2 }, { nivel: "Avanzado", valor: 3 }];
        this.catalogs.nivelSkill = ["No lo conosco", "Principiante", "Intermedio", "Avanzado", "Experto"];
      },

      skillsFiltered: function (idGrupoSkill) {
        return this.skills.filter(s => s.id_grupo_skill == idGrupoSkill);
      },

      saveCandidato: function () {

        this.$validator.validate().then(valid => {
          if (valid) {
            const self = this;
            this.candidato.skills = this.skills.filter(s => s.nivel > 0).map(s => ({ id_skill: s.id_skill, nivel: s.nivel }));
            const parameters = { candidato: this.candidato, persona: this.persona };
            if (isEmpty(this.candidato.id_candidato)) {
              api_SaveCandidato(this, parameters, true, function (response) {
                self.alert(self, self.Constants.DialogType.CONFIRM, self.Constants.Style.SUCCESS, "",
                  "El candidato se ha guardo, ¿Quieres agregar un nuevo candidato?",
                  null, null, true, function () {
                    //Limpiamos el formulario
                    self.candidato = beanCandidato();
                    self.persona = beanPersona();
                    self.skills.map(function (skill) { skill.nivel = 0; return skill; });
                    setTimeout(() => { self.errors.clear(); }, 100);
                  }, function () { self.$router.push('/candidatos'); });
              }, null);
            } else {
              api_UpdateCandidato(this, parameters, true, function (response) {
                self.notify(self, self.Constants.Style.SUCCESS, "", "Los datos se han actualizado correctamente.", null);
              }, null);
            }
          } else {
            this.notify(this, this.Constants.Style.WARNING, "", "Favor de llenar los campos requeridos", null);
          }
        });
      }
    },
    mounted() {
      this.loadData();
    }
  }
</script>
