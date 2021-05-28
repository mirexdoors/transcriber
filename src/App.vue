<template>
  <v-app class="accent">
    <t-preloader
        v-if="preloaderValue < 100"
        :value="preloaderValue"
    />

    <v-app-bar
        app
        light
        class="app-bar accent pl-2"
    >
      <div class="justify-space-between accent d-flex align-center app-bar__wrapper">
        <router-link to="/">
          <img
              src="../assets/logo.png"
              style="height: 80px;"
              class="d-block pa-4"
          />
        </router-link>

        <div class="d-flex align-center">
          <router-link to="/" class="px-4 font-weight-bold">Речь в текст</router-link>

          <router-link to="/about" class="px-4 font-weight-bold">О приложении</router-link>

          <router-link to="/archive" class="px-4 font-weight-bold">Архив</router-link>
        </div>

        <v-btn
            v-if="isAuthorized"
            icon
            class="ml-2"
            @click="logout()"
        >
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main class="main">
      <t-login
          v-if="!isAuthorized"
          @login="login"
          @update:error="error = $event"
      />
      <router-view
          v-else
           @preloader="togglePreloader($event)"
      />
    </v-main>

    <t-error
        v-if="error"
        :error="error"
        @close="resetError"
    />
  </v-app>
</template>

<script>
import TLogin from "@/components/TLogin";
import TError from "./components/TError";
import TPreloader from "@/components/TPreloader";

export default {
  name: 'App',

  components: {
    TError,
    TLogin,
    TPreloader,
  },

  data: () => ({
    isAuthorized: false,
    error: '',
    preloaderValue: 100,
  }),

  mounted() {
    this.isAuthorized = sessionStorage.getItem('user_id');
  },

  methods: {
    login() {
      this.isAuthorized = true;
    },

    logout() {
      sessionStorage.setItem('user_id', '');
      this.isAuthorized = false;
    },

    resetError() {
      this.error = '';
    },

    togglePreloader($event) {
      this.preloaderValue = $event;
    }
  },
};
</script>

<style>
.main, .app-bar__wrapper {
  width: 1600px;
  margin: 0 auto;
}

.app-bar {
  box-shadow: none !important;
}
</style>
