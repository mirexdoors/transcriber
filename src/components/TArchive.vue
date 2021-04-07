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
		</v-data-table>
	</div>
</template>

<script>
  import {SERVER} from "../parameters";

  export default {
    name: "TArchive",

    props: {
      items: {
        type: Array,
        default: () => [],
      }
    },

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
        ],
      }
    },

    computed: {
      host() {
        return SERVER;
      }
    },
  }
</script>

