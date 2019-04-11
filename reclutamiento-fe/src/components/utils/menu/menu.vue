<style src="./menu.css"></style>
<template src="./menu.html"></template>

<script>
  export default {
    name: 'top-menu',
    data() {
      return {
          impl: null
      }
    },
    methods: {
      fnLogout() {
        this.impl.fnLogout();
      }
    },
    created() {
      this.impl = new MenuImpl(this);
    }
  }

  function MenuImpl(app) {
    var self = this;

    self.asignarFuncionalidades = function () {/* Declaracion de todas las funciones */

      self.fnLogout = function () {
        app.$store.state.isLoggedIn = false;
        window.localStorage.clear();
        app.$router.push('/');
      }

    }


    self.inicializarApis = function () {/* Inicializacion de todas los APIS Restfull */}


    self.loadData = function () {/* Carga de datos necesarios para la vista de la pagina */}


    self.asignarFuncionalidades();
    self.inicializarApis();
    self.loadData();
  }
</script>
