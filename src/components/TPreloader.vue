<template>
	<v-overlay
		:absolute="absolute"
		:opacity="opacity"
		:value="overlay"
		:z-index="zIndex"
	>
		<v-layout
            row
			wrap
			align-center
			justify-center
			class="mx-auto my-auto">
			<v-progress-circular
				:size="250"
				:width="15"
				color="primary"
				class="preloader"
				indeterminate
			>
				<span class="display-2 font-weight-bold">{{ preloaderText }}</span>
			</v-progress-circular>
		</v-layout>
	</v-overlay>
</template>

<script>
  export default {
    name: "PreloaderApp",

    data: () => ({
      absolute: true,
      opacity: 0.6,
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

<style scoped>
	.preloader {
		top: 50% !important;
		transform: translateY(-50%) !important;
	}
</style>
