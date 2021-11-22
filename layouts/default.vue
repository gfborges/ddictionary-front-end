<template>
  <v-app fizxed>
    <v-app-bar fixed app dark>
      <!-- home page link -->
      <nuxt-link
        v-if="showDomainHomePage()"
        class="white--text text-h6 text-uppercase domain-name link"
        :to="homePageLink()"
        :no-prefetch="noPrefetch"
      >
        {{ domain.name }}
      </nuxt-link>
      <span v-else class="white--text text-h6 text-uppercase domain-name">
        domain dictionary
      </span>

      <nuxt-link :to="createEntryLink()" :no-prefetch="noPrefetch">
        <v-btn v-if="isAuthenticated" color="primary"> create </v-btn>
      </nuxt-link>
      <v-spacer />

      <avatar v-if="isAuthenticated" />
      <div v-else>
        <login />
        <v-btn color="primary">
          <nuxt-link
            class="link text-uppercase white--text"
            :to="{ name: 'signup' }"
          >
            SING UP
          </nuxt-link>
        </v-btn>
      </div>
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
      noPrefetch: true,
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
    homePageLink(): { name: string; params: {} } {
      const domain = this.$route.params.domain
      return { name: 'domains-domain', params: { domain } }
    },
    createEntryLink(): { name: string; params: {} } {
      const domain = this.$route.params.domain
      return { name: 'domains-domain-create-entry', params: { domain } }
    },
    showDomainHomePage(): boolean {
      return this.$route.path.startsWith('/domains')
    },
  },
})
</script>

<style>
.link {
  text-decoration: none;
}
.domain-name {
  margin-right: 5px;
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
