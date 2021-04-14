<template>
  <v-card
      elevation="0"
      class="pa-4">
    <div class="caption mb-2">Результат:</div>
    <v-textarea
        name="text"
        filled
        readonly
        :value="text"
        class="textarea"
    />

    <div style="min-height: 100px;">
      <div class="caption">Скачать результат:</div>
      <div
          v-for="(fileGroup, key) in groupedFiles"
          :key="key"
      >
        <div>{{ key }}:</div>
        <v-chip-group>
          <v-chip
              v-for="(file) in fileGroup"
              :key="file.url"
              target="_blank"
              :href="file.url"
          >
            {{ file.ext }}
          </v-chip>
        </v-chip-group>
      </div>

    </div>
  </v-card>
</template>

<script>
export default {
  name: "TOutput",

  props: {
    text: {
      type: String,
      default: '',
    },
    files: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    groupedFiles() {
      const result = {};
      if (this.files.length) {
        this.files.forEach(file => {
          if (result[file.name]) {
            result[file.name].push(file);
          } else {
            result[file.name] = [file];
          }
        });
      }

      return result;
    }
  },
}
</script>


<style>
.textarea textarea {
  min-height: 580px !important;
}
</style>
