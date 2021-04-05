<template>
	<v-dialog
		:value="true"
		max-width="500"
	>

		<v-card>
			<v-toolbar
				color="primary error"
				dark
			>
				Error
			</v-toolbar>

			<v-card-text>
				<div class="pa-6 text-h5">{{ error }}</div>
			</v-card-text>

			<v-card-actions class="justify-end">
				<v-btn
					text
					@click="resetError"
				>
					Close
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
  export default {
    name: "TError",

    props: {
      error: {
        type: String,
        default: '',
      }
    },

    methods: {
      resetError() {
        this.$emit('close');
      }
    }
  }
</script>
