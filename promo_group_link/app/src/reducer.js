const reducer = (
    state = {
        MainDataSet: [],

        ColumnList: {
            // id: 'ID',
            GroupName: 'Акция',
            PromoName: 'Предложение'
        },



        FilterList: [
            {
                type: 'select',
                Label: 'Акция',
                DefaultValue: '0',
                DefaultCaption: 'Все',
                DataSet: 'PromoGroupOptionList',
                CurrentValueVar: 'FilterPromoGroupID',
                CaptionFieldName: 'PromoGroupName'
            }
            // {
            //     type: 'input',
            //     Label: 'Some Field',
            //     CurrentValueVar: 'FilterField',
            // }
        ],

        // FilterField: '0',
        FilterPromoGroupID: '0',


        EditorList: [
            {
                type: 'select',
                Label: 'Акция',
                DefaultValue: '0',
                DefaultCaption: 'Не выбрана',
                DataSet: 'PromoGroupOptionList',
                CurrentValueVar: 'EditorPromoGroupID',
                CaptionFieldName: 'PromoGroupName'
            },
            {
                type: 'select',
                Label: 'Предложение',
                DefaultValue: '0',
                DefaultCaption: 'Не выбрано',
                DataSet: 'PromoOptionList',
                CurrentValueVar: 'EditorPromoID',
                CaptionFieldName: 'PromoName'
            }
        ],

        EditorID: '0',
        EditorPromoID: '0',
        EditorPromoGroupID: '0',

        limit: 10,
        offset: 0,

        PromoOptionList: [],
        PromoGroupOptionList: [],

        NotifyList: []

    },
    action
) => {

    switch (action.type){
        case 'SET_STATE':
            state = action.payload;
            return state;

        default:
            return state;
    }
};

export default reducer;