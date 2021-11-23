<template>
  <v-card class="" width="100%">
    <v-card-title class="headline">
      <v-input :messages="[searchedTermMessage()]">
        <v-icon slot="prepend" @click="search">mdi-magnify</v-icon>
        <input
          ref="search"
          v-model="q"
          type="text"
          placeholder="search..."
          @keyup.enter="search"
        />
        <v-icon v-if="q" slot="append" @click="clearInput">mdi-close</v-icon>
      </v-input>
    </v-card-title>
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
    clearInput() {
      this.q = ''
    },
    search() {
      if (this.q) {
        this.$emit('on-search', this.q)
      }
    },
    searchedTermMessage() {
      const searched = this.$route.query.q
      if (searched) {
        return `searched for ${this.$route.query.q}`
      }
      return ''
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
