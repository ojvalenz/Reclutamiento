<style src="../../../utils/css/checkbox.css" scoped></style>
<style src="../../../utils/css/listComponent.css" scoped></style>
<style src="./vacantes.css" scoped></style>
<template src="./vacantes.html">
</template>
<script>
  import { api_GetVacantes } from '../../../utils/js/api';

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
      },

      fnFindVacantes() { //Funcion para buscar los candidatos
        const self = this;
        api_GetVacantes(this, true, function (vacantes) {
          self.vacantes = vacantes.map(function (vacante) { vacante.selected = false; return vacante; });
        }, null);
      },

      fnSelectUnselectAll($event) { //Funcion para seleccionar o des-seleccionar todas las vacantes
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
