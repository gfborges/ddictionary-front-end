<template>
  <v-card class="card" @click="goToPage">
    <v-card-title class="text-heading text-capitalize">
      {{ title }}
    </v-card-title>
    <v-card-subtitle>&lt;{{ group }}&gt;</v-card-subtitle>
    <v-card-text> {{ definitions }} </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export interface EntrySearch {
  title: string
  group: string
  definition: string
}

export default Vue.extend({
  name: 'EntrySearchCard',
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
      return `/${domain}/entries/${this.group}/${this.title}`
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
