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
              :items="domain.groups"
              label="Group"
              chips
            ></v-combobox>
            <client-only placeholder="Loading Your Editor...">
              <vue-simplemde
                ref="markdownEditor"
                v-model="currentDefinitionText"
                :configs="editor"
                placeholder="Write your definition"
                @input="addDefinition()"
              ></vue-simplemde>
              <v-btn class="text--button" @click="addDefinition">
                add definition
              </v-btn>
            </client-only>
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
                  <v-list-item-content @mouseover="def.toggleShowEdit()">
                    <vue-markdown> {{ def.text }} </vue-markdown>
                  </v-list-item-content>
                  <v-list-item-action v-show="def.showEdit">
                    <span>
                      <v-icon @click="definitions.splice(def, 1)">
                        mdi-delete
                      </v-icon>
                      <v-icon>mdi-lead-pencil</v-icon>
                    </span>
                  </v-list-item-action>
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
import VueMarkdown from 'vue-markdown'
import { mapGetters } from 'vuex'
import { Definition } from './Definition'

export default Vue.extend({
  name: 'EntryCreateForm',
  components: {
    draggable,
    VueMarkdown,
  },
  data() {
    return {
      imageRules: [
        (file: File) =>
          !file || file.size < 2_000_000 || 'Image should be less than 2MB!',
      ],
      title: '',
      group: '',
      currentDefinitionText: '',
      translation: '',
      image: '',
      definitions: [] as Definition[],
      translations: [] as string[],
      editor: {
        toolbar: [
          'bold',
          'italic',
          'heading',
          '|',
          'heading-smaller',
          'heading-bigger',
          'quote',
          '|',
          'table',
          'link',
          'code',
          'guide',
          'clean-block',
        ],
        spellChecker: false,
      },
    }
  },
  head() {
    return {
      title: 'create entry',
    }
  },
  computed: {
    ...mapGetters({ domain: 'domain/domain' }),
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
      if (this.currentDefinitionText) {
        this.definitions.push(new Definition(this.currentDefinitionText))
        this.currentDefinitionText = ''
        const simplemde = (this.$refs.markdownEditor as any).simplemde
        simplemde.value('')
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
