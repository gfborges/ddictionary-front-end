export interface AuthState {
  auth: {
    loggedIn: boolean
    user: unknown
    strategy: unknown
  }
}

export const getters = {
  isAuthenticated(state: AuthState) {
    return state.auth.loggedIn
  },

  loggedInUser(state: AuthState) {
    return state.auth.user
  },
}
