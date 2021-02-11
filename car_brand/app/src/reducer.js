const reducer = (
    state = {
        MainDataSet: [],

        ColumnList: {
            id: 'ID',
            Name: 'Название',
            OID: 'OID',
            CreateDate: 'Дата добавления'
        },



        FilterList: [
            // {
            //     type: 'select',
            //     Label: 'Some select',
            //     DefaultValue: '0',
            //     DefaultCaption: 'Не выбран',
            //     DataSet: 'OptionList',
            //     CurrentValueVar: 'FilterField',
            //     CaptionFieldName: 'FieldName'
            // },
            {
                type: 'input',
                Label: 'OID',
                CurrentValueVar: 'FilterOID',
            },
            {
                type: 'input',
                Label: 'Название',
                CurrentValueVar: 'FilterName',
            }
        ],

        FilterOID: '',
        FilterName: '',



        EditorList: [
            {
                type: 'input',
                Label: 'Some editor field',
                CurrentValueVar: 'EditorVariable'
            }
        ],

        EditorVariable: '',


        limit: 10,
        offset: 0,

        OptionList: [],

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