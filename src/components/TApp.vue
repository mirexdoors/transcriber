<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-navigation-drawer
            width="100%"
        >
          <t-parameters
              :options="options"
              class="py-8 pl-2"
              @change="changeParameter($event)"
          />
        </v-navigation-drawer>
      </v-col>
      <v-col
          cols="4"
          class="white--text pt-8"

      >
        <v-card
            elevation="0"
            class="pa-4">
          <t-file-input
              class="mb-8"
              @error="showError($event)"
              @submit="sendFiles($event)"
              @preloader="togglePreloader($event)"
          />
        </v-card>
      </v-col>
      <v-divider
          vertical
          class="divider"
      />
      <v-col
          cols="5"
          class="white--text pt-8"
      >
        <t-output
            :text="outputAsText"
            :files="outputFiles"
        />
      </v-col>
    </v-row>
  </div>

</template>

<script>
import TFileInput from "@/components/TFileInput";

import TParameters from "./TParameters";
import TOutput from "./TOutput";

import {CONVERT_ROUTE, TOKEN, OPTION_TYPES, SERVER} from "@/parameters";

export default {
  name: "TApp",
  components: {
    TOutput,
    TFileInput,
    TParameters,
  },

  data() {
    return {
      archiveItems: [],
      options: [
        {
          id: 1,
          name: 'TimeFrame',
          group: '',
          init: 15,
          values: [
            {
              value: 15,
              isDisabled: false,
            },
            {
              value: 30,
              isDisabled: false,
            },
            {
              value: 60,
              isDisabled: false,
            },
            {
              value: 120,
              isDisabled: false,
            },
          ],
          label: 'Тайминг (сек)',
          isDisabled: false,
          isReadonly: false,
          type: OPTION_TYPES.SELECT
        },
        {
          id: 2,
          name: 'language',
          group: '',
          init: 'Русский',
          values: [
            {
              value: 'Русский',
              isDisabled: false,
            },
            {
              value: 'English',
              isDisabled: true,
            },
            {
              value: 'Deutsch',
              isDisabled: true,
            },
            {
              value: 'Española',
              isDisabled: true,
            },
          ],
          label: 'Язык',
          isDisabled: false,
          isReadonly: true,
          type: OPTION_TYPES.SELECT
        },
        {
          id: 3,
          group: '',
          name: 'NamedEntityTypes',
          init: null,
          values: [
            {
              label: 'Locations',
              name: 'LOCATION',
              value: true,
              isDisabled: false,
            },
            {
              label: 'Organizations',
              name: 'ORG',
              value: true,
              isDisabled: false,
            },
            {
              label: 'Persons',
              value: true,
              name: 'PERSON',
              isDisabled: false,
            },
          ],
          label: 'Показать тэги',
          isDisabled: false,
          isReadonly: false,
          type: OPTION_TYPES.CHECKBOX,
        },
        {
          id: 4,
          name: 'IsShowPunctuation',
          group: '',
          init: true,
          values: [],
          label: 'Пунктуация',
          isDisabled: false,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH,
        },
        {
          id: 5,
          name: 'IsShowSpeaker',
          group: '',
          init: true,
          values: [],
          label: 'Показать спикеров',
          isDisabled: false,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH,
        },
        {
          id: 6,
          group: '',
          name: 'highlight',
          init: false,
          values: [],
          label: 'Ключевые слова',
          isDisabled: true,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH,
        },
        {
          id: 7,
          group: '',
          name: 'IsShowEmotions',
          init: false,
          values: [],
          label: 'Эмоции',
          isDisabled: false,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH,
        },
        {
          id: 8,
          group: '',
          name: 'dirtyWords',
          init: false,
          values: [],
          label: 'Скрыть нецензурную лексику',
          isDisabled: true,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH,
        },
        {
          id: 9,
          group: '',
          name: 'wordParasites',
          init: false,
          values: [],
          label: 'Скрыть слова паразиты',
          isDisabled: true,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH,
        },
        {
          id: 10,
          name: 'textDomainsBase',
          group: 'domains',
          init: true,
          values: [],
          label: 'Базовый',
          isDisabled: false,
          isReadonly: true,
          type: OPTION_TYPES.SWITCH,
        },
        {
          id: 11,
          group: 'domains',
          name: 'textDomainsTelecom',
          init: false,
          values: [],
          label: 'Телеком',
          isDisabled: false,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH,
        },
        {
          id: 12,
          group: 'domains',
          name: 'textDomainsLaw',
          init: false,
          values: [],
          label: 'Юридический',
          isDisabled: true,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH,
        },
        {
          id: 13,
          group: 'domains',
          init: false,
          name: 'textDomainsMedicine',
          values: [],
          label: 'Медицинский',
          isDisabled: true,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH,
        },
        {
          id: 14,
          group: 'domains',
          name: 'textDomainsMilitary',
          init: false,
          values: [],
          label: 'Военный',
          isDisabled: true,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH
        },
        {
          id: 15,
          group: 'domains',
          name: 'textDomainsCustom',
          init: false,
          values: [],
          label: 'Пользовательский',
          isDisabled: true,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH,
        },
        {
          id: 16,
          group: '',
          name: 'singleFile',
          init: false,
          values: [],
          label: 'Сохранить результат в один файл',
          isDisabled: true,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH,
        },
        {
          id: 17,
          group: '',
          name: 'numericTo Text',
          init: true,
          values: [],
          label: 'Числа в текст',
          isDisabled: true,
          isReadonly: true,
          type: OPTION_TYPES.SWITCH
        },
      ],
      queryParameters: {
        TimeFrame: 15,
        IsShowEmotions: false,
        IsShowSpeaker: true,
        IsShowPunct: true,
        IsShowPunctuation: true,
        NamedEntityTypes: [],
      },
      outputAsText: '',
      outputFiles: [],
    }
  },

  computed: {
    userId() {
      return Number(sessionStorage.getItem('user_id'));
    },
  },

  methods: {
    showError($event) {
      this.$emit('update:error', $event);
    },

    changeParameter(param) {
      if (Array.isArray(param.val)) {
        if (!param.val.length) {
          this.queryParameters.NamedEntityTypes = this.queryParameters.NamedEntityTypes.filter(type => type !== param.name);
        } else {
          this.queryParameters.NamedEntityTypes.push(param.name);
        }
      } else {
        if (this.queryParameters?.[param.name]) {
          this.queryParameters[param.name] = param.val;
        }
      }
    },

    togglePreloader($event) {
      this.$emit('preloader', $event);
    },

    async sendFiles($event) {

      this.outputAsText = '';
      this.outputFiles = [];
      if ($event.files.length > 0 || $event.fileUrl) {

        if (!$event.fileUrl) {
          for (const file of $event.files) {
            const formData = new FormData();

            formData.append('data', file);

            formData.append('TimeFrame', JSON.stringify(this.queryParameters.TimeFrame));
            formData.append('IsTimeFrameLabel', true);
            formData.append('IsShowEmotion', JSON.stringify(this.queryParameters.IsShowEmotions));
            formData.append('IsShowPunctuation', this.queryParameters.IsShowPunctuation);
            formData.append('IsShowSpeaker', JSON.stringify(this.queryParameters.IsShowSpeaker));
            formData.append('NamedEntityTypes', JSON.stringify(this.queryParameters.NamedEntityTypes));
            formData.append('IsShowTag', JSON.stringify(this.queryParameters.NamedEntityTypes.length > 0));
            formData.append('DataUrl', '');
            formData.append('UserId', this.userId.toString());

            try {
              const responseFetch = await fetch(CONVERT_ROUTE + '?IsDebug=1', {
                method: 'POST',
                headers: {
                  'Token': TOKEN,
                },
                body: formData
              });

              const response = await responseFetch.json();

              //error case
              if (!responseFetch.ok) {

                if (response.Error) {
                  this.$emit('update:error', response.Errors[0].ErrorDebug);
                }
              } else {
                if (response?.Model) {
                  this.outputAsText += response.Model?.ResultText;
                  this.outputFiles.push({ext: '.pdf', url: SERVER + response.Model.ResultFilePdfPath});
                  this.outputFiles.push({ext: '.doc', url: SERVER + response.Model.ResultFileDocPath});
                  this.outputFiles.push({ext: '.txt', url: SERVER + response.Model.ResultTextPath});
                  this.outputFiles.push({ext: '.html', url: SERVER + response.Model.ResultHtmlPath});

                }
              }
            } catch (e) {
              console.error(e);
            }
          }
          this.$emit('preloader', false);
        } else {
          const formData = new FormData();

          formData.append('DataUrl', $event.fileUrl);
          formData.append('Data', '');
          formData.append('IsTimeFrameLabel', true);
          formData.append('TimeFrame', this.queryParameters.TimeFrame);
          formData.append('IsShowEmotion', this.queryParameters.IsShowEmotions);
          formData.append('IsShowSpeaker', this.queryParameters.IsShowSpeaker);
          formData.append('IsShowPunctuation', this.queryParameters.IsShowPunctuation);
          formData.append('IsShowTag', JSON.stringify(this.queryParameters.NamedEntityTypes.length > 0));
          formData.append('NamedEntityTypes', JSON.stringify(this.queryParameters.NamedEntityTypes));

          formData.append('UserId', this.userId.toString());

          const responseFetch = await fetch(CONVERT_ROUTE + '?isDebug=1', {
            method: 'POST',
            headers: {
              'Token': TOKEN,
            },
            body: formData
          });

          const response = await responseFetch.json();

          //error case
          if (!responseFetch.ok) {

            if (response.Error) {
              this.$emit('update:error', response.Errors[0].ErrorDebug);
            }
          } else {
            if (response?.Model) {
              this.outputAsText += response.Model?.ResultText;
              this.outputFiles.push({ext: '.pdf', url: SERVER + response.Model.ResultFilePdfPath});
              this.outputFiles.push({ext: '.doc', url: SERVER + response.Model.ResultFileDocPath});
              this.outputFiles.push({ext: '.txt', url: SERVER + response.Model.ResultTextPath});
              this.outputFiles.push({ext: '.html', url: SERVER + response.Model.ResultHtmlPath});

            }
          }
        }
      }
    },
  }
}
</script>

<style>
.divider {
  max-height: 800px!important;
}
</style>