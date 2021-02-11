const reducer = (
    state = {
        TableDataSet: [],
        ProviderFilterList: [],
        StorageFilterList: [],
        OptionList: [],

        ProviderList: [],
        EditorStorageList: [],

        NotifyList: [],

        FilterList: [
            {
                type: 'input',
                Label: 'Артикул',
                CurrentValueVar: 'FilterVendorCode',
            },
            {
                type: 'select',
                Label: 'Поставщик',
                DefaultValue: '0',
                DefaultCaption: 'Не выбран',
                DataSet: 'ProviderFilterList',
                CurrentValueVar: 'FilterProviderID',
                CaptionFieldName: 'Provider'
            },
            {
                type: 'select',
                Label: 'Склад',
                DefaultValue: '0',
                DefaultCaption: 'Не выбран',
                DataSet: 'StorageFilterList',
                CurrentValueVar: 'FilterStorageID',
                CaptionFieldName: 'Storage'
            },
            {
                type: 'select',
                Label: 'Наличие',
                DefaultValue: '2',
                DefaultCaption: 'Все',
                DataSet: 'StockOptionList',
                CurrentValueVar: 'FilterStock',
                CaptionFieldName: 'Name'
            },{
                type: 'select',
                Label: 'Производитель',
                DefaultValue: '0',
                DefaultCaption: 'Не выбран',
                DataSet: 'VendorOptionList',
                CurrentValueVar: 'FilterVendorID',
                CaptionFieldName: 'VendorName'
            },{
                type: 'select',
                Label: 'Сезонность',
                DefaultValue: '0',
                DefaultCaption: 'Любая',
                DataSet: 'SeasonOptionList',
                CurrentValueVar: 'FilterSeasonID',
                CaptionFieldName: 'Name'
            },{
                type: 'input',
                Label: 'Ширина',
                CurrentValueVar: 'FilterWidth',
            },{
                type: 'input',
                Label: 'Высота',
                CurrentValueVar: 'FilterHeight',
            },{
                type: 'input',
                Label: 'Диаметр',
                CurrentValueVar: 'FilterDiametr',
            }
        ],



        EditorList: [
            {
                type: 'select',
                Label: 'Склад',
                DefaultValue: '0',
                disabled: true,
                DefaultCaption: 'Не выбран',
                DataSet: 'EditorStorageList',
                CaptionFieldName: 'Storage',
                CurrentValueVar: 'EditorStorageID'
            },{
                type: 'input',
                Label: 'Количество',
                CurrentValueVar: 'EditorCount'
            }
        ],



        ColumnList: {
            // id: 'ID',
            VendorCode: 'Артикул',
            VendorName: 'Vendor',
            ProviderName: 'Provider',
            SeasonName: 'Сезон',
            StorageName: 'Склад',
            // ProviderProductCode: 'Код поставщика',
            ProviderProductName: 'Название',
            Rest: 'Остаток'
        },



        limit: 10,
        offset: 0,


        EditorStockID: '0',
        EditorProductID: '0',
        EditorCount: '0',
        EditorStorageID: '0',


        StockOptionList: [
            {
                id: '1',
                Name: 'В наличии'
            },{
                id: '0',
                Name: 'Нет в наличии'
            }
        ],


        SeasonOptionList: [
            {
                id: 1,
                Name: 'Лето'
            },{
                id: 2,
                Name: 'Зима'
            }
        ],

        VendorOptionList: [],
        FilterVendorID: '0',

        FilterProviderID: '0',

        FilterStorageID: '0',
        FilterVendorCode: '',
        FilterSeasonID: '0',
        FilterStock: '2',
        FilterWidth: '',
        FilterHeight: '',
        FilterDiametr: ''
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