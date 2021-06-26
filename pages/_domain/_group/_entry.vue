<template>
  <div>
    <v-card class="tile">
      <v-card-title>TITLE</v-card-title>
      <v-card-subtitle>&lt;subtitle&gt;</v-card-subtitle>
    </v-card>
    <v-card class="tile">
      <v-card-title> Definitions </v-card-title>
      <v-card-text>
        <ol>
          <li v-for="(definition, i) in definitions" :key="i">
            <p>{{ definition }}</p>
          </li>
        </ol>
      </v-card-text>
    </v-card>
    <v-card class="tile">
      <v-card-title> Translations </v-card-title>
      <v-card-text>
        <ul>
          <li v-for="(transalation, i) in transalations" :key="i">
            <p>{{ transalation }}</p>
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'EntryDetail',
  data() {
    return {
      image: '#',
      title: 'title',
      group: 'group',
      definitions: ['first', 'second', 'third'],
      transalations: ['primeiro', 'segundo'],
    }
  },
})
</script>

<style>
.tile {
  margin-bottom: 5px;
  padding-bottom: 16px;
}

ol li {
  font-weight: bold;
}

li > p {
  font-weight: normal;
}
</style>
