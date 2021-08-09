<template>
  <v-row cols="12" sm="12" md="12">
    <v-col>
      <entry-create-form />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import EntryCreateForm from '~/components/Entry/EntryCreateForm.vue'
export default Vue.extend({
  name: 'CreateEntry',
  components: { EntryCreateForm },
})
</script>

<style></style>
