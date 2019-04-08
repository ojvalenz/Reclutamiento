<style src="./vacante.css" scoped></style>
<template src="./vacante.html"></template>

<script>
  import {api_GetSkills, api_GetCatalogsVacante, api_GetVacante,
          api_SaveVacante, api_UpdateVacante} from '../../../utils/js/api';
  import DatePicker from 'vue2-datepicker';
  import { isEmpty } from '../../../utils/js/helper';

  const beanVacante = () => {
    return {
      nombre_corto: null, descripcion: null, id_tiempo_vacante: null,
      id_tipo_contrato: null, ciudad: null, duracion: null, requerimientos: null,
      costo_maximo: null, fecha_inicio: null, posiciones: null, prioridad: null,
      comentarios: null, grupo_skills: []
    }
  }

  export default {
    name: 'Vacante',
    components: { DatePicker },
    data () {
      return {
        vacante: beanVacante(),
        grupoSkills: [],
        skills: [],
        catalogs: {
          tiempoVacante: [],
          tipoContrato: [],
          nivelSkill: [],
          prioridad: []
        }
      }
    },
    methods: {

      fnGetSkills(functionOnFinish) {
        const self = this;
        api_GetSkills(this, true, function (response) {
          self.grupoSkills = response.grupoSkills;
          self.skills = response.skills;
          functionOnFinish();
        }, null);
      },
      fnGetCatalogsVacante() {
        const self = this;
        api_GetCatalogsVacante (this, true, function (response) {
          self.catalogs.tiempoVacante = response.vacantes;
          self.catalogs.tipoContrato = response.contratos;
          if (!isEmpty(self.$route.params.id_vacante)) {
            //Edicion de vacante, cargamos sus datos
            self.fnGetVacante();
          }
        }, null);
      },

      fnGetVacante() {
        const self = this;
        api_GetVacante(this, this.$route.params.id_vacante, true, function (vacantes) {
          if (vacantes && vacantes.vacante) {
            self.vacante = vacantes.vacante;
            if (self.vacante.skills && self.vacante.skills.length > 0) {
              self.vacante.skills.forEach(function (cSkill) {
                self.skills.find(function (skill) {
                  return skill.id_skill == cSkill.id_skill;
                }).nivel = cSkill.nivel;
              });
            }
          }
        }, null);
      },

      loadData() { //Este metodo carga los catalogos y las entidades requeridas
        this.fnGetSkills(this.fnGetCatalogsVacante);
        //Se deben de cargar de un web service
        this.catalogs.prioridad = [{ texto: "Alta", prioridad: 1 },{ texto: "Media", prioridad: 2 },{ texto: "Baja", prioridad: 3 },{ texto: "No Existe", prioridad: 4 }];
        this.catalogs.nivelSkill = ["No aplica", "Principiante", "Intermedio", "Avanzado", "Experto"];
      },

      skillsFiltered: function (idGrupoSkill) {
        return this.skills.filter(s => s.id_grupo_skill == idGrupoSkill);
      },

      saveVacante: function () {

        this.$validator.validate().then(valid => {
          if (valid) {
            const self = this;
            this.vacante.skills = this.skills.filter(s => s.nivel > 0).map(s => ({ id_skill: s.id_skill, nivel: s.nivel }));
            if (isEmpty(this.vacante.id_vacante)) {
              api_SaveVacante(this, this.vacante, true, function (response) {

                self.alert(self, self.Constants.DialogType.CONFIRM, self.Constants.Style.SUCCESS, "",
                  "La vacante se ha guardo, ¿Quieres agregar una nueva vacante?",
                  null, null, true, function () {
                    //Limpiamos el formulario
                    self.vacante = beanVacante();
                    self.skills.map(function (skill) { skill.nivel = 0; return skill; });
                    setTimeout(() => { self.errors.clear(); }, 100);
                  }, function () { self.$router.push('/vacantes'); });

              }, null);
            } else {
              api_UpdateVacante(this, this.vacante, true, function (response) {
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
