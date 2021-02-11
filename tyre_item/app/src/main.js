import { createStore, bindActionCreators } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import reducer from './reducer';
import * as actions from './actions';

import Curtain from './components/curtain';

import BaseTable from './components/table';

const store = createStore(reducer);

const { dispatch } = store;

const { setState,
        setEditor
      } = bindActionCreators(actions, dispatch);

var InputTimer = undefined;

const getBaseAdress = (Arg = '') => {
    return 'crm-api.php';
};

const setStoreField = (Field, Value) => {
    let State = store.getState();

    State[Field] = Value;

    invokeEvent('onChangeStoreField', {Field: Field});

    setState(State);
};



const setEditorField = (Field ,Value) => {
    let Editor = store.getState().editor;

    if (typeof Value == 'undefined') {
        Value = '';
    }

    Editor[Field] = Value;

    store.dispatch(setEditor(Editor));
};



const onChangeStoreField = (Field) => {
    switch (Field) {
        case 'limit':
            break;
        
        case 'FilterDouplet':
            resetOffset();

            reloadTableDataSet();
            break;

        case 'FilterEmptyPage':
            resetOffset();

            reloadTableDataSet();
            break;

        case 'FilterIsCatalogProduct':
            resetOffset();

            reloadTableDataSet();
            break;

        case 'FilterVendorID':
            resetOffset();

            reloadTableDataSet();
            break;

        case 'FilterVendorCode': 
            clearTimeout(InputTimer);

            InputTimer = setTimeout(
                function() {
                    resetOffset();

                    reloadTableDataSet();
                },
                600
            );
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


const sendCreatePageFromTyre = (TyreID) => {
    const state = store.getState();

    const Params = {
        method: 'crm.productpage.createtyre',
        tyreid: TyreID
    };

    axios
        .get(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            reloadTableDataSet();
        });
};


const reloadTableDataSet = () => {
    const state = store.getState();

    const Params = {
        method: "crm.tyreitem.list",
        limit: state.limit,
        offset: state.offset * state.limit,
        vendorcode: state.FilterVendorCode,
        vendorid: state.FilterVendorID,
        doubles: state.FilterDouplet,
        emptypage: state.FilterEmptyPage,
        catproduct: state.FilterIsCatalogProduct
    };

    axios
        .get(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            setStoreField('TableDataSet', Response.data.data.payload);

            reloadVendorOptionList();
        });
};

const reloadVendorOptionList = () => {
    const state = store.getState();

    const Params = {
        method: "crm.vendoroption.list"
    };

    axios
        .get(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            console.log(Response);
            setStoreField('VendorOptionList', Response.data.data);
        });
};

const resetOffset = () => {
    setStoreField('offset', 0);
};

const wndRefresh = () => {
    // ReactDOM.render(
    //     <Curtain
    //       State={store.getState()}
    //       setStoreField={(Field, Value) => {
    //         setStoreField(Field, Value);
    //       }}
    //       />,
    //     document.getElementById('GlobalCurtainContainer')
    // );

    // ReactDOM.render(
    //     <h2 className="text-center">Хули ты здесь хотел увидеть. Свали отсюда, плес</h2>,
    //     document.getElementById('EditorContainer')
    // );

    ReactDOM.render(
        <BaseTable
          State={store.getState()}
          setStoreField={(Field, Value) => {
            setStoreField(Field, Value);
          }}
          sendCreatePageFromTyre={(TyreID) => {
            sendCreatePageFromTyre(TyreID);
          }}
          loadNext={loadNext}
          loadPrev={loadPrev}
          />,
        document.getElementById('TableContainer')
    )
};

const loadNext = () => {
    const Offset = store.getState().offset;

    setStoreField('offset', Offset + 1);

    reloadTableDataSet();
}

const loadPrev = () => {
    const Offset = store.getState().offset;

    let Value = Offset - 1;

    if (Offset < 0) {
        Value = 0;
    }

    setStoreField('offset', Value);

    reloadTableDataSet();
}

const clearEditor = () => {
    setStoreField(
        'editor',
        {
            id: 0
        }
    );
}

const setActiveCurtain = () => {

}

const setActiveRecordId = (Id) => {

    let EditorInstance = {
        id: 0
    };

    const TableDataSet = store.getState().TableDataSet;

    for (let i = 0; i < TableDataSet.length; i++) {
        if (TableDataSet[i].id == Id) {
            EditorInstance = {
                id: parseInt(TableDataSet[i].id)
            };
        }
    }

    setEditor(EditorInstance);
}

const init = () => {
    reloadTableDataSet();

    reloadVendorOptionList();

    wndRefresh();
};

store.subscribe(() => {
    wndRefresh();
});

init();