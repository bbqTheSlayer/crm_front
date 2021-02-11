const reducer = (
    state = {
        TableDataSet: [],
        ProviderStorageOptionList: [],

        FilterVendorCode: '',
        FilterProductName: '',
        FilterProviderStorageID: 0,

        limit: 10,
        offset: 0,

        ColumnList: {
            id: 'ID',
            ProductName: 'Название',
            ProviderName: 'Город',
            StorageName: 'Склад',
            Rest: 'Остаток',
            VendorCode: 'Артикул',
            RRC: 'РРЦ',
            MIC: 'МИЦ'
        },

        editor: {
            id: 0
        }
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
            
    default:
        return state;
    }
};

export default reducer;