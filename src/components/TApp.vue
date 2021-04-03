<template>
  <v-container>
    <v-row>
      <v-col
          cols="5"
          class="secondary white--text pt-8"

      >
        <v-card class="pa-4">
          <t-file-input class="mb-8"/>

          <div class="caption mb-2">Parameters:</div>

          <v-select
              :items="[15,30,60, 120]"
              :value="15"
              label="Timing (sec)"
              outlined
          />

          <v-switch
              color="green darken-4"
              inset
              v-model="switchValue"
              label="Включить расстановку пунктуации"
          />
          <v-switch
              color="green darken-4"
              inset
              v-model="switchValue"
              label="Разделение по спикерам"
          />
          <v-switch
              color="green darken-4"
              inset
              label="Включить расстановку тэгов"
          />
          <v-switch
              color="green darken-4"
              inset
              label="Определить эмоции"
          />
          <v-switch
              color="green darken-4"
              inset
              disabled
              label="Выделить ключевые места"
          />
          <v-switch
              color="green darken-4"
              inset
              disabled
              label="Убрать ненормативную лексику"
          />
          <v-switch
              color="green darken-4"
              inset
              disabled
              label="Убрать слова-паразиты"
          />

          <div class="caption MB-2">Text domains</div>
          <v-switch
              color="green darken-4"
              inset
              v-model="switchValue"
              disabled
              label="Пользовательский"
          />
          <v-switch
              color="green darken-4"
              inset
              disabled
              label="Телекомуникационный"
          />
          <v-switch
              color="green darken-4"
              inset
              disabled
              label="Военный"
          />
          <v-switch
              color="green darken-4"
              inset
              dense
              disabled
              label="Юридический"
          />
          <v-switch
              color="green darken-4"
              inset
              dense
              disabled
              label="Нефтегаовый"
          />
        </v-card>
      </v-col>

      <v-col
          cols="7"
          class="secondary white--text pt-8"
      >
        <v-card class="pa-4">
          <div class="caption mb-2">Output as text:</div>
          <v-textarea
              name="input-7-1"
              filled
              readonly
              height="484"
              value="The The Woodman set to work at once, and so sharp was his axe that the tree was soon c
                  hopped nearly through The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly throughThe Woodman set to work at once, and so sharp was his axe that the tree was soon c
                  hopped nearly through The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly throughThe Woodman set to work at once, and so sharp was his axe that the tree was soon c
                  hopped nearly through The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly throughThe Woodman set to work at once, and so sharp was his axe that the tree was soon c
                  hopped nearly through The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly throughThe Woodman set to work at once, and so sharp was his axe that the tree was soon c
                  hopped nearly through The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly throughThe Woodman set to work at once, and so sharp was his axe that the tree was soon c
                  hopped nearly through The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly throughThe Woodman set to work at once, and so sharp was his axe that the tree was soon c
                  hopped nearly through The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly throughThe Woodman set to work at once, and so sharp was his axe that the tree was soon c
                  hopped nearly through The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly throughThe Woodman set to work at once, and so sharp was his axe that the tree was soon c
                  hopped nearly through The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly throughThe Woodman set to work at once, and so sharp was his axe that the tree was soon c
                  hopped nearly through The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly throughThe Woodman set to work at once, and so sharp was his axe that the tree was soon c
                  hopped nearly through The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly throughThe Woodman set to work at once, and so sharp was his axe that the tree was soon c
                  hopped nearly through The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly throughWoodman set to work at once, and so sharp was his axe that the tree was soon c
                  hopped nearly through The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly throughThe Woodman set to work at once, and so sharp was his axe that the tree was soon c
                  hopped nearly through The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through"
          />

          <div class="caption">Download output as file:</div>
          <v-chip-group>
            <v-chip
                v-for="tag in tags"
                :key="tag"
            >
              {{ tag }}
            </v-chip>
          </v-chip-group>

        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
          cols="12"
          class="secondary"
      >
        <t-archive></t-archive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TFileInput from "@/components/TFileInput";
import TArchive from "@/components/TArchive";

export default {
  name: "TApp",
  components: {
    TFileInput,
    TArchive,
  },
  data() {
    return {
      switchValue: true,
      tags: [
        '.DOCX',
        '.PDF',
        '.TXT',
        '.HTML',
      ],
    }
  },
}
</script>

<style scoped>

</style>