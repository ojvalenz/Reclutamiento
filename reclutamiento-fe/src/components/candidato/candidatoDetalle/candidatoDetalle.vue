<style src="./candidatoDetalle.css" scoped></style>
<template src="./candidatoDetalle.html"></template>

<script>
  import { api_GetSkills, api_GetCandidato } from '../../../utils/js/api';
  import { isEmpty } from '../../../utils/js/helper';

  export default {
    name: 'Candidato',
    data () {
      return {
        persona: new Object(),
        candidato: new Object(),
        grupoSkills: [],
        skills: [],
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
              let skillsGrouped = new Object();//Agrupa los skills por su grupo
              self.candidato.skills.forEach(function (cSkill) {

                let skill = self.skills.find(function (skill) {
                  return skill.id_skill == cSkill.id_skill;
                });

                let grupo = self.grupoSkills.find(function (group) {
                  return skill.id_grupo_skill == group.id_grupo_skill;
                });
                if (typeof skillsGrouped[grupo.nombre] == 'undefined') {
                  skillsGrouped[grupo.nombre] = [];
                }

                skill.nivel = cSkill.nivel;
                skillsGrouped[grupo.nombre].push(skill);

              });
              self.candidato.skillsGrouped = skillsGrouped;
            }
          }
        }, null);
      },

      loadData() { //Este metodo carga los catalogos y las entidades requeridas
        this.fnGetSkills();
      },

      getFirstLetterName() {
        return this.persona.nombre ? this.persona.nombre.charAt(0).toUpperCase() : '';
      }
    },
    mounted() {
      this.loadData();
    }
  }
</script>
