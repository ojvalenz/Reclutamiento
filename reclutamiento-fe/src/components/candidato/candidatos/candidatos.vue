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
        impl: null,
        candidatos: [],
        table: null
      }
    },
    computed: {
      candidatesSelected: {
        get() {
          return this.impl.fnGetCandidatesSelected();
        }, set(value) { }
      }
    },
    methods: {
      fnSelectUnselectAll($event) { //Funcion para seleccionar o des-seleccionar todos los candidatos
        this.impl.fnSelectUnselectAll($event);
      },
      fnAjustarColumnas() {
        this.impl.fnAjustarColumnas();
      }
    },
    beforeCreate() {
      require('../../../utils/js/plugins/fixedTable.js');//Plugin for fixed table header
    },
    created() {
      this.impl = new CandidatosImpl(this);
    },
    mounted() {
      this.impl.inicializarPlugins(); 
    }
  }


  function CandidatosImpl(app) {
    var self = this;
    self.table = null;

    self.inicializarPlugins = function () {/* Inicializacion de plugins */
      self.table = $('table thead').FixMe();
    }

    self.asignarFuncionalidades = function () {/* Declaracion de todas las funciones */

      self.fnAjustarColumnas = function () {
        setTimeout(function () { self.table.AjustarColumnas(); }, 1);
      }

      self.fnSelectUnselectAll = function($event) { //Funcion para seleccionar o des-seleccionar todos los candidatos
        app.candidatos.forEach(function (candidato) {
          candidato.selected = $event.target.checked;
        });
        self.fnAjustarColumnas();
      }

      self.fnGetCandidatesSelected = function () {
        return app.candidatos.filter(candidato => candidato.selected);
      }

    }


    self.inicializarApis = function () {/* Inicializacion de todas los APIS Restfull */

      self.apiFindCandidatos = function() {
        api_GetCandidatos(app, true, function (candidatos) {
          app.candidatos = candidatos.map(function (candidato) { candidato.selected = false; return candidato; });
        }, null);
      }

    }


    self.loadData = function () {/* Carga de datos necesarios para la vista de la pagina */
      self.apiFindCandidatos();
    }


    self.asignarFuncionalidades();
    self.inicializarApis();
    self.loadData();
  }
</script>
