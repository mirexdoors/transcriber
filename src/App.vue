<template>
  <v-app>
    <v-app-bar
        app
        light
        class="justify-center accent"
    >
      <v-container fluid>
        <h1 class="title text-center d-flex justify-center text--primary">TRANSCRIBER</h1>
      </v-container>
    </v-app-bar>

    <v-main>
      <t-login v-if="!isAuthorized"
      @login="login" />
      <t-app v-else></t-app>

    </v-main>
  </v-app>
</template>

<script>
import TLogin from "@/components/TLogin";
import TApp from "@/components/TApp";

export default {
  name: 'App',

  components: {
    TApp,
    TLogin,
  },

  data: () => ({
    isAuthorized: false,
  }),

  mounted() {
      this.isAuthorized = sessionStorage.getItem('user_id');
  },

  methods: {
    login() {
      this.isAuthorized = true;
    }
  },
};
</script>
