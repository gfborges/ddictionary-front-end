<template>
  <v-row cols="12" sm="12" md="12">
    <v-col>
      <entry-update-form :id="$route.params.entry" @updated="onUpdate" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Entry } from '~/dto/Entry'
import EntryUpdateForm from '~/components/Entry/EntryUpdateForm.vue'

export default Vue.extend({
  name: 'UpdateEntry',
  components: { EntryUpdateForm },
  computed: {
    ...mapGetters({ domain: 'domain/domain' }),
  },
  mounted() {
    console.log('hey')
  },
  methods: {
    onUpdate(entry: Entry) {
      console.log(entry)
      this.$router.push({
        name: 'domain',
        params: {
          domain: this.domain.slug,
        },
      })
    },
  },
})
</script>

<style></style>
