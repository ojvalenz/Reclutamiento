<style src="./login.css" scoped></style>
<template src="./login.html"></template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        email: null,
        password: null,
      }
    },
    computed: {}, watch: {},
    methods: {
      login() {
        const self = this;
        let parameters = "user=" + this.email + "&pass=" + this.password;
        this.$http(this, '/login', this.Constants.HTTPmethod.POST, parameters, this.Constants.ContentType.URL, this.Constants.ResponseType.JSON,
          function (data) {
            //Agregamos estos campos para manejar roles y mostrar una imagen de usuario
            data.USER.role= 'ADMIN';
            data.USER.avatar= 'https://cloud.dicka.com.mx/avatar/orodriguezs/32?v=2';

            window.localStorage.setItem('user', JSON.stringify(data.USER));
            window.localStorage.setItem('token', data.TOKEN);

            self.$store.state.user = data.USER;
            self.$store.state.token = data.TOKEN;
            self.$store.state.isLoggedIn = true;
            self.$router.push('/candidatos');
          }, true, null, true);
      }
    },
    mounted: function () {
      if (this.$store.state.isLoggedIn == true) {
        this.$router.push('/candidatos');
      }

    }
  }
</script>
