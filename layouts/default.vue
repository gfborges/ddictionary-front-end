<template>
  <v-app>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon />
      <v-btn color="primary" @click="overlay = !overlay"> create </v-btn>
    </v-app-bar>
    <v-main>
      <v-overlay :value="overlay">
        <entry-create-form @canceled="overlay = false" @created="onCreated" />
      </v-overlay>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import EntryCreateForm from '@/components/Entry/EntryCreateForm.vue'
interface EntryCreateResponse {
  id: string
}
export default Vue.extend({
  components: { EntryCreateForm },
  data() {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      overlay: false,
    }
  },
  methods: {
    toggleOverlay() {
      this.overlay = !this.overlay
    },
    onCreated(data: EntryCreateResponse) {
      if (data.id) {
        this.toggleOverlay()
      }
    },
  },
})
</script>
