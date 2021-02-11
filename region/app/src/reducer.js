const reducer = (
    state = {
        TableDataSet: [],
        OptionList: [],

        limit: 10,
        offset: 0,

        FilterRegion: '',
        FilterDistrict: 0,
        
        editor: {
            id: 0,
            Region: '',
            DistrictID: 0
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
            state.FilterRegion = action.payload;
            return state;

    default:
        return state;
    }
};

export default reducer;