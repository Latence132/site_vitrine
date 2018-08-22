export const state = () => ({
  page: 1
})

export const actions = {
  setPage ({commit}, index) {
    commit('SET_PAGE', index)
  }
}

export const mutations = {
  SET_PAGE (state, index) {
    state.page = index
  }
}
