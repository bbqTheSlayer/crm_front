const reducer = (
    state = {
        TableDataSet: [],

        limit: 10,
        offset: 0,

        editor: {
            id: 0,
            Code: '',
            Name: ''
        },

    },
    action
) => {

    switch (action.type){
        case 'SET_STATE':
            state = action.payload;
            return state;

        case 'SET_EDITOR':
            state.editor = action.payload;
            return state;

        case 'SET_OFFSET':
            state.offset = action.payload;
            return state;
            
    default:
        return state;
    }
};

export default reducer;