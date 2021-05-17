<template>
	<div class="pb-8">
		<v-card-title>
			Архив
			<v-spacer></v-spacer>
			<v-text-field
				v-model="search"
				append-icon="mdi-magnify"
				label="Поиск"
				single-line
				hide-details
			></v-text-field>
		</v-card-title>

		<div class="pb-8">
			<v-btn
				depressed
				color="error"
				:disabled="selected.length < 1 || isDeleteBtnClicked"
                @click="deleteSelectedRows"
			>
				Удалить
			</v-btn>
		</div>

		<v-data-table
            v-model="selected"
			:headers="headers"
			:items="items"
            item-key="Id"
			:search="search"
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			:items-per-page=-1
			hide-default-footer
			show-select
			:custom-filter="filterByTags"
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

			<template v-slot:item.Files="{ item }">
				<v-chip-group>
					<v-chip
						v-for="(file, key) in item.Files"
						:key="key"
						target="_blank"
						:href="file"
					>
						{{ key }}
					</v-chip>
				</v-chip-group>
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
					@click="reloadFile(host + item.FilePath)"
				>
					mdi-refresh
				</v-icon>
				<v-icon
					small
					@click="deleteFile(item.Id)"
				>
					mdi-delete
				</v-icon>
			</template>

			<template v-slot:item.Tags="{ item }">

				<div
					v-for="cat in item.Tags"
					:key="cat.name"
				>
                    <span
                        v-if="cat.name"
                        class="font-weight-bold"
                    >
                      {{ cat.name }}:
                    </span>

					<span v-if="cat.values">{{ cat.values }}</span>
				</div>
			</template>
		</v-data-table>
	</div>
</template>

<script>
  import {LOG_ROUTE, TOKEN, SERVER} from "@/parameters";

  export default {
    name: "TArchive",

    data() {
      return {
        sortBy: 'RecordNumber',
        sortDesc: true,
        search: '',
        headers: [
          {
            text: '#',
            align: 'start',
            value: 'RecordNumber',
            width: '5%',
          },
          {
            text: 'Дата',
            align: 'start',
            sortable: false,
            value: 'CreatedAt',
            width: '10%',
          },
          {
            text: 'Тэги',
            value: 'Tags',
            width: '20%',
          },
          {
            text: 'Результаты',
            value: 'Files',
            width: '20%',
          },
          {
            text: 'Ссылка',
            value: 'FilePath',
            width: '35%',
            sortable: false,
          },
          {
            text: 'Действия',
            value: 'actions',
            sortable: false,
            width: '10%'
          },
        ],
        items: [],
        selected: [],
        isDeleteBtnClicked: false,
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
      deleteSelectedRows() {
        this.isDeleteBtnClicked = true;

       this.selected.forEach(selecteditem => {
         if (selecteditem.Id) {
           this.deleteFile(selecteditem.Id);
         }
       });

        this.isDeleteBtnClicked = false;
      },

      formattedDate: (d = new Date) => {
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return `${day}.${month}.${year}`;
      },

      getTags(ner) {
        const result = {
          ORG: '',
          LOCATIONS: '',
          PERSONS: ''
        };
        const text = ner[0].sent;
        const namedEntities = ner[0].named_entities;

        for (let category in namedEntities) {

          if (namedEntities[category].length > 0) {
            switch (category) {
              case 'ORG':
                result.ORG = {name: 'ORG', values: this.getWordsFromText(namedEntities[category], text).join(',')};
                break;
              case 'LOCATION':
                result.LOCATIONS = {
                  name: 'LOCATIONS',
                  values: this.getWordsFromText(namedEntities[category], text).join(',')
                };
                break;
              case 'PER':
                result.PERSONS = {
                  name: 'PERSONS',
                  values: this.getWordsFromText(namedEntities[category], text).join(',')
                };
                break;
            }
          }
        }

        return result;
      },

      filterByTags(value, search) {
        let res = [];
        if (typeof value === 'object' && value !== null) {
          for (let type in value) {
            res.push(value[type]?.values?.indexOf(search) > -1);
          }
        } else {
          if (value)
            res.push(value.toString().indexOf(search) > -1);
        }
        return res.some(val => !!val);
      },

      getWordsFromText(ranges, text) {
        const result = [];

        ranges.forEach(range => {
          result.push(text.substr(range[0], range[1] - range[0]));
        });

        return result;
      },

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
          this.items = response.List.map(item => {
            item.Files = {
              txt: item.ResultTextPath,
              html: item.ResultHtmlPath,
              doc: item.ResultFileDocPath,
              pdf: item.ResultFilePdfPath,
            }
            item.CreatedAt = this.formattedDate(new Date(item.CreatedAt));
            item.Tags = this.getTags(JSON.parse(item.RawResult).result.ner);
            return item;
          });
        } catch (e) {
          console.error(e)
        }
      },

      reloadFile(fileUrl) {
        this.$router.push({name: 'Home', query: {fileUrl: fileUrl}});
      },

      deleteFile(id) {
        const route = new URL(LOG_ROUTE);
        try {
          fetch(route.toString() + '/' + id, {
                method: 'DELETE',
                headers: {
                  'Token': TOKEN,
                },
              }
          ).then(() => {
            this.items = [];
            this.fetchArchive(this.userId);
          });
          // eslint-disable-next-line no-empty
        } catch (e) {
        }
      }
    }
  }
</script>
