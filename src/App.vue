<template>
	<v-app>
		<v-app-bar
			app
			light
			class="justify-center accent"
		>
			<v-container
				class="d-flex align-center "
			>

				<h1 class="title text-center d-flex justify-center text--primary">
					<router-link to="/">TRANSCRIBER</router-link>
				</h1>
				<v-spacer></v-spacer>
				<router-link to="/about">About</router-link>
				<router-link to="/archive" class="ml-2">Archive</router-link>
				<v-btn
					v-if="isAuthorized"
					icon
					class="ml-2"
					@click="logout()"
				>
					<v-icon>mdi-logout</v-icon>
				</v-btn>
			</v-container>
		</v-app-bar>
		<v-main>
			<t-login
				v-if="!isAuthorized"
				@login="login"
				@update:error="error = $event"
			/>
			<v-container v-else>
				<router-view/>
			</v-container>
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

  export default {
    name: 'App',

    components: {
      TError,
      TLogin,
    },

    data: () => ({
      isAuthorized: false,
      error: '',
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
    },
  };
</script>
