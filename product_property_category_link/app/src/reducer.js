const reducer = (
    state = {
        TableDataSet: [],

        FilterCategoryList: [],

        NotifyList: [],

        FilterList: [
            {
                type: 'select',
                Label: 'Категория',
                DefaultValue: '0',
                DefaultCaption: 'Не выбрана',
                DataSet: 'FilterCategoryList',
                CurrentValueVar: 'FilterCategoryID',
                CaptionFieldName: 'ProductCategoryName'
            }
        ],


        EditorProductPropertyList: [],


        EditorFieldList: [
            {
                type: 'select',
                Label: 'Категория',
                DefaultValue: '0',
                DefaultCaption: 'Не указана',
                DataSet: 'FilterCategoryList',
                CurrentValueVar: 'EditorCategoryID',
                CaptionFieldName: 'ProductCategoryName'
            },
            {
                type: 'select',
                Label: 'Свойство',
                DefaultValue: '0',
                DefaultCaption: 'Не указано',
                DataSet: 'EditorProductPropertyList',
                CurrentValueVar: 'EditorPropertyID',
                CaptionFieldName: 'PropertyName'
            }
        ],


        ColumnList: {
            PropertyName: 'Свойство',
            CategoryName: 'Категория' 
        },

        limit: 10,
        offset: 0,

        FilterCategoryID: '0',

        EditorCategoryID: '0',
        EditorPropertyID: '0'

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