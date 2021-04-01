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
			<v-container>
				<v-row>
					<v-col
						cols="7"
						class="secondary white--text"

					>
						<v-card class="pa-4">
							<t-file-input class="mb-8"/>

							<div class="caption">Output as text:</div>
							<v-textarea
								name="input-7-1"
								filled
								readonly
								auto-grow
								value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
							/>

							<div class="caption">Download output as file:</div>
							<v-chip-group>
								<v-chip
									v-for="tag in tags"
									:key="tag"
								>
									{{ tag }}
								</v-chip>
							</v-chip-group>
						</v-card>
					</v-col>

					<v-col
						cols="5"
						class="secondary white--text"
					>
						<v-card class="pa-4">

							<div class="caption mb-4">Parameters:</div>

							<v-select
								:items="[5,10,15]"
								label="Timing"
								outlined
							/>


							<v-switch
								inset
								label="Parameter 1"
							/>
							<v-switch
								inset
								label="Parameter 2"
							/>
							<v-switch
								inset
								label="Parameter 3"
							/>
							<v-switch
								inset
								label="Parameter 4"
							/>

						</v-card>
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
		</v-main>
	</v-app>
</template>

<script>
  import TFileInput from "./components/TFileInput";
  import TArchive from "./components/TArchive";

  export default {
    name: 'App',

    components: {
      TFileInput,
      TArchive,
    },

    data: () => ({
      tags: [
        '.DOCX',
        '.PDF',
        '.TXT',
        '.HTML',
      ],
    }),
  };
</script>
