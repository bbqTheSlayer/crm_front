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

const onChangeStoreField = (Field) => {
    switch (Field) {
        case 'FilterModel':
            reloadTableDataSet();
            resetOffset();
            break;

        case 'FilterModelFamily':
            reloadTableDataSet();
            reloadModelDataSet();
            resetOffset();
            break;

        case 'FilterBrand':
            reloadTableDataSet();
            reloadFamilyDataSet();
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
        method: "crm.carproductlink.list",
        cmoid: State.FilterModel,
        cmfoid: State.FilterModelFamily,
        cboid: State.FilterBrand,
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
    const Params = {
        method: "crm.carmodel.list",
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            setStoreField('ModelDataSet', Response.data.data);
        });

}

const reloadProductList = () => {
    const Params = {
        method: "crm.carproductcatalog.list",
        limit: 1000
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            setStoreField('ProductList', Response.data.data);
        });

}

const reloadCarList = () => {
    const Params = {
        method: "crm.carobject.list",
        limit: 1000
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            setStoreField('CarList', Response.data.data);
        });

}

const updateRecord = () => {
    const Editor = store.getState().editor;

    const Params = {
        method: "crm.carproductlink.update",
        id: Editor.id,
        oid: Editor.CarBrandID,
        pcoid: Editor.CarModelFamilyID,
        createdate: Editor.CreateDate,
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
        method: "crm.carproductlink.create",
        oid: Editor.CarBrandID,
        pcoid: Editor.CarModelFamilyID,
    };

    axios
    .post(makeRequestUrl(getBaseAdress(), Params))
    .then((Response) => {
        const id = Response.data.data.result.id;
        if (id > 0) {
            clearEditor();
            reloadTableDataSet();
        }
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

const resetOffset = () => {
    setStoreField('offset', 0);
}

const EditProductLink = (e) => {

    const State = store.getState();

    let button = e.target.id;
    let LinkArray = State.TableDataSet;

    let LinkObject = LinkArray.find((elem) => {
        return elem.id == button;
    });

    setEditorField('id', LinkObject.id);
    setEditorField('CarObjectID', LinkObject.CarObjectID);
    setEditorField('ProductOID', LinkObject.ProductCatalogOID);
    setEditorField('CreateDate', LinkObject.CreateDate);
    console.log(State.editor);
}

const clearEditor = () => {
    setStoreField(
        'editor',
        {
            id: 0,
            CarObjectID: 0,
            ProductOID: 0,
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
          EditProductLink={EditProductLink} 
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
    reloadProductList();
    reloadCarList();
    wndRefresh();
};

store.subscribe(() => {
    wndRefresh();
});

init();