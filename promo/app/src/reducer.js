const reducer = (
    state = {
        MainDataSet: [],

        ColumnList: {
            id: 'ID',
            Code: 'Код',
            Name: 'Название',
            Description: 'Описание',
            IsActiveText: 'Активна'
        },

        FilterList: [
            {
                type: 'select',
                Label: 'Показать',
                DefaultValue: '2',
                DefaultCaption: 'Все',
                CurrentValueVar: 'FilterIsDeleted',
                DataSet: 'DeletedOptionList',
                CaptionFieldName: 'Caption'
            },
            {
                type: 'input',
                Label: 'Код',
                CurrentValueVar: 'FilterCode'
            }
        ],

        DeletedOptionList: [
            {
                id: '0',
                Caption: 'Не удаленные'
            },
            {
                id: '1',
                Caption: 'Удаленные'
            }

        ],



        FilterCode: '',
        FilterIsDeleted: '2',



        EditorList: [
            {
                type: 'input',
                Label: 'Код',
                CurrentValueVar: 'EditorCode'
            },
            {
                type: 'input',
                Label: 'Название',
                CurrentValueVar: 'EditorName'
            },
            {
                type: 'input',
                Label: 'Изображение',
                CurrentValueVar: 'EditorImage'
            },
            {
                type: 'textarea',
                Label: 'Описание',
                CurrentValueVar: 'EditorDescription'
            },
            {
                type: 'checkbox',
                Label: 'Активно',
                CurrentValueVar: 'EditorIsActive'
            }
        ],



        EditorPromoID: '0',
        EditorCode: '',
        EditorName: '',
        EditorImage: '',
        EditorDescription: '',
        EditorIsActive: false,

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