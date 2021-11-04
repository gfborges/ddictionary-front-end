<template>
  <v-col>
    <v-row class="mb-5">
      <h1>{{ domain.name }} Dictionary Docs</h1>
      <search-card @on-search="search" />
    </v-row>
    <v-row class="mt-5 mb-5">
      <v-card id="description__card" class="pa-5">
        <v-card-text id="description__text">
          <vue-markdown id="description" :source="domain.description" />
        </v-card-text>
      </v-card>
    </v-row>
    <v-row>
      <v-card id="search_logs__card" class="mr-5">
        <v-card-title> Latest searches </v-card-title>
        <v-list>
          <v-list-item v-for="log in searchLogs" :key="log">
            {{ log }}
          </v-list-item>
        </v-list>
      </v-card>
      <v-card id="view_logs__card">
        <v-card-title> Viewed entries </v-card-title>
        <v-list>
          <v-list-item v-for="log in recentViews" :key="log">
            {{ log }}
          </v-list-item>
        </v-list>
      </v-card>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import VueMarkdown from 'vue-markdown'
import SearchCard from '@/components/Search/SearchCard.vue'

export default Vue.extend({
  components: { SearchCard, VueMarkdown },
  async asyncData({ route, $axios, error }) {
    const domainSlug = route.params.domain
    const domain = await $axios.$get(`/domains/${domainSlug}`).catch(() => {
      error(new Error('Could not find domain ' + domainSlug))
    })
    return { domain }
  },
  data() {
    return {
      defaultDescription: 'A documentation',
      recentViews: ['Account', 'Agency', 'Transaction', 'Debt', 'Credit'],
      searchLogs: ['acount', 'agent', 'transactions', 'debtit', 'card'],
    }
  },
  computed: {
    ...mapGetters({
      user: 'domain/domain',
    }),
  },
  methods: {
    getLink(q: string) {
      return {
        name: 'domain-search',
        params: { domain: this.$route.params.domain },
        query: { q },
      }
    },
    search(q: string) {
      return this.$router.push(this.getLink(q))
    },
  },
})
</script>

<style>
#description__card {
  width: 100%;
}
#description__text {
  font-family: Arial, Helvetica, sans-serif;
  color: #000;
  font-size: 1.2em;
}

#search_logs__card {
  width: 49%;
}

#view_logs__card {
  width: 49%;
}
</style>
