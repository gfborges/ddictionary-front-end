export const state = () => ({
  domain: { name: 'error', slug: 'error' },
})

export const namespace = true

export const getters = {
  domain(state) {
    return state.domain
  },
}

export const mutations = {
  setDomain(state, domain) {
    state.domain = domain
  },
}

export const actions = {
  async fetchDomain(context, domainSlug) {
    const domain = await this.$axios.$get(`/domains/${domainSlug}`)
    context.commit('setDomain', domain)
  },
}
