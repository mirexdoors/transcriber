<template>
  <div>
    <t-preloader v-if="isPreloader"/>
    <v-container>
      <v-navigation-drawer
          width="350"
          app
          :value="!isPreloader"
      >
        <t-parameters
            :options="options"
            class="pa-8"
        />
      </v-navigation-drawer>

      <v-row>
        <v-col
            cols="5"
            class="secondary white--text pt-8"

        >
          <v-card class="pa-4">
            <t-file-input
                class="mb-8"
                @error="showError($event)"
                @submit="sendFile($event)"
                @preloader="togglePreloader($event)"
            />


          </v-card>
        </v-col>

        <v-col
            cols="7"
            class="secondary white--text pt-8"
        >
          <t-output
              :text="outputAsText"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col
            cols="12"
            class="secondary"
        >

          <t-archive :items="archiveItems"/>

        </v-col>
      </v-row>
    </v-container>
  </div>

</template>

<script>
import TFileInput from "@/components/TFileInput";
import TArchive from "@/components/TArchive";
import TParameters from "./TParameters";
import TOutput from "./TOutput";
import TPreloader from "@/components/TPreloader";

import {LOG_ROUTE, CONVERT_ROUTE, TOKEN, OPTION_TYPES} from "../parameters";

export default {
  name: "TApp",
  components: {
    TOutput,
    TFileInput,
    TArchive,
    TParameters,
    TPreloader,
  },

  data() {
    return {
      isPreloader: false,
      archiveItems: [],
      options: [
        {
          id: 1,
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
    }
  },

  computed: {
    userId() {
      return Number(sessionStorage.getItem('user_id'));
    },
  },

  mounted() {
    if (this.userId) {
      this.fetchArchive(this.userId);
    }
  },

  methods: {
    showError($event) {
      this.$emit('update:error', $event);
    },

    togglePreloader($event) {
      this.isPreloader = $event;
    },

    async sendFile(file) {
      if (file) {
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
            method: 'POST', headers: {
              'Token': TOKEN,
            },
            body: formData
          });
          console.log(responseFetch)
          if (responseFetch.ok) {
            const response = await responseFetch.json();
            if (response?.Model) {
              this.isPreloader = false;
              this.outputAsText = response.Model?.ResultText;
              await this.fetchArchive(this.userId);
            }
          } else {
            this.isPreloader = false;
            this.$emit('update:error', responseFetch.statusText);
          }

        } catch (e) {
          console.error(e);
          this.isPreloader = false;
        }
      }
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
        this.archiveItems = response.List;
      } catch (e) {
        console.error(e)
      }
    },
  }
}
</script>
