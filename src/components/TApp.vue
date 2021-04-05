<template>
	<v-container>
		<v-row>
			<v-col
				cols="5"
				class="secondary white--text pt-8"

			>
				<v-card class="pa-4">
					<t-file-input
						class="mb-8"
						@error="showError($event)"
					/>

					<t-parameters/>
				</v-card>
			</v-col>

			<v-col
				cols="7"
				class="secondary white--text pt-8"
			>
				<t-output/>
			</v-col>
		</v-row>

		<v-row>
			<v-col
				cols="12"
				class="secondary"
			>
				<t-archive></t-archive>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
  import TFileInput from "@/components/TFileInput";
  import TArchive from "@/components/TArchive";
  import TParameters from "./TParameters";
  import TOutput from "./TOutput";

  export default {
    name: "TApp",
    components: {
      TOutput,
      TFileInput,
      TArchive,
      TParameters,
    },
    methods: {
      showError($event) {
        this.$emit('update:error', $event);
      }
    },
  }
</script>

