import { Context } from '@nuxt/types'

export default async function ({ route, store, error }: Context) {
  if (route.path.startsWith('/domains')) {
    const domainSlug = route.params.domain
    if (store.state.domain.domain.slug !== domainSlug) {
      try {
        await store.dispatch('domain/fetchDomain', domainSlug)
      } catch (e) {
        error({ statusCode: 404 })
      }
    }
  }
}
