import { createStore, bindActionCreators } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/table';
import Editor from './components/editor';
import axios from 'axios';
import reducer from './reducer';
import * as actions from './actions';

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
        case 'FilterRegion':
            Debounce(800, () => {
                resetOffset();
                reloadTableDataSet();
            });
            break;
        
        case 'FilterDistrict':
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

const getBaseAdress = (Arg = '') => {
    return 'crm-api';
}

const reloadTableDataSet = () => {
    const State = store.getState();

    const TableParams = {
        method: "crm.region.list",
        name: State.SearchRegion,
        districtid: State.SearchDistrict,
        limit: State.limit,
        offset: State.offset * State.limit
    };

    axios
        .get(makeRequestUrl(getBaseAdress(), TableParams))
        .then((Response) => {
            setStoreField('TableDataSet', Response.data.data);
        });
        
    const OptionParams = {
        method: "crm.regiondistrict.list",
    };
    
    axios
        .get(makeRequestUrl(getBaseAdress(), OptionParams))
        .then((Response) => {
            setStoreField('OptionList', Response.data.data);
        }); 
        
}   

const makeRequestUrl = (base, params) => {
    let ParamArray = [];

    for (let key in params) {
        ParamArray.push(key + '=' + params[key]);
    }

    return base + '?' + ParamArray.join('&');
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

const updateRecord = () => {
    const Editor = store.getState().editor;

    const Params = {
        method: "crm.region.update",
        id: Editor.id,
        name: Editor.Region,
        districtid: Editor.DistrictID
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
        method: "crm.region.create",
        name: Editor.Region,
        districtid: Editor.DistrictID,
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            let code = Response.data.code;
            let message = Response.data.message;
            console.log(Response);
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
            Region: '',
            DistrictID: 0
        }
    );
}

const EditRegion = (e) => {

    const State = store.getState();

    let button = e.target.id;
    let RegionArray = State.TableDataSet;

    let RegionObject = RegionArray.find((elem) => {
        return elem.id == button;
    });

    setEditorField('DistrictID', RegionObject.DistrictID);
    setEditorField('Region', RegionObject.Region);
    setEditorField('id', RegionObject.id);
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
          EditRegion={EditRegion}
          />, 
          document.getElementById('RegionContainer')
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
    console.log(store.getState());
});

init();