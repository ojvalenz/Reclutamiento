<style src="./candidatoDetalle.css" scoped></style>
<template src="./candidatoDetalle.html"></template>

<script>
  import { api_GetSkills, api_GetCandidato } from '../../../utils/js/api';
  import { isEmpty } from '../../../utils/js/helper';

  export default {
    name: 'CandidatoDetalle',
    data () {
      return {
        impl: null,
        persona: new Object(),
        candidato: new Object(),
        grupoSkills: [],
        skills: [],
      }
    },
    methods: {
      fnGetFirstLetter(string) {
        return this.impl.fnGetFirstLetter(string);
      }
    },
    created() {
      this.impl = new CandidatoDetalleImpl(this);
    }
  }


  function CandidatoDetalleImpl(app) {
    var self = this;

    self.asignarFuncionalidades = function () {/* Declaracion de todas las funciones */
      
      self.fnGetFirstLetter = function(string) {
        return string ? string.charAt(0).toUpperCase() : '';
      }

    }


    self.inicializarApis = function () {/* Inicializacion de todas los APIS Restfull */

      self.apiGetSkills = function() {
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
              let skillsGrouped = new Object();//Agrupa los skills por su grupo
              app.candidato.skills.forEach(function (cSkill) {

                let skill = app.skills.find(function (skill) {
                  return skill.id_skill == cSkill.id_skill;
                });

                let grupo = app.grupoSkills.find(function (group) {
                  return skill.id_grupo_skill == group.id_grupo_skill;
                });
                if (typeof skillsGrouped[grupo.nombre] == 'undefined') {
                  skillsGrouped[grupo.nombre] = [];
                }

                skill.nivel = cSkill.nivel;
                skillsGrouped[grupo.nombre].push(skill);

              });
              app.candidato.skillsGrouped = skillsGrouped;
            }
          }
        }, null);
      }

    }


    self.loadData = function () {/* Carga de datos necesarios para la vista de la pagina */
      self.apiGetSkills();
    }

    self.asignarFuncionalidades();
    self.inicializarApis();
    self.loadData();
  }

</script>
