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
        case 'FilterVendor':
            Debounce(800, () => {
                resetOffset();
                reloadTableDataSet();
            });
            break;

        case 'FilterVendorCode':
            Debounce(800, () => {
                resetOffset();
                reloadTableDataSet();
            });
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
        method: "crm.carproductcatalog.list",
        vendorcode: State.FilterVendorCode,
        vendor: State.FilterVendor,
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
        method: "crm.carproductcatalog.update",
        oid: Editor.OID,
        vendorcode: Editor.VendorCode,
        vendor: Editor.Vendor,
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
        method: "crm.carproductcatalog.create",
        oid: Editor.OID,
        vendorcode: Editor.VendorCode,
        vendor: Editor.Vendor,
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

const EditProduct = (e) => {

    const state = store.getState();

    let button = e.target.id;
    let ProductArray = state.TableDataSet;

    let ProductObject = ProductArray.find((elem) => {
        return elem.id == button;
    });

    setEditorField('id', ProductObject.id);
    setEditorField('VendorCode', ProductObject.VendorCode);
    setEditorField('Vendor', ProductObject.Vendor);
    setEditorField('OID', ProductObject.OID);
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
    let Code = store.getState().editor.VendorCode;
    let Vendor = store.getState().editor.Vendor;
    
    const EditCode = document.getElementById('editor-code');
    const EditVendor = document.getElementById('editor-vendor');
    let checkEmpty = ()=> {
        if(Code == ''){
            return false;
        }
        if(Vendor == ''){
            return false;
        }
    }

    if(checkEmpty() == false){
        if(Code == ''){
            EditCode.classList.add('is-invalid');
        }
        if(Vendor == ''){
            EditVendor.classList.add('is-invalid');
        }

    } else {
        saveEditor();
    }
}

const removeClassEditor = () => {
    const EditCode = document.getElementById('editor-code');
    const EditVendor = document.getElementById('editor-vendor');
    const ClearEditor = document.getElementById('clear-editor');

    EditCode.addEventListener('change', (event) => {
        event.target.classList.remove('is-invalid');    
    });

    EditVendor.addEventListener('change', (event) => {
        event.target.classList.remove('is-invalid');    
    });

    ClearEditor.addEventListener('focus', () => {
        EditCode.classList.remove('is-invalid');
        EditVendor.classList.remove('is-invalid');
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
            VendorCode: '',
            Vendor: '',
            VendorID: 0,
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
            EditProduct={EditProduct} 
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


const init = () => {
    reloadTableDataSet();
    wndRefresh();
    removeClassEditor();
};

store.subscribe(() => {
    wndRefresh();
});

init();