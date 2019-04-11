<style src="./login.css" scoped></style>
<template src="./login.html"></template>

<script>
  import { api_Login } from '../../../utils/js/api';

  export default {
    name: 'Login',
    data() {
      return {
        impl: null,
        email: null,
        password: null,
      }
    },
    computed: {}, watch: {},
    methods: {
      fnLogin() {
        this.impl.fnLogin();
      }
    },
    created: function () {
      this.impl = new LoginImpl(this);
    }
  }


  function LoginImpl(app) {
    var self = this;

    self.asignarFuncionalidades = function () {/* Declaracion de todas las funciones */

      self.fnLogin = function () {
        let parameters = "user=" + app.email + "&pass=" + app.password;
        self.apiLogin(parameters);
      }

    }


    self.inicializarApis = function () {/* Inicializacion de todas los APIS Restfull */

      self.apiLogin = function (parameters) {
        api_Login(app, parameters, function (data) {
          //Agregamos estos campos para manejar roles y mostrar una imagen de usuario
          data.USER.role = 'ADMIN';
          data.USER.avatar = 'https://cloud.dicka.com.mx/avatar/orodriguezs/32?v=2';

          window.localStorage.setItem('user', JSON.stringify(data.USER));
          window.localStorage.setItem('token', data.TOKEN);

          app.$store.state.user = data.USER;
          app.$store.state.token = data.TOKEN;
          app.$store.state.isLoggedIn = true;
          app.$router.push('/candidatos');
        }, null);
      }

    }


    self.loadData = function () {/* Carga de datos necesarios para la vista de la pagina */
      if (app.$store.state.isLoggedIn == true) {
        app.$router.push('/candidatos');
      }
    }


    self.asignarFuncionalidades();
    self.inicializarApis();
    self.loadData();
  }
</script>
