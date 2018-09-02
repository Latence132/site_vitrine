export const state = () => ({
  page: 1,
  toolbar: true
})

export const actions = {
  setPage ({commit}, index) {
    commit('SET_PAGE', index)
  },
  setToolbar ({commit}, boolean) {
    commit('SET_TOOLBAR', boolean)
  },
}

export const mutations = {
  SET_PAGE (state, index) {
    state.page = index
  },
  SET_TOOLBAR (state, boolean) {
    state.toolbar = boolean
  }
}
