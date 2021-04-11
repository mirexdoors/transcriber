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
        <v-card class="pa-4">
          <t-file-input
              class="mb-8"
              @error="showError($event)"
              @submit="sendFiles($event)"
              @preloader="togglePreloader($event)"
          />
        </v-card>
      </v-col>

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
          label: 'Timing (sec)',
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
          label: 'Language',
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
          label: 'Show tags',
          isDisabled: false,
          isReadonly: false,
          type: OPTION_TYPES.CHECKBOX,
        },
        {
          id: 4,
          name: 'IsShowPunct',
          group: '',
          init: true,
          values: [],
          label: 'Punctuate',
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
          label: 'Speakers',
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
          label: 'Highlight keywords',
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
          label: 'Emotions',
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
          label: 'Remove dirty words',
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
          label: 'Remove words-parasites',
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
          label: 'Base',
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
          label: 'Telecom',
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
          label: 'Law',
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
          label: 'Medicine',
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
          label: 'Military',
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
          label: 'Custom',
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
          label: 'Single output file',
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
          label: 'Numeric to text',
          isDisabled: true,
          isReadonly: true,
          type: OPTION_TYPES.SWITCH
        },
      ],
      queryParameters: {
        TimeFrame: 15,
        IsShowEmotions: true,
        IsShowSpeaker: true,
        IsShowPunct: true,
        NamedEntityTypes: ['ORG', 'PERSON', 'LOCATION'],
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
      if (this.queryParameters?.[param.name]) {
        this.queryParameters[param.name] = param.val;
      }

      console.log(param)
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


            formData.append('TimeFrame', this.queryParameters.TimeFrame);
            formData.append('IsShowEmotion', this.queryParameters.IsShowEmotions);
            formData.append('IsShowSpeaker', this.queryParameters.IsShowSpeaker);
            formData.append('NamedEntityTypes', JSON.stringify(this.queryParameters.NamedEntityTypes));
            formData.append('DataUrl', '');
            formData.append('IsDebug', '1');
            formData.append('UserId', this.userId.toString());

            try {
              const responseFetch = await fetch(CONVERT_ROUTE, {
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
                  this.outputAsText += response.Model?.Data[0].Text;
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
          formData.append('TimeFrame', '15');
          formData.append('IsShowEmotion', 'true');
          formData.append('IsShowSpeaker', 'true');
          formData.append('IsShowTag', 'false');
          formData.append('IsDebug', '1');
          formData.append('UserId', this.userId.toString());

          const responseFetch = await fetch(CONVERT_ROUTE, {
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
              this.outputAsText += response.Model?.Data[0].Text;
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
