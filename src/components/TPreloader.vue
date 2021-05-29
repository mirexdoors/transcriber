<template>
	<v-overlay
		:absolute="absolute"
		:opacity="opacity"
		:value="overlay"
		:z-index="zIndex"
	>
		<v-col
			justify="<v-row"
		>
			<div
				v-for="(value, key) in values"
				:key="key"
				class="mb-8"
			>
				<strong class="mb-0">{{ value.name }}</strong>

				<v-row class="align-center">
					<v-progress-linear
						:value="value.percent"
						height="25"
						color="teal accent-4"
						rounded
						class="preloader my-0"
						striped
					>
						<strong>{{ showPercent(value.percent) }}</strong>
					</v-progress-linear>

					<v-btn
						color="red"
						dark
						class="ma-2"
						:disabled="!value.id"
						@click="decline(value.name)"
					>
						Отменить
						<v-icon
							dark
							right
						>
							mdi-cancel
						</v-icon>
					</v-btn>
				</v-row>
			</div>
		</v-col>
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
      values: Array,
    },

    mounted() {
      const appWrap = document.querySelector('.v-application--wrap');
      appWrap.style.height = '100vh';
      appWrap.style.overflow = 'hidden';
    },

	destroyed() {
      const appWrap = document.querySelector('.v-application--wrap');
      appWrap.style.height = '100%';
      appWrap.style.overflow = 'auto';
    },

	methods: {
      decline(fileName) {
        this.$emit('decline', fileName);
      },

      showPercent(percent) {
		return percent <= 100 ? `${percent}%` :  `100%`;
      }
	}
  }
</script>

<style>
	.preloader.preloader {
		width: 500px;
	}
</style>
