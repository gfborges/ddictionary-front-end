<template>
  <v-row cols="12" sm="12" md="12">
    <v-col>
      <entry-create-form @created="onCreated" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import EntryCreateForm from '@/components/Entry/EntryCreateForm.vue'
import { Entry } from '~/dto/Entry'

export default Vue.extend({
  name: 'CreateEntry',
  components: { EntryCreateForm },
  computed: {
    ...mapGetters({ domain: 'domain/domain' }),
  },
  methods: {
    async onCreated(entry: Entry) {
      try {
        entry = await this.$axios.$get('/entries/' + entry._id)
        this.$router.push({
          name: 'domains-domain-entries-group-entry',
          params: {
            domain: this.$route.params.domain,
            group: entry.group,
            entry: entry.title,
          },
        })
      } catch (e) {
        this.$router.push({
          name: 'domains-domain',
          params: {
            domain: this.$route.params.domain,
          },
        })
      }
    },
  },
})
</script>

<style></style>
