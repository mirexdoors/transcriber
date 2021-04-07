<template>
	<v-card class="pa-4">
		<div class="caption mb-2">Output as text:</div>
		<v-textarea
			name="text"
			filled
			readonly
			:value="text"
			class="textarea"
		/>

		<div v-if="false">
			<div class="caption">Download output as file:</div>
			<v-chip-group>
				<v-chip
					v-for="extension in extensions"
					:key="extension"
				>
					{{ extension }}
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
      }
    },
    data() {
      return {
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
