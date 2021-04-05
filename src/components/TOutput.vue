<template>
	<v-card class="pa-4">
		<div class="caption mb-2">Output as text:</div>
		<v-textarea
			name="text"
			filled
			readonly
			:value="output"
			class="textarea"
		/>

		<div class="caption">Download output as file:</div>
		<v-chip-group>
			<v-chip
				v-for="extension in extensions"
				:key="extension"
			>
				{{ extension }}
			</v-chip>
		</v-chip-group>

	</v-card>
</template>

<script>
  export default {
    name: "TOutput",

    data() {
      return {
        output: "",
        extensions: [
          '.DOCX',
          '.PDF',
          '.TXT',
          '.HTML',
        ],
      }
    },
  }
</script>


<style>
	.textarea textarea {
		min-height: 400px !important;
	}
</style>
