<style src="./candidato.css" scoped></style>
<template src="./candidato.html"></template>

<script>
  import { api_SaveCandidato, api_UpdateCandidato, api_GetCandidato, api_GetSkills } from '../../../utils/js/api';
  import { bean_Persona, bean_Candidato } from '../../../utils/js/beans';
  import DatePicker from 'vue2-datepicker'; //https://github.com/mengxiong10/vue2-datepicker
  import { isEmpty } from '../../../utils/js/helper';

  export default {
    name: 'Candidato',
    components: { DatePicker },
    data () {
      return {
        impl: null,
        persona: bean_Persona(),
        candidato: bean_Candidato(),
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
      fnSkillsFiltered: function (idGrupoSkill) {
        return this.impl.fnSkillsFiltered(idGrupoSkill);
      },
      fnSaveCandidato: function () {
        this.impl.fnSaveCandidato();
      }
    },
    created() {
      this.impl = new CandidatoImpl(this);
    }
  }


  function CandidatoImpl(app) {
    var self = this;

    self.asignarFuncionalidades = function () {/* Declaracion de todas las funciones */

      self.fnSkillsFiltered = function (idGrupoSkill) {
        return app.skills.filter(s => s.id_grupo_skill == idGrupoSkill);
      }

      self.fnSaveCandidato = function () {
        app.$validator.validate().then(valid => {
          if (valid) {
            app.candidato.skills = app.skills.filter(s => s.nivel > 0).map(s => ({ id_skill: s.id_skill, nivel: s.nivel }));
            const parameters = { candidato: app.candidato, persona: app.persona };
            if (isEmpty(app.candidato.id_candidato)) {
              self.apiSaveCandidato(parameters);
            } else {
              self.apiUpdateCandidato(parameters);
            }
          } else {
            app.notify(app, app.Constants.Style.WARNING, "", "Favor de llenar los campos requeridos", null);
          }
        });
      }

    }


    self.inicializarApis = function () {/* Inicializacion de todas los APIS Restfull */

      self.apiGetSkills = function () {
        api_GetSkills(app, true, function (response) {
          app.grupoSkills = response.grupoSkills;
          app.skills = response.skills;

          if (!isEmpty(app.$route.params.id_candidato)) {
            //Edicion de usuario, cargamos sus datos
            self.apiGetCandidato();
          }
        }, null);
      }

      self.apiGetCandidato = function() {
        api_GetCandidato(app, app.$route.params.id_candidato, true, function (candidatos) {
          if (candidatos && candidatos.length > 0) {
            app.candidato = candidatos[0];
            app.persona = candidatos[0].persona;
            if (app.candidato.skills && app.candidato.skills.length > 0) {
              app.candidato.skills.forEach(function (cSkill) {
                app.skills.find(function (skill) {
                  return skill.id_skill == cSkill.id_skill;
                }).nivel = cSkill.nivel;
              });
            }
          }
        }, null);
      }

      self.apiSaveCandidato = function (candidato) {
        api_SaveCandidato(app, candidato, true, function (response) {
          app.alert(app, app.Constants.DialogType.CONFIRM, app.Constants.Style.SUCCESS, "",
            "El candidato se ha guardo, ¿Quieres agregar un nuevo candidato?",
            null, null, true, function () {
              //Limpiamos el formulario
              app.candidato = bean_Candidato();
              app.persona = bean_Persona();
              app.skills.map(function (skill) { skill.nivel = 0; return skill; });
              setTimeout(() => { app.errors.clear(); }, 100);
            }, function () { app.$router.push('/candidatos'); });
        }, null);
      }

      self.apiUpdateCandidato = function (candidato) {
        api_UpdateCandidato(app, candidato, true, function (response) {
          app.notify(app, app.Constants.Style.SUCCESS, "", "Los datos se han actualizado correctamente.", null);
        }, null);
      }

    }


    self.loadData = function () {/* Carga de datos necesarios para la vista de la pagina */
      self.apiGetSkills();
      //Se deben de cargar de un web service
      app.catalogs.estudios = [{ nivel: "Preparatoria", valor: 1 }, { nivel: "Licenciatura", valor: 2 }, { nivel: "Maestria", valor: 3 }, { nivel: "Doctorado", valor: 4 }];
      app.catalogs.ingles = [{ nivel: "Basico", valor: 1 }, { nivel: "Intermedio", valor: 2 }, { nivel: "Avanzado", valor: 3 }];
      app.catalogs.nivelSkill = ["No lo conosco", "Principiante", "Intermedio", "Avanzado", "Experto"];
    }


    self.asignarFuncionalidades();
    self.inicializarApis();
    self.loadData();
  }

</script>
