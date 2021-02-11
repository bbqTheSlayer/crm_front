const reducer = (
    state = {
        
        CurtainList: [
            {IdName: 'TableContainer'},
            {IdName: 'EditorContainer'}
        ],

        ActiveCurtain: 'TableContainer',

        ColumnList: {
            id: 'ID',
            Alias: 'Карточка',
            VendorCode: 'Артикул',
            Vendor: 'Про-ль',
            Model: 'Модель',
            Season: 'Сезонность',
            Spec: 'Хар-ки',
            Options: 'Опции',
            ProductCatalogID: 'Cat_ID',
            DupletData: 'Клоны'
        },

        DoupletOptionList: [
            {
                id: '2',
                Caption: 'Любые'
            },
            {
                id: '1',
                Caption: 'Повторяющиеся'
            },
            {
                id: '0',
                Caption: 'Одиночные'
            },
        ],

        FilterDouplet: '2',


        EmptyPageOptionList: [
            {
                id: '2',
                Caption: 'Любые'
            },
            {
                id: '1',
                Caption: 'Без страниц'
            },
            {
                id: '0',
                Caption: 'Со страницами'
            },
        ],

        FilterEmptyPage: '2',


        CatalogProductOptionList: [
            {
                id: '2',
                Caption: 'Любые'
            },
            {
                id: '1',
                Caption: 'В каталоге'
            },
            {
                id: '0',
                Caption: 'Не в каталоге'
            },
        ],

        FilterIsCatalogProduct: '2',

        VendorOptionList: [],

        FilterVendorID: '0',

        FilterVendorCode: '',

        TableDataSet: [],

        limit: 10,
        offset: 0,

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