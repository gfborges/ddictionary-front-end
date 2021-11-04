<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title> Summary </v-card-title>
        <v-list>
          <v-list-item v-for="entry of entries" :key="entry.id">
            <v-list-item-content>
              <v-list-item-title>
                <nuxt-link :to="entryLink(entry)">
                  {{ entry.title }}
                </nuxt-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
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
    const entries = await $axios.$get('http://localhost:8000/entries/all', {
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
      return `/${this.domain}/entries/${entry.group}/${entry.title}`
    },
  },
})
</script>

<style></style>
