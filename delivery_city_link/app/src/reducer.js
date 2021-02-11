const reducer = (
    state = {
        TableDataSet: [],
        DeliveryOptionList: [],
        RegionOptionList: [],
        CityOptionList: [],


        FilterRegionID: 0,
        FilterIsActive: 2,
        FilterDeliveryID: 0,
        FilterCity: '',

        ColumnList: {
            id: 'ID',
            Delivery: 'Доставка',
            City: 'Город',
            IsActiveText: 'Активна'
        },

        limit: 10,
        offset: 0,

        RegionID: 0,

        editor: {
            id: 0,
            CityID: 0,
            DeliveryID: 0,
            IsActive: false
        }
    }, 
    action
) => {
    switch (action.type) {
        case 'SET_STATE':
            state = action.payload;
            return state;

        case 'SET_EDITOR':
            state.editor = action.payload;
            return state;

        default:
            return state;
    }
};

export default reducer;