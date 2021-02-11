const reducer = (
    state = {
        TableDataSet: [],

        limit: 10,
        offset: 0,

        editor: {
            id: 0,
            OID: 0,
            CarModelFamilyOID: '',
            CarModelFamilyName: '',
            Name: ''
        },

        FilterName: '',
        FilterFamily: 0,
        FilterOID: '',

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
            state.FilterName = action.payload;
            return state;

        case 'SET_SEARCH_STRING':
            state.FilterOID = action.payload;
            return state;
            
    default:
        return state;
    }
};

export default reducer;