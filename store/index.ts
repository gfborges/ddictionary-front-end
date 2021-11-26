export interface AuthState {
  auth: {
    loggedIn: boolean
    user: any
    strategy: unknown
  }
}

export const getters = {
  isAuthenticated(state: AuthState) {
    return state.auth.loggedIn && state.auth.user.slug !== 'domain'
  },

  loggedInUser(state: AuthState) {
    return state.auth.user
  },
}
