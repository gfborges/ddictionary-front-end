<template>
  <v-card class="" width="100%">
    <v-card-title class="headline">
      <v-input append-icon="mdi-close" @click:append="clearInput()">
        <input ref="search" v-model="q" type="text" @keyup.enter="search" />
        <v-icon slot="prepend" @click="search">mdi-magnify</v-icon>
      </v-input>
    </v-card-title>
    <v-card-text v-if="searchedTerm()">
      searched for {{ searchedTerm() }} on {{ domain }}
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SearchCard',
  props: {
    initq: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      domain: this.$route.params.domain,
      q: this.initq,
    }
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
