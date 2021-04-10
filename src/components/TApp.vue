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
          name: 'timing',
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
          init: null,
          values: [
            {
              value: 'Locations',
              isDisabled: false,
            },
            {
              value: 'Organizations',
              isDisabled: true,
            },
            {
              value: 'Persons',
              isDisabled: true,
            },
          ],
          label: 'Show tags',
          isDisabled: false,
          isReadonly: false,
          type: OPTION_TYPES.CHECKBOX
        },
        {
          id: 4,
          group: '',
          init: true,
          values: [],
          label: 'Punctuate',
          isDisabled: false,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH
        },
        {
          id: 5,
          group: '',
          init: true,
          values: [],
          label: 'Speakers',
          isDisabled: false,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH
        },
        {
          id: 6,
          group: '',
          init: false,
          values: [],
          label: 'Highlight keywords',
          isDisabled: true,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH
        },
        {
          id: 7,
          group: '',
          init: false,
          values: [],
          label: 'Emotions',
          isDisabled: true,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH
        },
        {
          id: 8,
          group: '',
          init: false,
          values: [],
          label: 'Remove dirty words',
          isDisabled: true,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH
        },
        {
          id: 9,
          group: '',
          init: false,
          values: [],
          label: 'Remove words-parasites',
          isDisabled: true,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH
        },
        {
          id: 10,
          group: 'domains',
          init: true,
          values: [],
          label: 'Base',
          isDisabled: false,
          isReadonly: true,
          type: OPTION_TYPES.SWITCH
        },
        {
          id: 11,
          group: 'domains',
          init: false,
          values: [],
          label: 'Telecom',
          isDisabled: false,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH
        },
        {
          id: 12,
          group: 'domains',
          init: false,
          values: [],
          label: 'Law',
          isDisabled: true,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH
        },
        {
          id: 13,
          group: 'domains',
          init: false,
          values: [],
          label: 'Medicine',
          isDisabled: true,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH
        },
        {
          id: 14,
          group: 'domains',
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
          init: false,
          values: [],
          label: 'Custom',
          isDisabled: true,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH
        },
        {
          id: 16,
          group: '',
          init: false,
          values: [],
          label: 'Single output file',
          isDisabled: true,
          isReadonly: false,
          type: OPTION_TYPES.SWITCH
        },
        {
          id: 17,
          group: '',
          init: true,
          values: [],
          label: 'Numeric to text',
          isDisabled: true,
          isReadonly: true,
          type: OPTION_TYPES.SWITCH
        },
      ],
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


            formData.append('TimeFrame', '15');
            formData.append('IsShowEmotion', 'true');
            formData.append('IsShowSpeaker', 'true');
            formData.append('IsShowTag', 'false');
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
                  this.outputAsText += response.Model?.ResultText;
                  this.outputFiles.push({ext: '.pdf', url: SERVER + response.Model.ResultFilePdfPath});
                  this.outputFiles.push({ext: '.doc', url: SERVER + response.Model.ResultFileDocPath});

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
              this.outputAsText += response.Model?.ResultText;
              this.outputFiles.push({ext: '.pdf', url: SERVER + response.Model.ResultFilePdfPath});
              this.outputFiles.push({ext: '.doc', url: SERVER + response.Model.ResultFileDocPath});

            }
          }
        }
      }
    },
  }
}
</script>
