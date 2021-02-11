const reducer = (
    state = {
        VendorList: [],
        OptionList: [],

        limit: 10,
        offset: 0,

        SearchAlias: '',
        SearchVendorID: '',

        editor: { 
            id: 0,
            VendorName: '',
            VendorID: 0,
            VendorAlias: ''
        },

        code: 200,
        message: 'Успешно'

    },
    action
) => {

    switch (action.type){
        case 'SET_STORE':
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