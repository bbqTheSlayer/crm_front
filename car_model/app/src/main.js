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

let SearchInputTimestamp = new Date(0);

var InputDelay = undefined;

const Debounce = function(Delay, handler) {
    clearTimeout(InputDelay);

    InputDelay = setTimeout(
        handler,
        Delay
    );
}

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
        case 'FilterName':
            Debounce(800, () => {
                resetOffset();
                reloadTableDataSet();
            });
            break;

        case 'FilterOID':
            Debounce(800, () => {
                resetOffset();
                reloadTableDataSet();
            });
            break;
            
        case 'FilterFamily':
            resetOffset();
            reloadTableDataSet();
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
        method: "crm.carmodel.list",
        cmfoid: State.FilterFamily,
        oid: State.FilterOID,
        name: State.FilterName,
        limit: State.limit,
        offset: State.offset * State.limit
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            setStoreField('TableDataSet', Response.data.data);
        });

}

const reloadOptionList = () => {

    const Params = {
        method: "crm.carmodelfamily.list",
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            console.log(Response);
            setStoreField('OptionList', Response.data.data);
        });

}

const updateRecord = () => {
    const Editor = store.getState().editor;

    const Params = {
        method: "crm.carmodel.update",
        name: Editor.Name,
        oid: Editor.OID,
        cmfoid: Editor.CarModelFamilyOID,
        id: Editor.id
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            console.log(Response);
            let code = Response.data.code;
            let message = Response.data.message;
            setStoreField('code', code);
            setStoreField('message', message);

            const Result = Response.data.data.result.result;
            if (Result) {
                clearEditor();
                reloadTableDataSet();
            }
            showNotification();
        });
}

const createRecord = () => {
    const Editor = store.getState().editor;

    const Params = {
        method: "crm.carmodel.create",
        name: Editor.Name,
        oid: Editor.OID,
        cmfoid: Editor.CarModelFamilyOID,
    };

    axios
    .post(makeRequestUrl(getBaseAdress(), Params))
    .then((Response) => {
        let code = Response.data.code;
        let message = Response.data.message;
        setStoreField('code', code);
        setStoreField('message', message);

        const id = Response.data.data.result.id;
        if (id > 0) {
            clearEditor();
            reloadTableDataSet();
        }
        showNotification();
    });
}

const showNotification = () => {

    const fadein = 'notification-fadein';
    const fadeout = 'notification-fadeout';
    const hide = 'notification-hidden';
    const block = document.getElementById('notification');

        block.classList.add(fadein);
        block.classList.remove(hide);

        setTimeout(function() {
            block.classList.remove(fadein);
            block.classList.add(fadeout);
        }, 5000);
        setTimeout(function() {
            block.classList.remove(fadeout);
            block.classList.add(hide)
        }, 5300);
}

const EditModel = (e) => {

    const State = store.getState();

    let button = e.target.id;
    let ModelArray = State.TableDataSet;

    let ModelObject = ModelArray.find((elem) => {
        return elem.id == button;
    });

    setEditorField('id', ModelObject.id);
    setEditorField('OID', ModelObject.OID);
    setEditorField('CarModelFamilyOID', ModelObject.CarModelFamilyOID);
    setEditorField('CarModelFamilyName', ModelObject.CarModelFamilyName);
    setEditorField('Name', ModelObject.Name);
}

const saveEditor = () => {
    const Editor = store.getState().editor;

    if(Editor.id > 0){
        updateRecord();
    }else {
        createRecord();
    }
}

const checkEditorEmpty = () => {
    let Name = store.getState().editor.Name;
    let Family = store.getState().editor.CarModelFamilyOID;
    
    const EditorName = document.getElementById('editor-name');
    const EditorFamily = document.getElementById('editor-family');
    let checkEmpty = ()=> {
        if(Name == ''){
            return false;
        }
        if(Family == 0){
            return false;
        }
    }

    if(checkEmpty() == false){
        if(Name == ''){
            EditorName.classList.add('is-invalid');
        }
        if(Family == 0){
            EditorFamily.classList.add('is-invalid');
        }

    } else {
        saveEditor();
    }
}

const removeClassEditor = () => {
    const EditorName = document.getElementById('editor-name');
    const EditorFamily = document.getElementById('editor-family');
    const ClearEditor = document.getElementById('clear-editor');
    
    EditorName.addEventListener('keyup', (event) => {
        event.target.classList.remove('is-invalid');    
    });

    EditorFamily.addEventListener('change', (event) => {
        event.target.classList.remove('is-invalid');    
    });

    ClearEditor.addEventListener('focus', () => {
        EditorName.classList.remove('is-invalid');
        EditorFamily.classList.remove('is-invalid');
    });
}

const resetOffset = () => {
    setStoreField('offset', 0);
}

const clearEditor = () => {
    setStoreField(
        'editor',
        {
            id: 0,
            OID: 0,
            CarModelFamilyOID: 0,
            CarModelFamilyName: '',
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
        checkEditorEmpty={checkEditorEmpty}
        clearEditor={clearEditor}
        />, 
        document.getElementById('EditorContainer')
    );
};

const init = () => {
    reloadTableDataSet();
    reloadOptionList();
    wndRefresh();
    removeClassEditor();
};

store.subscribe(() => {
    wndRefresh();
});

init();