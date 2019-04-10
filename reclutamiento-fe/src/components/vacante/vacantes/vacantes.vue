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
        impl: null,
        vacantes: [],
        candidatos: [],
        candidatosSelected: [],
        table: null
      }
    },
    computed: {
      vacantesSelected: {
        get() {
          return this.impl.fnGetVacantesSelected();
        }, set(value) { }
      }
    },
    methods: {
      fnAjustarColumnas() { //Este metodo carga los catalogos y las entidades requeridas
        this.impl.fnAjustarColumnas();
      },
      fnSelectUnselectAll($event) { //Funcion para seleccionar o des-seleccionar todas las vacantes
        this.impl.fnSelectUnselectAll($event);
      },
      
    },
    beforeCreate() {
      require('../../../utils/js/plugins/fixedTable.js');//Plugin for fixed table header
    },
    created() {
      this.impl = new VacantesImpl(this);
    },
    mounted() {
      this.impl.inicializarPlugins();
    }
  }


  function VacantesImpl(app) {
    var self = this;

    self.table = null;

    self.inicializarPlugins = function () {/* Inicializacion de componentes */
      self.table = $('table thead').FixMe();
    }

    self.asignarFuncionalidades = function () {/* Declaracion de todas las funciones */

      self.fnAjustarColumnas = function () {
        setTimeout(function () { self.table.AjustarColumnas(); }, 1);
      }

      self.fnSelectUnselectAll = function($event) { //Funcion para seleccionar o des-seleccionar todas las vacantes
        app.vacantes.forEach(function (vacante) {
          vacante.selected = $event.target.checked;
        });
        self.fnAjustarColumnas();
      }

      self.fnGetVacantesSelected = function () {
        return app.vacantes.filter(vacante => vacante.selected);
      }
    }


    self.inicializarApis = function () {/* Inicializacion de todas los APIS Restfull */

      self.apiFindVacantes = function() {
        api_GetVacantes(app, true, function (vacantes) {
          app.vacantes = vacantes.map(function (vacante) { vacante.selected = false; return vacante; });
        }, null);
      }

    }


    self.loadData = function () {/* Carga de datos necesarios para la vista de la pagina */
      self.apiFindVacantes();
    }


    self.asignarFuncionalidades();
    self.inicializarApis();
    self.loadData();
  }
</script>
