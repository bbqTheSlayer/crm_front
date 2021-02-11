const reducer = (
    state = {
        TableDataSet: [],

        limit: 10,
        offset: 0,

        editor: {
            id: 0,
            VendorCode: '',
            Vendor: '',
            OID: '',
        },

        FilterVendor: '',
        FilterVendorCode: ''

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
            state.FilterVendor = action.payload;
            return state;

        case 'SET_SEARCH_STRING':
            state.FilterVendorCode = action.payload;
            return state;
            
    default:
        return state;
    }
};

export default reducer;