const reducer = (
    state = {
        MainDataSet: [],

        ColumnList: {
            id: 'ID',
            Code: 'Код',
            Name: 'Название',
            Description: 'Описание',
            IsActiveText: 'Актив'
        },



        FilterList: [
            {
                type: 'select',
                Label: 'По удалению',
                DefaultValue: '2',
                DefaultCaption: 'Все',
                CurrentValueVar: 'FilterIsDeleted',
                DataSet: 'DeletedOptionList',
                CaptionFieldName: 'Caption'
            },
            {
                type: 'select',
                Label: 'По активности',
                DefaultValue: '2',
                DefaultCaption: 'Все',
                CurrentValueVar: 'FilterIsActive',
                DataSet: 'ActiveOptionList',
                CaptionFieldName: 'Caption'
            },
            {
                type: 'input',
                Label: 'Код',
                CurrentValueVar: 'FilterCode',
            }
        ],


        FilterIsDeleted: '0',
        FilterIsActive: '2',
        FilterCode: '',

        DeletedOptionList: [
            {
                id: '1',
                Caption: 'Удаленные'
            },
            {
                id: '0',
                Caption: 'Не удаленные'
            }
        ],

        ActiveOptionList: [
            {
                id: '1',
                Caption: 'Активные'
            },
            {
                id: '0',
                Caption: 'Не активные'
            }
        ],


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
                Label: 'Картинка',
                CurrentValueVar: 'EditorImage'
            },
            {
                type: 'textarea',
                Label: 'Описание',
                CurrentValueVar: 'EditorDescription'
            },
            {
                type: 'input',
                Label: 'Класс цвета фона предложения',
                CurrentValueVar: 'EditorItemBackgroundColorClass'
            },
            {
                type: 'input',
                Label: 'Класс цвета текста предложения',
                CurrentValueVar: 'EditorItemTextColorClass'
            },
            {
                type: 'input',
                Label: 'Класс цвета фона',
                CurrentValueVar: 'EditorBackgroundColorClass'
            },
            {
                type: 'input',
                Label: 'Класс текста',
                CurrentValueVar: 'EditorTextColorClass'
            },
            {
                type: 'checkbox',
                Label: 'Активно',
                CurrentValueVar: 'EditorIsActive'
            },
            {
                type: 'checkbox',
                Label: 'Удалена',
                CurrentValueVar: 'EditorIsDeleted'
            }
        ],

        EditorID: '0',
        EditorCode: '',
        EditorName: '',
        EditorImage: '',
        EditorDescription: '',
        EditorItemBackgroundColorClass: '',
        EditorItemTextColorClass: '',
        EditorBackgroundColorClass: '',
        EditorTextColorClass: '',
        EditorIsActive: false,
        EditorIsDeleted: false,

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