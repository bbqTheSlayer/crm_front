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

const getBaseAdress = (Arg = '') => {
    return 'crm-api';
}

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

const setStoreField = (Field, Value) => {
    let State = store.getState();

    State[Field] = Value;

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
        method: "crm.productpropertytype.list",
        limit: State.limit,
        offset: State.offset * State.limit
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            console.log(Response);
            setStoreField('TableDataSet', Response.data.data.result);
        });

}

const updateRecord = () => {
    const Editor = store.getState().editor;

    const Params = {
        method: "crm.productpropertytype.change",
        name: Editor.Name,
        code: Editor.Code,
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
        method: "crm.productpropertytype.add",
        name: Editor.Name,
        code: Editor.Code
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

const EditModel = (e) => {

    const State = store.getState();

    let button = e.target.id;
    let ProductArray = State.TableDataSet;

    let ProductObject = ProductArray.find((elem) => {
        return elem.id == button;
    });

    setEditorField('id', ProductObject.id);
    setEditorField('Code', ProductObject.Code);
    setEditorField('Name', ProductObject.Name);
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
            Code: '',
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
          EditModel={EditModel} 
          />, 
          document.getElementById('TableContainer')
    );

    ReactDOM.render(
        <Editor
        Store={store.getState()}
        setEditorField={(Field, Value) => {
            setEditorField(Field, Value);
        }}
        clearEditor={clearEditor}
        saveEditor={saveEditor}
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