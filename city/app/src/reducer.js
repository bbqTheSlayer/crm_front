

const reducer = (
    state = {
        CityList: [],
        RegionList:[],

        ColumnList: {
            id: 'ID',
            City: 'Город',
            Region: 'Область',
            CapitalDistance: 'Расстояние',
            IsActiveCaption: 'Активен',
            IsPopularCaption: 'Важный'
        },

        limit: 10,
        offset: 0,

        SearchString: '',
        FilterRegionID: 0,

        editor: {
            id: 0,
            City: '',
            RegionID: 0,
            IsActive: false,
            IsPopular: false,
            CapitalDistance: 0
        }
    }, 
    action
) => {
    switch (action.type) {
        case 'SET_STATE':
            state = action.payload;
            return state;

        case 'SET_CITY_LIST':
            state.CityList = action.payload;
            return state;

        case 'SET_REGION_LIST':
            state.RegionList = action.payload;
            return state;

        case 'SET_OFFSET':
            state.offset = action.payload;
            return state;

        case 'SET_EDITOR':
            state.editor = action.payload;
            return state;

        case 'SET_SEARCH_STRING':
            state.SearchString = action.payload;
            return state;

        default:
            return state;
    }
};

export default reducer;