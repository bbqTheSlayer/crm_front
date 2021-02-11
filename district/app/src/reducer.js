const reducer = (
    state = {
        TableDataSet: [],

        limit: 10,
        offset: 0,

        SearchName: '',
        
        editor: {
            id: 0,
            District: ''
        },

        code: '',
        message: ''
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

        case 'SET_SEARCH_STRING':
            state.SearchName = action.payload;
            return state;
    default:
        return state;
    }
};

export default reducer;