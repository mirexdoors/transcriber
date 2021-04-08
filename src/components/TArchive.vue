<template>
	<div class="pb-8">
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
			:items="items"
			:search="search"
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			:items-per-page=-1
			hide-default-footer
			class="elevation-1"
		>
			<template v-slot:item.FilePath="{ item }">
				<a
					:href="host + item.FilePath"
					target="_blank"
				>
					{{ host + item.FilePath }}
				</a>
			</template>

			<template v-slot:item.actions="{ item }">
				<a
					:href="host + item.FilePath"
					target="_blank"
					:download="host + item.FilePath"
				>
					<v-icon
						small
						class="mr-2"
					>
						mdi-download
					</v-icon>
				</a>
				<v-icon
					small
					class="pr-1"
				>
					mdi-refresh
				</v-icon>
				<v-icon
					small
				>
					mdi-delete
				</v-icon>
			</template>
		</v-data-table>
	</div>
</template>

<script>
  import {LOG_ROUTE, TOKEN, SERVER} from "../parameters";

  export default {
    name: "TArchive",

    data() {
      return {
        sortBy: 'Id',
        sortDesc: true,
        search: '',
        headers: [
          {
            text: '#',
            align: 'start',
            value: 'Id',
          },
          {
            text: 'Date',
            align: 'start',
            sortable: false,
            value: 'date',
          },
          {text: 'Filename', value: 'filename'},
          {text: 'Size (KB)', value: 'size'},
          {text: 'Tags', value: 'tags'},
          {text: 'Link', value: 'FilePath'},
          {text: 'Actions', value: 'actions', sortable: false},
        ],
        items: [],
      }
    },

    computed: {
      host() {
        return SERVER;
      },

      userId() {
        return Number(sessionStorage.getItem('user_id'));
      },
    },

    mounted() {
      this.fetchArchive(this.userId);
    },

    methods: {
      async fetchArchive(userId) {
        const route = new URL(LOG_ROUTE);
        const params = {
          CurrentPage: 1,
          PerPage: 1000,
          UserId: userId,
        };

        Object.keys(params).forEach(key => route.searchParams.append(key, params[key]));
        try {
          const responseJson = await fetch(route.toString(), {
            headers: {
              'Token': TOKEN,
            }
          });
          const response = await responseJson.json();
          this.items = response.List;
        } catch (e) {
          console.error(e)
        }
      },
    }
  }
</script>

