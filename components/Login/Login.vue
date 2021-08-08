<template>
  <v-menu
    v-model="isOpened"
    :close-on-content-click="close.onContentClick"
    :close-on-click="close.onClick"
    offset-x="50"
    offset-y="5"
  >
    <template #activator="{ on, attrs }">
      <v-btn outlined v-bind="attrs" v-on="on"> LOGIN </v-btn>
    </template>
    <v-card class="pa-3">
      <v-text-field
        v-model="username"
        prepend-icon="mdi-account-circle"
        label="username"
      ></v-text-field>
      <password-field @login="login()" @inputChange="updatePassword" />
      <v-btn color="primary" @click="login()">LOGIN</v-btn>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import PasswordField from '@/components/Login/PasswordField.vue'

export default Vue.extend({
  components: { PasswordField },
  data() {
    return {
      isOpened: null,
      username: '',
      password: '',
      close: {
        onClick: true,
        onContentClick: false,
      },
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    updatePassword(password: string) {
      this.password = password
    },
    async login() {
      await this.$auth.loginWith('local', {
        data: {
          username: this.username,
          password: this.password,
        },
        redirect: `/${this.$route.params.domain}/search`,
      })
    },
  },
})
</script>

<style></style>
