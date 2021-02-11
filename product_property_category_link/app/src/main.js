import { createStore, bindActionCreators } from 'redux';

import React from 'react';

import ReactDOM from 'react-dom';

import axios from 'axios';

import reducer from './reducer';

import * as actions from './actions';

import InputSet from './components/inputSet';

import DSNavigator from './components/DSNavigator';

import Table from './components/table';

import Editor from './components/editor';

import Notifier from './components/notifier';

const store = createStore(reducer);

const { dispatch } = store;

var InputDelay = undefined;

const Debounce = function(Delay, handler) {
    clearTimeout(InputDelay);

    InputDelay = setTimeout(
        handler,
        Delay
    );
};

const { setState
      } = bindActionCreators(actions, dispatch);

const getBaseAdress = (Arg = '') => {
    return 'crm-api.php';
};



const setStoreField = (Field, Value) => {
    let State = store.getState();

    State[Field] = Value;

    invokeEvent('onChangeStoreField', {Field: Field});

    setState(State);
};



const onChangeStoreField = (Field) => {
    switch (Field) {
        case 'FilterCategoryID':
            resetOffset();
            reloadTableDataSet();
            break;

        default:
            console.log(store.getState()[Field]);
            break;
    }
};



const invokeEvent = (Event, Params) => {
    switch (Event) {
        case 'onChangeStoreField':
            onChangeStoreField(Params.Field);
            break;
    }
};



const makeRequestUrl = (base, params) => {
    let ParamArray = [];

    for (let key in params) {
        ParamArray.push(key + '=' + params[key]);
    }

    return base + '?' + ParamArray.join('&');
};


const renderNotification = () => {
    ReactDOM.render(
        <Notifier
          NotifyList={store.getState().NotifyList}
          />,
        document.getElementById('NotificationContainer')
    );
};



const notify = (Headline, Message, type='success') => {
    setStoreField('NotifyList', []);

    setStoreField('NotifyList', [
        {
            Headline: Headline,
            Message: Message,
            type: type
        }
    ]);

    renderNotification();
}



const reloadTableDataSet = () => {
    const State = store.getState();

    const Params = {
        method: "crm.propertycategorylink.list",
        catid: State.FilterCategoryID,
        limit: State.limit,
        offset: State.offset * State.limit
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            setStoreField('TableDataSet', Response.data.data.payload);
        });

};



const reloadCategoryOptionList = () => {
    const State = store.getState();

    const Params = {
        method: "crm.productcategory.optionslist"
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            setStoreField('FilterCategoryList', Response.data.data.payload);
        });
};



const reloadPropertyOptionList = () => {
    const State = store.getState();

    const Params = {
        method: "crm.productproperty.optionlist"
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            setStoreField('EditorProductPropertyList', Response.data.data.payload);
        });
};



const resetOffset = () => {
    setStoreField('offset', 0);
};


const loadNext = () => {
    const Offset = store.getState().offset;

    setStoreField('offset', Offset + 1);

    reloadTableDataSet();
};



const loadPrev = () => {
    const Offset = store.getState().offset;

    let Value = Offset - 1;

    if (Offset < 0) {
        Value = 0;
    }

    setStoreField('offset', Value);

    reloadTableDataSet();
};



const wndRefresh = () => {

    ReactDOM.render(
        <InputSet
          State={store.getState()}
          FieldConfig={store.getState().FilterList}
          setStoreField={(Field, Value) => {
            setStoreField(Field, Value);
          }}
          />,
          document.getElementById('FilterContainer')
    );

    ReactDOM.render(
        <Table
          ColumnList={store.getState().ColumnList}
          TableDataSet={store.getState().TableDataSet}
          setStoreField={(Field, Value) => {
            setStoreField(Field, Value);
          }}
          removeRecord={removeRecord}
          />, 
          document.getElementById('TableContainer')
    );

    ReactDOM.render(
        <DSNavigator
          Offset={store.getState().offset}
          loadNext={loadNext}
          loadPrev={loadPrev}
          setStoreField={(Field, Value) => {
            setStoreField(Field, Value);
          }}
          />,
        document.getElementById('TableNavigator')
    );

    ReactDOM.render(
        <Editor
          Store={store.getState()}
          setStoreField={(Field, Value) => {
            setStoreField(Field, Value);
          }}
          clearEditor={clearEditor}
          saveEditor={saveEditor}
        />, 
        document.getElementById('EditorContainer')
    );

    ReactDOM.render(
        <InputSet
          State={store.getState()}
          FieldConfig={store.getState().EditorFieldList}
          setStoreField={(Field, Value) => {
            setStoreField(Field, Value);
          }}
          />,
          document.getElementById('EditorFieldSetContainer')
    );
};


const setEditorParamValues = (Row) => {
    setStoreField('EditorCategoryID', Row.CategoryID);
    setStoreField('EditorPropertyID', Row.PropertyID);
};


const clearEditor = () => {
    setEditorParamValues(
        {
            CategoryID: '0',
            PropertyID: '0'
        }
    );
};


const removeRecord = (RecID) => {
    const State = store.getState();

    const Params = {
        method: "crm.propertycategorylink.delete",
        id: RecID
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            // console.log(Response);
            if (Response.data.data.result) {
                reloadTableDataSet();
            }
        });
};


const createRecord = () => {
    const State = store.getState();

    const Params = {
        method: "crm.propertycategorylink.add",
        catid: State.EditorCategoryID,
        propid: State.EditorPropertyID
    };

    axios
    .post(makeRequestUrl(getBaseAdress(), Params))
    .then((Response) => {
        console.log(Response);

        const Result = Response.data.data.result;

        if (Result) {
            clearEditor();
            reloadTableDataSet();
            notify('Успешно', 'Сохранено', 'success');
        } else {
            notify('Ошибка', Response.data.data.FatalError, 'error');
        }
    });
};


const saveEditor = () => {
    createRecord();
};



const init = () => {
    reloadTableDataSet();

    reloadCategoryOptionList();
    
    reloadPropertyOptionList();

    wndRefresh();
};

store.subscribe(() => {
    wndRefresh();
});

init();