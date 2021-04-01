<template>
	<div>
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
			:items-per-page="5"
			:search="search"
			class="elevation-1"
		>
		</v-data-table>
	</div>
</template>

<script>
  export default {
    name: "TArchive",
    data() {
      return {
        search: '',
        headers: [
          {
            text: 'Date',
            align: 'start',
            sortable: false,
            value: 'date',
          },
          {text: 'Filename', value: 'filename'},
          {text: 'Size (KB)', value: 'size'},
          {text: 'Tags', value: 'tags'},
          {text: 'Link', value: 'link'},
        ],
        items: [
          {
            date: new Date().toISOString().split('T')[0],
            filename: '1.docx',
            size: 550,
            tags: 'text, speech',
            link: 'link',
          },
          {
            date: new Date().toISOString().split('T')[0],
            filename: '2.docx',
            size: 550,
            tags: 'text, speech',
            link: 'link',
          },
          {
            date: new Date().toISOString().split('T')[0],
            filename: '3.docx',
            size: 550,
            tags: 'text, speech',
            link: 'link',
          },
          {
            date: new Date().toISOString().split('T')[0],
            filename: '4.docx',
            size: 550,
            tags: 'text, speech',
            link: 'link',
          },
          {
            date: new Date().toISOString().split('T')[0],
            filename: '5.docx',
            size: 550,
            tags: 'text, speech',
            link: 'link',
          },
          {
            date: new Date().toISOString().split('T')[0],
            filename: '6.docx',
            size: 550,
            tags: 'text, speech',
            link: 'link',
          },
          {
            date: new Date().toISOString().split('T')[0],
            filename: '7.docx',
            size: 550,
            tags: 'text, speech',
            link: 'link',
          },
          {
            date: new Date().toISOString().split('T')[0],
            filename: '8.docx',
            size: 550,
            tags: 'text, speech',
            link: 'link',
          },
          {
            date: new Date().toISOString().split('T')[0],
            filename: '9.docx',
            size: 550,
            tags: 'text, speech',
            link: 'link',
          },
          {
            date: new Date().toISOString().split('T')[0],
            filename: '10.docx',
            size: 550,
            tags: 'text, speech',
            link: 'link',
          },
        ],
      }
    }
  }
</script>

