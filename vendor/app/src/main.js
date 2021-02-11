import { createStore, bindActionCreators } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import reducer from './reducer';
import * as actions from './actions';
import Table from './components/table';
import Editor from './components/editor';

const store = createStore(reducer);

const { dispatch } = store;

const { setStore,
        setEditor,
        setOffset
      } = bindActionCreators(actions, dispatch);

const loadNextPage = () => {
    const Offset = store.getState().offset;
    
    setOffset(Offset + 1);
    
    reloadTableDataSet();
}
    
const loadPrevPage = () => {
    const Offset = store.getState().offset;
    
    let Value = Offset - 1;
    
    if (Offset < 0) {
        Value = 0;
    }
    
    setOffset(Value);
    
    reloadTableDataSet();
}

const getBaseAdress = (Arg = '') => {
    return 'crm-api';
}

const setStoreField = (Field, Value) => {
    let State = store.getState();

    State[Field] = Value;

    invokeEvent('onChangeStoreField', {Field: Field});

    setStore(State);
}

const setEditorField = (Field ,Value) => {
    let Editor = store.getState().editor;

    if (typeof Value == 'undefined') {
        Value = '';
    }

    Editor[Field] = Value;

    setEditor(Editor);
}

const onChangeStoreField = (Field) => {
    switch (Field) {
        case 'FilterId':
            reloadTableDataSet();
            resetOffset();
            break;

        default:
            console.log(store.getState()[Field]);
            break;
    }
}

const invokeEvent = (Event, Params) => {
    switch (Event) {
        case 'onChangeStoreField':
            onChangeStoreField(Params.Field);
            break;
    }
}

const makeRequestUrl = (base, params) => {
    let ParamArray = [];

    for (let key in params) {
        ParamArray.push(key + '=' + params[key]);
    }

    return base + '?' + ParamArray.join('&');
}

const reloadTableDataSet = () => {
    const State = store.getState();

    const Params = {
        method: "crm.vendor.list",
        id: State.FilterId,
        limit: State.limit,
        offset: State.offset * State.limit
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            setStoreField('TableDataSet', Response.data.data);
        });
}

const updateRecord = () => {
    const Editor = store.getState().editor;

    const Params = {
        method: "crm.provider.update",
        name: Editor.Name,
        id: Editor.id
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            console.log(Response);

            const Result = Response.data.data.result.result;
            if (Result) {
                clearEditor();
                reloadTableDataSet();
            }
        });
}

const createRecord = () => {
    const Editor = store.getState().editor;

    const Params = {
        method: "crm.provider.create",
        code: Editor.Code,
        name: Editor.Name,
    };

    axios
    .post(makeRequestUrl(getBaseAdress(), Params))
    .then((Response) => {
        console.log(Response);

        const id = Response.data.data.result.id;
        if (id > 0) {
            clearEditor();
            reloadTableDataSet();
        }
    });
}

const EditButton = (e) => {
    const State = store.getState();

    let button = e.target.id;
    let vendorArray = State.TableDataSet;

    let vendorObject = vendorArray.find((elem) => {
        return elem.id == button;
    });

    console.log(vendorObject);

    setEditorField('id', vendorObject.id);
    setEditorField('Name', vendorObject.VendorName);
}

const resetOffset = () => {
    setStoreField('offset', 0);
}

const saveEditor = () => {
    const Editor = store.getState().editor;

    if(Editor.id > 0){
        updateRecord();
    }else {
        createRecord();
    }
}

const clearEditor = () => {
    setStoreField(
        'editor',
        {
            id: 0,
            Name: ''
        }
    );
}

const wndRefresh = () => {
    ReactDOM.render(
        <Table
          Store={store.getState()}
          loadNext={loadNextPage}
          loadPrev={loadPrevPage}
          setStoreField={(Field, Value) => {
            setStoreField(Field, Value);
          }}
          EditButton={EditButton}
          />, 
          document.getElementById('TableContainer')
    );

    ReactDOM.render(
        <Editor
          Store={store.getState()}
          setEditorField={(Field, Value) => {
            setEditorField(Field, Value);
          }}
          saveEditor={saveEditor}
          clearEditor={clearEditor}
          />,
          document.getElementById('EditorContainer')
    );
};

const init = () => {
    reloadTableDataSet();
    wndRefresh();
};

store.subscribe(() => {
    wndRefresh();
});

init();