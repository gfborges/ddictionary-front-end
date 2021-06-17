<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="8">
      <v-card class="" width="100%">
        <v-card-title class="headline">
          {{ $route.params.domain }}
        </v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {},
}
</script>
