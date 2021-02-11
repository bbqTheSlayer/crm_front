import { createStore, bindActionCreators } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import reducer from './reducer';
import * as actions from './actions';
import Table from './components/table';
import Editor from './components/editor'

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

    invokeEvent('onChangeEditorField', {Field: Field});

    setEditor(Editor);
}

const onChangeStoreField = (Field) => {
    switch (Field) {
        case 'FilterBrand':
            resetOffset();
            reloadTableDataSet();
            reloadFamilyDataSet();
            break;

        case 'FilterModelFamily':
            resetOffset();
            reloadTableDataSet();
            reloadModelDataSet();
            break;

        case 'FilterModel':
            resetOffset();
            reloadTableDataSet();
            break;

        case 'CarBrandID':
            reloadTableDataSet();
            reloadFamilyEditor();
            break;
    
        case 'CarModelFamilyID':
            reloadTableDataSet();
            reloadModelEditor();
            break;

        default:
            console.log(store.getState()[Field]);
            break;
    }
}

const onChangeEditorField = (Field) => {
    switch (Field) {
        case 'CarBrandID':
            reloadFamilyEditor();
            break;
    
        case 'CarModelFamilyID':
            reloadModelEditor();
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

        case 'onChangeEditorField':
            onChangeEditorField(Params.Field);
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
        method: "crm.carobject.list",
        cboid: State.FilterBrand,
        cmfoid: State.FilterModelFamily,
        cmoid: State.FilterModel,
        limit: State.limit,
        offset: State.offset * State.limit
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            setStoreField('TableDataSet', Response.data.data);
        });

}

const reloadBrandDataSet = () => {

    const Params = {
        method: "crm.carbrand.list",
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            console.log(Response);
            setStoreField('BrandDataSet', Response.data.data);
        });

}

const reloadFamilyDataSet = () => {
    const State = store.getState();

    const Params = {
        method: "crm.carmodelfamily.list",
        cboid: State.FilterBrand
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            console.log(Response);
            setStoreField('FamilyDataSet', Response.data.data);
        });

}

const reloadModelDataSet = () => {
    const State = store.getState();

    const Params = {
        method: "crm.carmodel.list",
        cmfoid: State.FilterModelFamily,

    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            setStoreField('ModelDataSet', Response.data.data);
        });

}

const reloadFamilyEditor = () => {
    const Editor = store.getState().editor;

    const Params = {
        method: "crm.carmodelfamily.list",
        cboid: Editor.CarBrandID
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            console.log(Response);
            setStoreField('FamilyDataSet', Response.data.data);
        });

}

const reloadModelEditor = () => {
    const Editor = store.getState().editor;

    const Params = {
        method: "crm.carmodel.list",
        cmfoid: Editor.CarModelFamilyID,

    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            setStoreField('ModelDataSet', Response.data.data);
        });

}

const updateRecord = () => {
    const Editor = store.getState().editor;

    const Params = {
        method: "crm.carobject.update",
        id: Editor.id,
        cboid: Editor.CarBrandID,
        cmfoid: Editor.CarModelFamilyID,
        cmoid: Editor.CarModelID,
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
        method: "crm.carobject.create",
        cboid: Editor.CarBrandID,
        cmfoid: Editor.CarModelFamilyID,
        cmoid: Editor.CarModelID,
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

const EditCar = (e) => {

    const State = store.getState();

    let button = e.target.id;
    let carArray = State.TableDataSet;

    let carObject = carArray.find((elem) => {
        return elem.id == button;
    });

    setEditorField('id', carObject.id);
    setEditorField('CarBrandID', carObject.CarBrandOID);
    setEditorField('CarModelFamilyID', carObject.CarModelFamilyOID);
    setEditorField('CarModelID', carObject.CarModelOID);
}

const saveEditor = () => {
    const Editor = store.getState().editor;

    if(Editor.id > 0){
        updateRecord();
    }else {
        createRecord();
    }

}

const resetOffset = () => {
    setStoreField('offset', 0);
}

const clearEditor = () => {
    setStoreField(
        'editor',
        {
            id: 0,
            CarBrandID: 0,
            CarModelFamilyID: 0,
            CarModelID: 0,
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
          EditCar={EditCar} 
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
          saveEditor={saveEditor}
          clearEditor={clearEditor}
          />, 
          document.getElementById('EditorContainer')
    );  
};



const init = () => {
    reloadTableDataSet();
    reloadBrandDataSet();
    reloadFamilyDataSet();
    reloadModelDataSet();
    wndRefresh();
};

store.subscribe(() => {
    wndRefresh();
});

init();