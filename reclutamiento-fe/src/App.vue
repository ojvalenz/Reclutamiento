<template>
  <div>
    <loading :active.sync="$store.state.isLoading" :can-cancel="false" :is-full-page="true"
             loader="dots" color="#17a2b8" :height="100" :width="100"></loading>

    <vue-snotify></vue-snotify>
    <top-menu v-if="$store.state.isLoggedIn" />
    <router-view />
  </div>
</template>

<script>
  import topMenu from './components/utils/menu/menu';
  import Loading from 'vue-loading-overlay'; //https://github.com/ankurk91/vue-loading-overlay
  //import { SweetModal, SweetModalTab } from 'sweet-modal-vue';// https://sweet-modal-vue.adepto.as/

  import 'vue-loading-overlay/dist/vue-loading.css';

  export default {
    name: 'App',
    data() {
      return {
        
      }
    },
    methods: {
    },
    components: { topMenu, Loading }
  }
</script>
