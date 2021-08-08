<template>
  <v-text-field
    :type="fieldType"
    label="password"
    prepend-icon="mdi-lock"
    :append-icon="show"
    @click:append="togglePassword"
    @keyup.enter="$emit('login')"
    @input="(e) => $emit('inputChange', e)"
  >
  </v-text-field>
</template>
<script lang="ts">
import Vue from 'vue'

enum PasswordVisibilities {
  off = 'mdi-eye-off',
  on = 'mdi-eye',
}

export default Vue.extend({
  props: {
    password: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: PasswordVisibilities.on,
      fieldType: 'password',
    }
  },
  watch: {
    isOpened() {},
  },
  methods: {
    togglePassword() {
      if (this.show === PasswordVisibilities.on) {
        this.show = PasswordVisibilities.off
        this.fieldType = 'text'
      } else {
        this.show = PasswordVisibilities.on
        this.fieldType = 'password'
      }
    },
    turnOffPasswordVisibility() {},
    emitLogin() {
      this.$emit('login')
    },
  },
})
</script>

<style></style>
