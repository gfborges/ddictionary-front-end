<template>
  <v-card>
    <v-card-title>Create New Entry</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-form class="form">
            <v-text-field v-model="title" required label="Title">
            </v-text-field>
            <v-combobox
              v-model="group"
              :items="groups"
              label="Group"
              chips
            ></v-combobox>
            <no-ssr placeholder="Loading Your Editor...">
              <vue-editor
                v-model="definition"
                :disabled="editor.disabled"
                :editor-options="editor.options"
              ></vue-editor>
            </no-ssr>
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
        </v-col>
        <v-col class="overflow-y-auto" style="max-height: 70vh">
          <v-list outlined>
            <v-subheader>Definitions</v-subheader>
            <v-list-item-group>
              <draggable v-model="definitions">
                <v-list-item v-for="(def, i) of definitions" :key="i">
                  {{ def }}
                </v-list-item>
              </draggable>
            </v-list-item-group>
          </v-list>
          <v-list outlined class="mt-2">
            <v-subheader>Translations</v-subheader>
            <v-list-item-group>
              <v-list-item v-for="(trans, i) of translations" :key="i">
                {{ trans }}
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
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
      editor: {
        disabled: false,
        toolbar: ['bold', 'italic', 'underline'],
        options: {
          modules: {
            toolbar: false,
          },
        },
      },
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
</style>
