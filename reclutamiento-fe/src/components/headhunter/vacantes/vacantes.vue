<style src="../../../utils/css/checkbox.css" scoped></style>
<style src="../../../utils/css/listComponent.css" scoped></style>
<style src="./vacantes.css" scoped></style>
<template src="./vacantes.html">
</template>
<script>


  export default {
    name: 'Vacantes',
    data () {
      return {
        vacantes: [],
        candidatos: [],
        candidatosSelected: [],
        table: null
      }
    },
    computed: {
      vacantesSelected: {
        get() {
          var x = this.vacantes.filter(vacante => vacante.selected);
          return x;
        }, set(value) { }
      }
    },
    methods: {
      fnLoadData() { //Este metodo carga los catalogos y las entidades requeridas
        this.fnFindVacantes();
        this.fnFindCandidatos();
      },

      fnFindVacantes() { //Funcion para buscar los candidatos
        const self = this;
        this.$http(this, '/vacantes', this.Constants.HTTPmethod.GET, null, this.Constants.ContentType.URL, this.Constants.ResponseType.JSON,
          function (vacantes) {
            self.vacantes = vacantes.map(function (vacante) { vacante.selected = false; return vacante;});
          }, true, null, true);
      },
      fnFindCandidatos() { //Funcion para buscar los candidatos
        const self = this;
        this.$http(this, '/candidatos', this.Constants.HTTPmethod.GET, null, this.Constants.ContentType.URL, this.Constants.ResponseType.JSON,
          function (candidatos) {
            self.candidatos = candidatos.map(function (candidato) { candidato.nombreCompleto = candidato.persona.nombre + " " + candidato.persona.apellido_paterno + " " + candidato.persona.apellido_materno; return candidato; });
          }, true, null, true);
      },

      fnSelectUnselectAll($event) { //Funcion para seleccionar o des-seleccionar todos los candidatos
        this.vacantes.forEach(function (vacante) {
          vacante.selected = $event.target.checked;
        });
        this.fnAjustarColumnas();
      },

      fnAjustarColumnas() {
        let self = this;
        setTimeout(function () {self.table.AjustarColumnas();}, 1);
      }
    },
    beforeCreate() {
      require('../../../utils/js/plugins/fixedTable.js');//Plugin for fixed table header
    },
    mounted() {
      this.fnLoadData();
      this.table = $('table thead').FixMe();
    }
  }
</script>
