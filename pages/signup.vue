<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-alert v-if="error" color="red" type="error">
        {{ error }}
      </v-alert>
      <v-col cols="12" sm="12" md="12">
        <v-card>
          <v-card-title> Create your domain </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="name" label="name" required></v-text-field>

              <v-text-field
                v-model="slug"
                label="slug"
                :rules="[rules.size]"
                required
              ></v-text-field>

              <password-field
                :prepend-icon="null"
                @inputChange="updatePassword"
              ></password-field>

              <v-textarea
                v-model="description"
                label="Describe your new dictionary documentation"
              ></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="white--text uppercase-text"
              color="primary"
              @click="submit()"
            >
              create
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import PasswordField from '@/components/Login/PasswordField.vue'

export default Vue.extend({
  name: 'SignUp',
  components: { PasswordField },
  data() {
    return {
      name: '',
      slug: '',
      password: '',
      description: '',
      rules: {
        size: (v: string) => v.length >= 3 || 'Min 3 characters',
      },
      error: '',
    }
  },
  methods: {
    updatePassword(password: string) {
      this.password = password
    },
    async submit() {
      await this.validate()
      if (!this.error) {
        await this.create()
      }
    },
    async validate(): Promise<void> {
      try {
        await this.$axios.get(`/domains/${this.slug}`)
        this.error = `The slug '${this.slug}' is not available`
      } catch {
        this.error = ''
      }
    },
    async create() {
      const res = await this.$axios.post(`/domains`, {
        slug: this.slug,
        name: this.name,
        password: this.password,
        description: this.description,
      })

      if (res.status === 201) {
        await this.$auth.loginWith('local', {
          data: {
            username: this.slug,
            password: this.password,
          },
        })
        this.$router.push({
          name: 'domains-domain',
          params: { domain: this.slug },
        })
      }
    },
  },
})
</script>

<style></style>
