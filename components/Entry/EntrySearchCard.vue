<template>
  <v-card class="card" @click="goToPage">
    <v-card-title class="text-heading text-capitalize">
      {{ title }}
    </v-card-title>
    <v-card-subtitle>&lt;{{ group }}&gt;</v-card-subtitle>
    <v-card-text :style="{ textAlign: 'left' }">
      <vue-markdown> {{ definitions }} </vue-markdown>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
// eslint-disable-next-line import/named
import Vue, { PropOptions } from 'vue'
import VueMarkdown from 'vue-markdown'

export interface EntrySearch {
  title: string
  group: string
  definition: string
}

export default Vue.extend({
  name: 'EntrySearchCard',
  components: {
    VueMarkdown,
  },
  props: {
    entry: {
      type: Object,
      required: true,
    } as PropOptions<EntrySearch>,
  },
  data() {
    return {
      ...this.$props.entry,
    }
  },
  methods: {
    goToPage() {
      const link = this.getLink()
      return this.$router.push(link)
    },
    getLink() {
      const domain = this.$route.params.domain
      return {
        name: 'domains-domain-entries-group-entry',
        params: { domain, group: this.group, entry: this.title },
      }
    },
  },
})
</script>

<style scoped>
.card {
  cursor: pointer;
  margin-top: 5px;
}
</style>
