<template>
	<v-card
      elevation="0"
      class="pa-4">
		<div class="caption mb-2">Output as text:</div>
		<v-textarea
			name="text"
			filled
			readonly
			:value="text"
			class="textarea"
		/>

		<div style="min-height: 100px;">
			<div class="caption">Download output</div>
			<v-chip-group>
				<v-chip
					v-for="file in files"
					:key="file.url"
          target="_blank"
          :href="file.url"
				>
         {{ file.ext }}
				</v-chip>
			</v-chip-group>
		</div>
	</v-card>
</template>

<script>
  export default {
    name: "TOutput",

    props: {
      text: {
        type: String,
        default: '',
      },
      files: {
        type: Array,
        default: () => [],
      },
    },
  }
</script>


<style>
	.textarea textarea {
		min-height: 580px !important;
	}
</style>
