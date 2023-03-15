export default {
    namespaced: true,
    state: {
        p_image: ''
    },

    mutations: {
        updateImgUrl(state, value) {
            state.p_image = value
        }
    }
}