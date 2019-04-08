<style src="../../../utils/css/checkbox.css" scoped></style>
<style src="../../../utils/css/listComponent.css" scoped></style>
<style src="./candidatos.css" scoped></style>
<template src="./candidatos.html"></template>

<script>
  import { api_GetCandidatos } from '../../../utils/js/api';

  export default {
    name: 'Candidatos',
    data () {
      return {
        candidatos: [],
        table: null
      }
    },
    computed: {
      candidatesSelected: {
        get() {
          var x = this.candidatos.filter(candidato => candidato.selected);
          return x;
        }, set(value) { }
      }
    },
    methods: {
      fnLoadData() { //Este metodo carga los catalogos y las entidades requeridas
        this.fnFindCandidatos();
      },

      fnFindCandidatos() { //Funcion para buscar los candidatos
        const self = this;
        api_GetCandidatos(this, true, function (candidatos) {
          self.candidatos = candidatos.map(function (candidato) { candidato.selected = false; return candidato; });
        }, null);
      },

      fnSelectUnselectAll($event) { //Funcion para seleccionar o des-seleccionar todos los candidatos
        this.candidatos.forEach(function (candidato) {
          candidato.selected = $event.target.checked;
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
