<template>
  <v-menu
    v-model="isOpened"
    :close-on-content-click="close.onContentClick"
    :close-on-click="close.onClick"
    :offset-x="offset.x"
    :offset-y="offset.y"
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
      offset: {
        x: true,
        y: true,
      },
      isOpened: null,
      username: '',
      password: '',
      errorMsg: '',
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
      this.setRedirect()
      await this.$auth
        .loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
          },
        })
        .catch(() => (this.errorMsg = 'Wrong username or password'))
    },
    setRedirect() {
      this.$auth.options.redirect.home = `/domains/${this.username}`
      this.$auth.options.redirect.login = `/domains/${this.username}`
    },
  },
})
</script>

<style></style>
