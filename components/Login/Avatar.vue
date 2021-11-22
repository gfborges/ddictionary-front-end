<template>
  <v-menu bottom min-width="200px" rounded offset-y>
    <template #activator="{ on }">
      <v-btn icon x-large v-on="on">
        <v-avatar color="primary" size="48">
          <span class="white--text text-h6">{{ initials() }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <v-avatar color="primary" @click="goToHome()">
            <span class="white--text text-h6">{{ initials() }}</span>
          </v-avatar>
          <h3>{{ fullName() }}</h3>
          <v-divider class="my-3"></v-divider>
          <v-btn depressed rounded text @click="logout()"> Disconnect </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters({ domain: 'domain/domain' }),
  },
  methods: {
    initials() {
      return this.domain.name.substring(0, 2).toLocaleUpperCase()
    },
    fullName() {
      return this.domain.name
    },
    logout() {
      this.$auth.options.redirect.logout = this.$route.fullPath
      this.$auth.logout()
    },
    goToHome() {
      const params = { domain: this.domain.slug }
      this.$router.push({
        name: 'domains-domain',
        params,
      })
    },
  },
})
</script>

<style></style>
