const reducer = (
    state = {
        TableDataSet: [],
        BrandDataSet: [],
        FamilyDataSet: [],
        ModelDataSet: [],

        limit: 10,
        offset: 0,

        editor: {
            id: 0,
            CarBrandID: '',
            CarModelFamilyID: '',
            CarModelID: '',
        },

        FilterBrand: 0,
        FilterModelFamily: 0,
        FilterModel: 0,

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