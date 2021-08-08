<template>
  <v-col>
    <v-row>
      <p>helllo</p>
      <search-card />
    </v-row>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import SearchCard from '~/components/Search/SearchCard.vue'
export default Vue.extend({
  components: { SearchCard },
})
</script>

<style></style>
