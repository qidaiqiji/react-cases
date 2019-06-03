export default {
    namespace: 'manualUpload',
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
