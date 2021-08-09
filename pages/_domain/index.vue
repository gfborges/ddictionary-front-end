<template>
  <v-col>
    <v-row>
      <h1>Welcome to {{ domain.name }}</h1>
      <search-card />
    </v-row>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import SearchCard from '@/components/Search/SearchCard.vue'

export default Vue.extend({
  components: { SearchCard },
  computed: {
    ...mapGetters({
      domain: 'domain/domain',
    }),
  },
})
</script>

<style></style>
