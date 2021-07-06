<template>
  <v-row>
    <v-col>
      <v-card class="tile">
        <v-card-title>
          {{ captalize(title) }} <v-spacer />
          <v-icon id="delete">mdi-delete</v-icon>
          <v-icon id="update">mdi-lead-pencil</v-icon>
        </v-card-title>
        <v-card-subtitle>&lt;{{ group }}&gt;</v-card-subtitle>
      </v-card>
      <v-card class="tile">
        <v-card-title> Definitions </v-card-title>
        <v-card-text class="text">
          <v-list>
            <v-list-item v-for="(definition, i) in definitions" :key="i">
              <b>{{ i + 1 }}.</b>&nbsp; {{ definition }}
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
      <v-card class="tile">
        <v-card-title> Translations </v-card-title>
        <v-card-text class="text">
          <v-list>
            <v-list-item v-for="(trans, i) in translations" :key="i">
              {{ trans }}
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col v-if="image">
      <div class="img__wrapper">
        <img :src="image" :alt="title" />
      </div>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'EntryDetail',
  async asyncData({ $axios, route }) {
    return await $axios.$get('http://localhost:8000/entries/one', {
      params: {
        domain: route.params.domain,
        group: route.params.group,
        title: route.params.entry,
      },
    })
  },
  data() {
    return {
      image:
        'https://s2.glbimg.com/GNj4iknAWT6WI5kK0VXxPCSyF34=/696x390/top/smart/s2.glbimg.com/ft2dX8r-GS9hdBtuvCXZkD-a2lo=/0x39:695x764/695x725/s.glbimg.com/po/tt2/f/original/2016/07/08/curiouscattwitter.jpg',
      title: 'title',
      group: 'group',
      definitions: ['first', 'second', 'third'],
      translations: ['primeiro', 'segundo'],
    }
  },
  methods: {
    captalize(str: string) {
      const firstLetter = str.charAt(0).toLocaleUpperCase()
      return firstLetter + str.substring(1)
    },
  },
})
</script>

<style>
.tile {
  margin-bottom: 5px;
}

.text {
  color: rgba(0, 0, 0, 1);
  font-size: 1rem;
}

#delete:hover {
  color: crimson;
  transition-delay: 0.125s;
}

#update:hover {
  color: goldenrod;
  transition-delay: 0.125s;
}

ol li {
  font-weight: bold;
}

li > p {
  font-weight: normal;
}

.img__wrapper {
  display: grid;
  justify-content: center;
  height: 100%;
}

img {
  display: block;
  margin: auto;
  max-width: 400px;
}
</style>
