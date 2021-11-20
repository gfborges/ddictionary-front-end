<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <v-alert v-if="errorMsg" color="red" type="error" outlined>
        {{ errorMsg }}
      </v-alert>
      <search-card :initq="$route.query.q" @on-search="search" />
      <v-card>
        <entry-search-card
          v-for="entry in entries"
          :key="entry.id"
          :entry="entry"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import Vue from 'vue'
import EntrySearchCard from '@/components/Entry/EntrySearchCard.vue'
import SearchCard from '@/components/Search/SearchCard.vue'

export default Vue.extend({
  name: 'Search',
  components: {
    EntrySearchCard,
    SearchCard,
  },
  async asyncData({ $axios, route }) {
    try {
      const entries = await $axios.$get('/entries/search', {
        params: {
          domain: route.params.domain,
          text: route.query.q,
          log: 'y',
        },
      })
      return { entries }
    } catch (e) {
      console.error(e)
      return { errorMsg: 'Could not search for entries.' }
    }
  },
  data() {
    return {
      errorMsg: '',
      q: this.$route.query.q,
      domain: this.$route.params.domain,
      entries: null,
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  watchQuery: true,
  methods: {
    getLink(q: string) {
      return {
        name: 'domain-search',
        params: { domain: this.domain },
        query: { q },
      }
    },
    clearInput() {
      this.q = ''
    },
    search(q: string) {
      return this.$router.push(this.getLink(q))
    },
    searchedTerm() {
      return this.$route.query.q
    },
  },
})
</script>

<style scoped>
input {
  width: 100%;
  font-size: 15pt;
}
</style>
