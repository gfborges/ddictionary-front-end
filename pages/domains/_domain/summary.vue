<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title> Summary </v-card-title>
      </v-card>
      <entry-search-card
        v-for="entry in entries"
        :key="entry.id"
        :entry="entry"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { Entry } from '~/dto/Entry'
export default Vue.extend({
  name: 'Summary',
  async asyncData({ $axios, route }) {
    const domain = route.params.domain
    const entries = await $axios.$get('/entries/all', {
      params: { domain },
    })
    return { entries }
  },
  data() {
    return {
      domain: this.$route.params.domain,
    }
  },
  methods: {
    entryLink(entry: Entry) {
      const params = {
        domain: this.domain,
        group: entry.group,
        entry: entry.title,
      }
      return { name: 'domains-domain-entries-group-entry', params }
    },
  },
})
</script>

<style></style>
