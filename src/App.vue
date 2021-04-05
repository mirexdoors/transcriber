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
			<t-login
				v-if="!isAuthorized"
				@login="login"
				@update:error="error = $event"
			/>
			<t-app
				v-else
				@update:error="error = $event"
			/>
			{{ error }}
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
  import TApp from "@/components/TApp";
  import TError from "./components/TError";

  export default {
    name: 'App',

    components: {
      TError,
      TApp,
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

      resetError() {
        this.error = '';
      },
    },
  };
</script>
