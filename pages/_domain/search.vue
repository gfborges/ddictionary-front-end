<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="8">
      <search-card :initq="$route.query.q" />
      <v-card>
        <entry-search-card
          v-for="(entry, i) of entries"
          :key="i"
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
  async asyncData({ $axios, route, error }) {
    return {
      entries: await $axios
        .$get('/entries/all', {
          params: {
            domain: route.params.domain,
          },
        })
        .catch(() => error({ statusCode: 404 })),
    }
  },
  data() {
    return {
      q: this.$route.query.q,
      domain: this.$route.params.domain,
      entries: null,
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    getLink() {
      return {
        name: 'domain-search',
        params: { domain: this.domain },
        query: { q: this.q },
      }
    },
    clearInput() {
      this.q = ''
    },
    search() {
      return this.$router.push(this.getLink())
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
