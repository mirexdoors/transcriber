<template>
	<v-app>
		<v-app-bar
			app
			light
			class="justify-center accent"
		>
			<v-container fluid>
				<h1 class="title text-center d-flex justify-center text--primary">Transcriber</h1>
			</v-container>
		</v-app-bar>

		<v-main>
			<v-container>
				<v-row>
					<v-col
						cols="6"
						class="secondary white--text"

                    >
                        <v-card
                            outlined
                            >
                        <v-file-input
                            chips
                            multiple
                            label="File input w/ chips"
                        />

                        <div
                        style="height: 600px;"
                        >Здесь результат распознавания текста</div>
                        </v-card>
                    </v-col>
					<v-col
						cols="6"
						class="secondary white--text">
                        <v-card
                            outlined
                        >
                        Здесь параметры

                        <v-select
                            :items="[1,2,3]"
                            label="Timing"
                            outlined
                        />


                        <v-switch
                            inset
                            label="Param 1"
                        />

                        </v-card>
                    </v-col>
				</v-row>

				<v-row>
					<v-col cols="12" class="secondary">
                        <v-card-title>
                            Archive
                            <v-spacer></v-spacer>
                            <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details
                            ></v-text-field>
                        </v-card-title>
						<v-data-table
							:headers="headers"
							:items="desserts"
							:items-per-page="5"
							class="elevation-1"
						>
						</v-data-table>

					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>

  export default {
    name: 'App',

    components: {},

    data: () => ({
        search: '',
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {text: 'Calories', value: 'calories'},
        {text: 'Fat (g)', value: 'fat'},
        {text: 'Carbs (g)', value: 'carbs'},
        {text: 'Protein (g)', value: 'protein'},
        {text: 'Iron (%)', value: 'iron'},
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
    }),
  };
</script>
