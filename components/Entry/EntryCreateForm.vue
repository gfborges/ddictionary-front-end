<template>
  <v-card light min-width="50vw" max-height="400px" class="scroll">
    <v-card-title>Create New Entry</v-card-title>
    <v-form class="form">
      <v-text-field v-model="title" label="Title"> </v-text-field>
      <v-combobox
        v-model="group"
        :items="groups"
        label="Group"
        chips
      ></v-combobox>
      <v-list v-if="definitions.length" outlined>
        <v-subheader>Definitions</v-subheader>
        <v-list-item-group>
          <draggable v-model="definitions">
            <v-list-item v-for="(def, i) of definitions" :key="i">
              {{ def }}
            </v-list-item>
          </draggable>
        </v-list-item-group>
      </v-list>
      <v-textarea
        v-model="definition"
        label="Definition"
        counter="255"
        clearable
        @keyup.enter="addDefinition()"
      ></v-textarea>
      <v-list v-if="translations.length" outlined>
        <v-subheader>Translations</v-subheader>
        <v-list-item-group>
          <v-list-item v-for="(trans, i) of translations" :key="i">
            {{ trans }}
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-text-field
        v-model="translation"
        counter="25"
        label="Translation"
        @keyup.enter="addTransaction()"
      >
      </v-text-field>
      <v-file-input
        :rules="imageRules"
        accept="image/png, image/jpeg, image/bmp"
        label="Image"
        placeholder="Pick an image"
        prepend-icon="mdi-image"
        show-size
        @change="addImage"
      ></v-file-input>
    </v-form>
    <v-card-actions>
      <v-btn color="primary" @click="create">create</v-btn>
      <v-btn outlined color="normal" @click="emitCancel">cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import draggable from 'vuedraggable'

export default Vue.extend({
  name: 'EntryCreateForm',
  components: {
    draggable,
  },
  data() {
    return {
      imageRules: [
        (file: File) =>
          !file || file.size < 2_000_000 || 'Image should be less than 2MB!',
      ],
      title: '',
      group: '',
      definition: '',
      translation: '',
      image: '',
      groups: ['subtitle', 'group'],
      definitions: [] as string[],
      translations: [] as string[],
    }
  },
  methods: {
    emitCancel() {
      this.$emit('canceled')
    },
    async create() {
      const data = await this.$axios.$post('http://localhost:8000/entries', {
        domain: this.$route.params.domain,
        title: this.title,
        group: this.group,
        definitions: this.definitions,
        translations: this.translations,
        image: this.image,
      })
      this.$emit('created', data)
    },
    addDefinition() {
      if (this.definition.length <= 255) {
        this.definitions.push(this.definition)
        this.definition = ''
      }
    },
    addTransaction() {
      if (this.translation.length <= 25) {
        this.translations.push(this.translation)
        this.translation = ''
      }
    },
    addImage(file: File) {
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          this.image = reader.result as string
        }
        reader.readAsDataURL(file)
      }
    },
  },
})
</script>

<style>
.form {
  margin: 0px 16px 0px 16px;
}

.scroll {
  overflow-y: scroll;
}
</style>
