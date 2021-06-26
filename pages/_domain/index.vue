<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="8">
      <v-card class="" width="100%">
        <v-card-title class="headline">
          <v-input append-icon="mdi-close" @click:append="clearInput()">
            <input v-model="q" type="text" />
            <nuxt-link slot="prepend" :to="getLink()">
              <v-icon>mdi-magnify</v-icon>
            </nuxt-link>
          </v-input>
        </v-card-title>
        <v-card-text> {{ $route.params.domain }}: {{ q }} </v-card-text>
      </v-card>
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
import Vue from 'vue'
import EntrySearchCard from '@/components/Entry/EntrySearchCard.vue'

export default Vue.extend({
  name: 'Search',
  components: {
    EntrySearchCard,
  },
  asyncData() {
    return {
      entries: [
        {
          title: 'Cat',
          group: 'feline',
          definition: 'Crazy animal',
        },
        {
          title: 'Raccon',
          group: 'roedent',
          definition: 'Animal that makes good meme',
        },
      ],
    }
  },
  data() {
    return {
      q: this.$route.query.q,
      domain: this.$route.params.domain,
      entries: null,
    }
  },
  methods: {
    getLink() {
      return {
        name: 'domain',
        params: { domain: this.domain },
        query: { q: this.q },
      }
    },
    clearInput() {
      this.q = ''
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
