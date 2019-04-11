<style src="./candidatoDetalle.css" scoped></style>
<template src="./candidatoDetalle.html"></template>

<script>
  import { api_GetSkills, api_GetCandidato, api_SaveNota, api_GetNotas, api_DeleteNota } from '../../../utils/js/api';
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
        notas: [],
        nota: ""
      }
    },
    methods: {
      fnGetFirstLetter(string) {
        return this.impl.fnGetFirstLetter(string);
      },
      fnSaveNota() {
        return this.impl.fnSaveNota();
      },
      apiDeleteNota(nota, index){
        this.impl.apiDeleteNota(nota, index);
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

      self.fnSaveNota = function () {
        if (!isEmpty(app.nota)) {
          self.apiSaveNota(app.nota);
        } else {
          app.notify(app, app.Constants.Style.WARNING, "", "Favor de llenar los campos requeridos", null);
        }

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

      self.apiGetNotas = function () {
        api_GetNotas(app, true, function (notas) {
          app.notas = [];// Cuando este el servicio de GetNotas se debe de cambiar a [app.notas = notas]
        }, null);
      }

      self.apiSaveNota = function () {
        api_SaveNota(app, app.nota, true, function (nota) {
          app.notas.unshift({ nota: app.nota, user: "Oscar", date: new Date() });
          app.nota = "";
        }, null);
      }

      self.apiDeleteNota = function (nota, index) {
        api_DeleteNota(app, nota, true, function (nota) {
          app.notas.splice(index, 1);
        }, null);
      }
    }


    self.loadData = function () {/* Carga de datos necesarios para la vista de la pagina */
      self.apiGetSkills();
      self.apiGetNotas();
    }

    self.asignarFuncionalidades();
    self.inicializarApis();
    self.loadData();
  }

</script>
