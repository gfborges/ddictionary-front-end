<template>
  <v-col>
    <v-row class="mb-5">
      <h1>{{ domain.name }} Dictionary Docs</h1>
      <search-card @on-search="search" />
    </v-row>
    <v-row class="mt-5 mb-5">
      <v-card class="pa-5 description__card">
        <v-card-text class="description__text">
          <vue-markdown id="description" :source="domain.description" />
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="mb-5">
      <v-card class="description__card">
        <v-card-text class="description__text">
          <span>
            <v-icon> mdi-exit-to-app </v-icon>
            <nuxt-link id="summary__link" :to="summaryLink()">
              go to summary
            </nuxt-link>
          </span>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row>
      <v-card class="mr-5 log__card">
        <v-card-title> Latest searches </v-card-title>
        <v-list>
          <v-list-item v-for="log in searchLogs.msgs.slice(0, 5)" :key="log">
            {{ log }}
          </v-list-item>
        </v-list>
      </v-card>
      <v-card class="log__card">
        <v-card-title> Viewed entries </v-card-title>
        <v-list>
          <v-list-item v-for="log in recentViews.msgs.slice(0, 5)" :key="log">
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
import Domain from '~/dto/Domain'

export default Vue.extend({
  components: { SearchCard, VueMarkdown },
  async asyncData({ route, $axios, error }) {
    const domainSlug = route.params.domain
    const domain = await $axios.$get(`/domains/${domainSlug}`).catch(() => {
      error(new Error('Could not find domain ' + domainSlug))
    })
    const searchLogs = await $axios
      .$get(`/domains/${domainSlug}/logs/search`)
      .catch((e) => console.error(e))
    const recentViews = await $axios
      .$get(`/domains/${domainSlug}/logs/entry_view`)
      .catch((e) => console.error(e))
    return { domain, searchLogs, recentViews }
  },
  data() {
    return {
      defaultDescription: 'A documentation',
      recentViews: [],
      searchLogs: [],
      domain: null as unknown as Domain,
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
        name: 'domains-domain-search',
        params: { domain: this.$route.params.domain },
        query: { q },
      }
    },
    search(q: string) {
      return this.$router.push(this.getLink(q))
    },
    summaryLink(): { name: string; params: {} } {
      const domain = this.$route.params.domain
      return { name: 'domains-domain-summary', params: { domain } }
    },
  },
})
</script>

<style>
.description__card {
  width: 100%;
}
.description__text {
  font-family: Arial, Helvetica, sans-serif;
  color: #000;
  font-size: 1.2em;
}

.log__card {
  width: 49%;
}
</style>
