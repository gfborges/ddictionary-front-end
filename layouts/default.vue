<template>
  <v-app fizxed>
    <v-app-bar fixed app dark>
      <nuxt-link
        id="domain-name"
        class="white--text text-h6 text-uppercase"
        :to="homePageLink()"
        :no-prefetch="noPrefetch"
      >
        {{ domain.name }}
      </nuxt-link>
      <nuxt-link :to="`/${domain.slug}/create-entry`" :no-prefetch="noPrefetch">
        <v-btn v-if="isAuthenticated" color="primary"> create </v-btn>
      </nuxt-link>
      <v-spacer />
      <avatar v-if="isAuthenticated" />
      <login v-else />
    </v-app-bar>
    <v-main>
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
import { mapGetters } from 'vuex'
import Avatar from '@/components/Login/Avatar.vue'
import Login from '@/components/Login/Login.vue'

export default Vue.extend({
  name: 'Default',
  components: { Avatar, Login },
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
      noPrefetch: true,
      link: '/pets',
    }
  },
  head() {
    return {
      title: this.$route.params.domain,
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
      loggedInUser: 'loggedInUser',
      domain: 'domain/domain',
    }),
  },
  methods: {
    homePageLink(): string {
      return `/${this.$route.params.domain}`
    },
  },
})
</script>

<style>
#domain-name {
  margin-right: 5px;
  text-decoration: none;
}

html {
  overflow-y: auto !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
