<template>
	<v-app class="accent">
		<t-preloader
			v-if="preloaderValues.length"
			:values="preloaderValues"
            @decline="declineFile($event)"
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
					<router-link
                        to="/"
						class="px-4 font-weight-bold">
                      Речь в текст
					</router-link>

					<router-link
                        to="/about"
						class="px-4 font-weight-bold">О приложении
					</router-link>

					<router-link
                        to="/archive"
						class="px-4 font-weight-bold">Архив
					</router-link>
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
				@update-preloader="updatePreloader($event)"
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
      preloaderValues: [],
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
        this.preloaderValues = $event;
      },

      updatePreloader(file) {
        if (this.preloaderValues.length === 0) return;

        const currentValues = Object.assign({}, this.preloaderValues);
        const processedValue = currentValues.find(val => val.name === file.name);

        if (processedValue) {
          processedValue.percent = file.percent;

          if (processedValue.some(processedValue => processedValue.percent < 100)) {
            this.preloaderValues = currentValues;
          } else {
            this.preloaderValues = [];
          }
        }
      },

      declineFile(declinedFileName) {
        this.preloaderValues = this.preloaderValues.filter(file => file.name !== declinedFileName);

        //Здесь же нужно сходить с запросом на удаление в апи лога и с id  файла
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
