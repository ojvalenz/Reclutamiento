<template>
  <v-app>
    <v-toolbar app dark>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Reclutamiento</span>
      </v-toolbar-title>

      <v-toolbar-items>
        <v-btn flat to="/Candidatos">Candidatos</v-btn>
        <v-btn flat to="/Vacantes">Vacantes</v-btn>
        <v-btn flat>Skills</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>

    <v-footer dark class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  }
};
</script>
