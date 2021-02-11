import { createStore, bindActionCreators } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import reducer from './reducer';
import * as actions from './actions';

import BaseTable from '../src/components/table';

const store = createStore(reducer);

const { dispatch } = store;

const { setState,
        setEditor
      } = bindActionCreators(actions, dispatch);

var InputTimer = undefined;

const getBaseAdress = (Arg = '') => {
    return 'crm-api';
}

const setStoreField = (Field, Value) => {
    let State = store.getState();

    State[Field] = Value;

    invokeEvent('onChangeStoreField', {Field: Field});

    setState(State);
}

const setEditorField = (Field ,Value) => {
    let Editor = store.getState().editor;

    if (typeof Value == 'undefined') {
        Value = '';
    }

    Editor[Field] = Value;

    store.dispatch(setEditor(Editor));
}

const onChangeStoreField = (Field) => {
    switch (Field) {
        case 'limit':
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

        case 'FilterProductName':
            clearTimeout(InputTimer);

            InputTimer = setTimeout(
                function() {
                    resetOffset();

                    reloadTableDataSet();
                },
                800
            );

            break;

        case 'FilterProviderStorageID':
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

const replaceSpecialChars = (ArgString) => {
    let Target = ArgString.split('%').join('%25');

    Target = Target.split(' ').join('%20');
    Target = Target.split('/').join('%2F');

    // ArgString.replace('\\', '%5C');
    // ArgString.replace('"', '%22');
    // ArgString.replace('!', '%21');
    // ArgString.replace('&', '%26');
    // ArgString.replace("'", '%27');
    // ArgString.replace('*', '%2A');
    // ArgString.replace('+', '%2B');
    // ArgString.replace('-', '%2D');
    // ArgString.replace('.', '%2E');
    // ArgString.replace('/', '%2F');
    // ArgString.replace('_', '%5F');
    // ArgString.replace(',', '%2C');
    // ArgString.replace(':', '%3A');
    // ArgString.replace(';', '%3B');
    // ArgString.replace('=', '%3D');
    // ArgString.replace('<', '%3C');
    // ArgString.replace('>', '%3E');
    // ArgString.replace('?', '%3F');
    // ArgString.replace('(', '%28');
    // ArgString.replace(')', '%29');

    return Target;
}

const reloadTableDataSet = () => {
    const state = store.getState();

    const Params = {
        method: "crm.storagerest.list",
        vc: state.FilterVendorCode,
        name: replaceSpecialChars(state.FilterProductName),
        storageid: state.FilterProviderStorageID,
        limit: state.limit,
        offset: state.limit * state.offset
    };

    const URL = makeRequestUrl(getBaseAdress(), Params);

    console.log(URL);

    axios
        .post(URL)
        .then((Response) => {
            setStoreField('TableDataSet', Response.data.data.result);
        });

}

const reloadProviderStorageList = () => {
    const state = store.getState();

    const Params = {
        method: "crm.storage.optionlist"
    };

    const URL = makeRequestUrl(getBaseAdress(), Params);

    axios
        .post(URL)
        .then((Response) => {
            setStoreField('ProviderStorageOptionList', Response.data.data.result);
        });

}

const resetOffset = () => {
    setStoreField('offset', 0);
}

const wndRefresh = () => {
    ReactDOM.render(
        <BaseTable
          Store={store.getState()}
          DataSet={store.getState().TableDataSet}
          ColumnList={store.getState().ColumnList}
          setStoreField={(Field, Value) => {
            setStoreField(Field, Value);
          }}
          loadNext={loadNext}
          loadPrev={loadPrev}
          />,
        document.getElementById('table-container')
    );
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
    reloadProviderStorageList();

    reloadTableDataSet();

    wndRefresh();
};

store.subscribe(() => {
    wndRefresh();
});

init();