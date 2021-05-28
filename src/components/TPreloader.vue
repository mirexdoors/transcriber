<template>
	<v-overlay
		:absolute="absolute"
		:opacity="opacity"
		:value="overlay"
		:z-index="zIndex"
	>
		<v-row
			align="center"
			justify="center"
		>
			<v-progress-linear
				:value="value"
				height="25"
				color="teal accent-4"
				rounded
				class="preloader"
				striped
			>
				<strong>{{ preloaderText }}</strong>
			</v-progress-linear>
		</v-row>
	</v-overlay>
</template>

<script>
  export default {
    name: "PreloaderApp",

    data: () => ({
      absolute: true,
      opacity: 0.7,
      overlay: true,
      zIndex: 9999,
    }),

    props: {
      value: Number,
    },

    computed: {
      preloaderText() {
        return `${this.value}%`;
      }
    }
  }
</script>

<style>
	.preloader.preloader {
		width: 500px;
	}

	.v-application--wrap {
		height: 100vh;
		overflow: hidden;
	}

</style>
