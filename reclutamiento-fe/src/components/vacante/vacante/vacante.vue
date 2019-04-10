<style src="./vacante.css" scoped></style>
<template src="./vacante.html"></template>

<script>
  import {api_GetSkills, api_GetCatalogsVacante, api_GetVacante, api_SaveVacante, api_UpdateVacante} from '../../../utils/js/api';
  import { bean_Vacante, bean_Candidato } from '../../../utils/js/beans';
  import DatePicker from 'vue2-datepicker';
  import { isEmpty } from '../../../utils/js/helper';

  export default {
    name: 'Vacante',
    components: { DatePicker },
    data () {
      return {
        impl: null,
        vacante: bean_Vacante(),
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
      fnGetSkillsFiltered: function (idGrupoSkill) {
        return this.impl.fnGetSkillsFiltered(idGrupoSkill);
      },
      fnSaveVacante: function () {
        this.impl.fnSaveVacante();
      }
    },
    created() {
      this.impl = new VacanteImpl(this);
    }
  }


  function VacanteImpl(app) {
    var self = this;

    self.asignarFuncionalidades = function () {/* Declaracion de todas las funciones */

      self.fnGetSkillsFiltered = function (idGrupoSkill) {
        return app.skills.filter(s => s.id_grupo_skill == idGrupoSkill);
      }

      self.fnSaveVacante = function () {
        app.$validator.validate().then(valid => {
          if (valid) {
            app.vacante.skills = this.skills.filter(s => s.nivel > 0).map(s => ({ id_skill: s.id_skill, nivel: s.nivel }));
            if (isEmpty(this.vacante.id_vacante)) {
              self.apiSaveVacante();
            } else {
              self.apiUpdateVacante();
            }
          } else {
            this.notify(this, this.Constants.Style.WARNING, "", "Favor de llenar los campos requeridos", null);
          }
        });
      }
    
    }


    self.inicializarApis = function () {/* Inicializacion de todas los APIS Restfull */

      self.apiGetSkills = function() {
        api_GetSkills(app, true, function (response) {
          app.grupoSkills = response.grupoSkills;
          app.skills = response.skills;
          self.apiGetCatalogsVacante();
        }, null);
      }

      self.apiGetCatalogsVacante = function() {
        api_GetCatalogsVacante(app, true, function (response) {
          app.catalogs.tiempoVacante = response.vacantes;
          app.catalogs.tipoContrato = response.contratos;
          if (!isEmpty(app.$route.params.id_vacante)) {
            //Edicion de vacante, cargamos sus datos
            app.apiGetVacante();
          }
        }, null);
      }

      self.apiGetVacante = function() {
        api_GetVacante(app, app.$route.params.id_vacante, true, function (vacantes) {
          if (vacantes && vacantes.vacante) {
            app.vacante = vacantes.vacante;
            if (app.vacante.skills && app.vacante.skills.length > 0) {
              app.vacante.skills.forEach(function (cSkill) {
                app.skills.find(function (skill) {
                  return skill.id_skill == cSkill.id_skill;
                }).nivel = cSkill.nivel;
              });
            }
          }
        }, null);
      }

      self.apiSaveVacante = function () {
        api_SaveVacante(app, app.vacante, true, function (response) {
          app.alert(app, app.Constants.DialogType.CONFIRM, app.Constants.Style.SUCCESS, "",
            "La vacante se ha guardo, ¿Quieres agregar una nueva vacante?",
            null, null, true, function () {
              //Limpiamos el formulario
              app.vacante = bean_Vacante();
              app.skills.map(function (skill) { skill.nivel = 0; return skill; });
              setTimeout(() => { app.errors.clear(); }, 100);
            }, function () { app.$router.push('/vacantes'); });

        }, null);
      }

      self.apiUpdateVacante = function () {
        api_UpdateVacante(app, app.vacante, true, function (response) {
          app.notify(self, self.Constants.Style.SUCCESS, "", "Los datos se han actualizado correctamente.", null);
        }, null);
      }
      
    }


    self.loadData = function () {/* Carga de datos necesarios para la vista de la pagina */
      self.apiGetSkills();
      //Se deben de cargar de un web service
      app.catalogs.prioridad = [{ texto: "Alta", prioridad: 1 }, { texto: "Media", prioridad: 2 }, { texto: "Baja", prioridad: 3 }, { texto: "No Existe", prioridad: 4 }];
      app.catalogs.nivelSkill = ["No aplica", "Principiante", "Intermedio", "Avanzado", "Experto"];
    }


    self.asignarFuncionalidades();
    self.inicializarApis();
    self.loadData();
  }

</script>
