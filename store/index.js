export const state = () => ({
  uiState: "permissionnotgranted"
});

export const getters = {
  getterValue: state => {
    return state.value;
  }
};

export const mutations = {
  updateUiState: (state, uistate) => {
    state.uiState = uistate;
  }
};

export const actions = {
  queryPermission({ state, commit }) {}
};
