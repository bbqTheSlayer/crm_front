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

const GlobalConfig = {
    TableMethod: 'crm.carbrand.list',
    CreateMethod: '',
    UpdateMethod: '',
    RemoveMethod: ''
};

const Debounce = function(Delay, handler) {
    clearTimeout(InputDelay);

    InputDelay = setTimeout(
        handler,
        Delay
    );
};


const { setStore
      } = bindActionCreators(actions, dispatch);



const getBaseAdress = (Arg = '') => {
    // return 'api/crm-api.php';
    return 'crm-api';
};



const loadNextPage = () => {
    const Offset = store.getState().offset;

    setOffset(Offset + 1);

    reloadTableDataSet();
};



const loadPrevPage = () => {
    const Offset = store.getState().offset;

    let Value = Offset - 1;

    if (Offset < 0) {
        Value = 0;
    }

    setOffset(Value);

    reloadTableDataSet();
};



const setStoreField = (Field, Value) => {
    let State = store.getState();

    State[Field] = Value;

    invokeEvent('onChangeStoreField', {Field: Field});

    setStore(State);
};


const onChangeStoreField = (Field) => {
    switch (Field) {
        case 'FilterOID':
            Debounce(800, () => {
                console.log(store.getState().FilterVendorCode);
                resetOffset();
                reloadTableDataSet();
            });
            break;

        case 'FilterName':
            Debounce(800, () => {
                console.log(store.getState().FilterVendorCode);
                resetOffset();
                reloadTableDataSet();
            });
            break;
        

        default:
            console.log();
            console.log(Field + ': ' + store.getState()[Field]);
            break;
    }
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



const reloadTableDataSet = () => {
    const State = store.getState();

    const Params = {
        method: GlobalConfig.TableMethod,
        oid: State.FilterOID, 
        name: State.FilterName,
        limit: State.limit,
        offset: State.offset * State.limit
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            setStoreField('MainDataSet', Response.data.data.payload);
        });

};



const reloadOptionList = (Options, Target) => {
    axios
        .post(makeRequestUrl(getBaseAdress(), Options))
        .then((Response) => {
            setStoreField(Target, Response.data.data.result);
        });
};



const setEditorParamValues = (Row) => {
    setStoreField('EditorField', Row.Field);
};



const setEditorData = (TargetID) => {
    const DataSet = store.getState().MainDataSet;

    let RestObject = DataSet.find((Row) => {
        return Row.id == TargetID;
    });

    setEditorParamValues(RestObject);
};



const updateRecord = (Options) => {
    axios
        .post(makeRequestUrl(getBaseAdress(), Options))
        .then((Response) => {
            console.log(Response);
 
            const Result = Response.data.data.result;

            if (Result) {
                clearEditor();
                reloadTableDataSet();
                notify('Успешно', Response.data.data.message, 'success');
            } else {
                notify('Ошибка', Response.data.data.message, 'error');
            }
        });
};



const deleteRecord = (Options) => {
    axios
        .post(makeRequestUrl(getBaseAdress(), Options))
        .then((Response) => {
            console.log(Response);
 
            const Result = Response.data.data.result;

            if (Result) {
                clearEditor();
                reloadTableDataSet();
                notify('Успешно', Response.data.data.message, 'success');
            } else {
                notify('Ошибка', Response.data.data.message, 'error');
            }
        });
};



const createRecord = (Options) => {
    axios
        .post(makeRequestUrl(getBaseAdress(), Options))
        .then((Response) => {
            console.log(Response);

            const Result = Response.data.data.result;

            if (Result) {
                clearEditor();
                reloadTableDataSet();
                notify('Успешно', Response.data.data.message, 'success');
            } else {
                notify('Ошибка', Response.data.data.message, 'error');
            }
        });
};



const saveEditor = () => {
    const State = store.getState();

    let Options = {
        method: "",
        id: State.EditorID
    };

    if (parseInt(State.EditorID) > 0) {
        Options.method = GlobalConfig.UpdateMethod;
        updateRecord(Options);
    } else {
        Options.method = GlobalConfig.CreateMethod;
        createRecord(Options);
    }
};



const clearEditor = () => {
    setEditorParamValues(
        {
            Field: '0'
        }
    );

    // notify('Успешно', 'Редактор очищен', 'success');
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



const renderEditorFieldSetContainer = () => {
    ReactDOM.render(
        <InputSet
          State={store.getState()}
          FieldConfig={store.getState().EditorList}
          setStoreField={(Field, Value) => {
            setStoreField(Field, Value);
          }}
          />,
          document.getElementById('EditorFieldSetContainer')
    );
};



const renderNotification = () => {
    ReactDOM.render(
        <Notifier
          NotifyList={store.getState().NotifyList}
          />,
        document.getElementById('NotificationContainer')
    );
};


const onEditButtonClick = (RowID) => {
    setEditorData(RowID);
};


const onRemoveButtonClick = (RowID) => {
    deleteRecord(
        {
            method: GlobalConfig.RemoveMethod,
            id: RowID
        }
    );
};


const renderMainTable = () => {
    ReactDOM.render(
        <Table
          TableDataSet={store.getState().MainDataSet}
          ColumnList={store.getState().ColumnList}
          onEditButtonClick={onEditButtonClick}
          onRemoveButtonClick={onRemoveButtonClick}
          />,
          document.getElementById('TableContainer')
    );
};



const renderMainDSNavigator = () => {
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
};



const renderFilterSet = () => {
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
};



const renderEditor = () => {
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
};



const wndRefresh = () => {
    renderFilterSet();

    renderMainTable();

    renderMainDSNavigator();

    // renderEditor();

    // renderEditorFieldSetContainer();
};



const init = () => {
    clearEditor();

    reloadTableDataSet();

    // reloadOptionList(
    //     {
    //         method: 'crm.method.action'
    //     },
    //     'OptionList'
    // );

    wndRefresh();
};



store.subscribe(() => {
    wndRefresh();
});



init();
