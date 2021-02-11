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
            
        case 'FilterCarBrand':
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
        method: "crm.carmodelfamily.list",
        name: State.FilterName,
        cboid: State.FilterCarBrand,
        oid: State.FilterOID,
        limit: State.limit,
        offset: State.offset * State.limit
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            console.log(Response);
            setStoreField('TableDataSet', Response.data.data);
        });

}

const reloadOptionList = () => {

    const Params = {
        method: "crm.carbrand.list",

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
        method: "crm.carmodelfamily.update",
        cboid: Editor.CarBrandOID,
        name: Editor.Name,
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
        method: "crm.carmodelfamily.create",
        oid: Editor.OID,
        cboid: Editor.CarBrandOID,
        name: Editor.Name,
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

const checkEditorEmpty = () => {
    let CarBrandOID = store.getState().editor.CarBrandOID;
    let Name = store.getState().editor.Name;
    
    const createInput = document.getElementById('editor-input');
    const createSelect = document.getElementById('editor-select');
    let checkEmpty = ()=> {
        if(Name == ''){
            return false;
        }
        if(CarBrandOID == 0) {
            return false;
        }
    }

    if(checkEmpty() == false){
        if(Name == ''){
            createInput.classList.add('is-invalid');
        }
        if(CarBrandOID == 0){
            createSelect.classList.add('is-invalid');
        }

    } else {
        saveEditor();
    }
}

const EditFamily = (e) => {

    const State = store.getState();

    let button = e.target.id;
    let FamilyArray = State.TableDataSet;

    let FamilyObject = FamilyArray.find((elem) => {
        return elem.id == button;
    });

    setEditorField('id', FamilyObject.id);
    setEditorField('OID', FamilyObject.OID);
    setEditorField('CarBrandOID', FamilyObject.CarBrandOID);
    setEditorField('CarBrandName', FamilyObject.CarBrandName);
    setEditorField('Name', FamilyObject.Name);
}

const removeClassEditor = () => {
    const createInput = document.getElementById('editor-input');
    const createSelect = document.getElementById('editor-select');
    const clearEditor = document.getElementById('clear-editor');
    
    createInput.addEventListener('keyup', (event) => {
        event.target.classList.remove('is-invalid');    
    });

    createSelect.addEventListener('focus', (event) => {
        event.target.classList.remove('is-invalid');    
    });

    clearEditor.addEventListener('focus', () => {
        createInput.classList.remove('is-invalid');
        createSelect.classList.remove('is-invalid');
    });
}

const saveEditor = () => {
    const Editor = store.getState().editor;

    if(Editor.id > 0){
        updateRecord();
    }else {
        createRecord();
    }

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

const resetOffset = () => {
    setStoreField('offset', 0);
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
          EditFamily={EditFamily} 
          />, 
          document.getElementById('TableContainer')
    );

    ReactDOM.render(
        <Editor
          Store={store.getState()}
          reloadList={reloadTableDataSet}
          setEditorField={(Field, Value) => {
              setEditorField(Field, Value);
            }}
          checkEditorEmpty={checkEditorEmpty}
          clearEditor={clearEditor}
          />, 
          document.getElementById('EditorContainer')
    );  
};

const clearEditor = () => {
    setStoreField(
        'editor',
        {
            id: 0,
            OID: 0,
            CarBrandOID: 0,
            CarBrandName: '',
            Name: ''
        }
    );
}

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