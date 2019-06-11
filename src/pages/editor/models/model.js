export default {
    namespace: 'editor',
    state: {
        
    },
    effects: {
        
    },
    reducers: {
        updatePageReducer(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
        unmountReducer() {
            return {
               
            };
        },
    },
};
