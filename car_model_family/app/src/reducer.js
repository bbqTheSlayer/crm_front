const reducer = (
    state = {
        TableDataSet: [],
        OptionList: [],

        limit: 10,
        offset: 0,

        FilterName: '',
        FilterOID: '',
        FilterCarBrand: 0,

        editor: {
            id: 0,
            OID: 0,
            CarBrandOID: 0,
            CarBrandName: '',
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