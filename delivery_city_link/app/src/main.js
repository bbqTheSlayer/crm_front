
import { createStore, bindActionCreators } from 'redux';

import React from 'react';

import ReactDOM from 'react-dom';

import BaseTable from './components/table';

import reducer from './reducer';

import axios from 'axios';

import * as actions from './actions';

import Editor from './components/editor';

const store = createStore(reducer);

const baseAdress = 'crm-api.php';

const { dispatch } = store;

let SearchInputTimestamp = new Date(0);

const { setState,
        setEditor
      } = 
    bindActionCreators(actions, dispatch);

const makeRequestUrl = (base, params) => {
    let ParamArray = [];

    for (let key in params) {
        ParamArray.push(key + '=' + params[key]);
    }

    return base + '?' + ParamArray.join('&');
}

const setEditorField = (Field, Value) => {
    let Editor = store.getState().editor;

    Editor[Field] = Value;

    setEditor(Editor);
}

const reloadTableDataSet = () => {
    const State = store.getState();

    const Params = {
        method: "crm.deliverycitylink.list",
        // City: State.City,
        // Delivery: State.Delivery,
        regionid: State.FilterRegionID,
        isactive: State.FilterIsActive,
        deliveryid: State.FilterDeliveryID,
        limit: State.limit,
        offset: State.offset * State.limit
    };

    const URL = makeRequestUrl(baseAdress, Params);
    console.log(URL);

    axios
        .get(URL)
        .then((Response) => {
            // console.log(Response);
            setStoreField('TableDataSet', Response.data.data.result);
        });
}


const reloadDeliveryOptionList = () => {
    const State = store.getState();

    const Params = {
        method: "crm.deliveryoption.list",
        limit: 150
    };

    const URL = makeRequestUrl(baseAdress, Params);
    console.log(URL);

    axios
        .get(URL)
        .then((Response) => {
            // console.log(Response);
            setStoreField('DeliveryOptionList', Response.data.data.result);
        });
}

const reloadRegionOptionList = () => {
    const State = store.getState();

    const Params = {
        method: "crm.regionoption.list"
        // limit: 1000
    };

    const URL = makeRequestUrl(baseAdress, Params);
    console.log(URL);

    axios
        .get(URL)
        .then((Response) => {
            // console.log(Response);
            setStoreField('RegionOptionList', Response.data.data.result);
        });
}

const reloadCityOptionList = () => {
    const State = store.getState();

    const Params = {
        method: "crm.cityoption.list",
        regionid: State.RegionID
    };

    const URL = makeRequestUrl(baseAdress, Params);
    // console.log(URL);

    axios
        .get(URL)
        .then((Response) => {
            // console.log(Response);
            setStoreField('CityOptionList', Response.data.data.result);
        });
}


const reloadRegion = () => {
    const State = store.getState();

    const Params = {
        method: "crm.deliverycitylink.list",
        City: State.City,
        Delivery: State.Delivery,
        limit: State.limit,
        offset: State.offset * State.limit
    };

    const URL = makeRequestUrl(baseAdress, Params);
    console.log(URL);

    axios
        .get(URL)
        .then((Response) => {
            // console.log(Response);
            setStoreField('TableDataSet', Response.data.data.result);
        });
}


const onChangeStoreField = (Field) => {
    switch (Field) {
        case 'SearchString':
            const Now = new Date();
            const Delta = Now - SearchInputTimestamp;
            // console.log(Delta);
            if (Delta > 2100) {
                // console.log('It works');
                reloadTableDataSet();
            }

            SearchInputTimestamp = Now;
            break;

        case 'RegionID':
            reloadCityOptionList();
            break;

        case 'FilterRegionID':
            resetOffset();
            reloadTableDataSet();
            break;

        case 'FilterIsActive':
            resetOffset();
            reloadTableDataSet();
            break;

        case 'FilterDeliveryID':
            resetOffset();
            reloadTableDataSet();
            break;

        default:
            const Store = store.getState();
            console.log(Field);
            console.log(Store[Field]);
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

const setStoreField = (Field, Value) => {
    let State = store.getState();

    State[Field] = Value;

    invokeEvent('onChangeStoreField', {Field: Field});

    setState(State);
}

const clearEditor = () => {
    setStoreField('RegionID', 0);

    setEditor(
        {
            id: 0,
            CityID: 0,
            DeliveryID: 0,
            IsActive: false
        }
    );
}


const setActiveRecordId = (Id) => {
    console.log(Id);

    let EditorInstance = {
        id: 0,
        CityID: 0,
        DeliveryID: 0,
        IsActive: false
    };

    const TableDataSet = store.getState().TableDataSet;

    for (let i = 0; i < TableDataSet.length; i++) {
        if (TableDataSet[i].id == Id) {
            setStoreField('RegionID', parseInt(TableDataSet[i].RegionID));

            EditorInstance = {
                id: parseInt(TableDataSet[i].id),
                CityID: parseInt(TableDataSet[i].CityID),
                DeliveryID: parseInt(TableDataSet[i].DeliveryID),
                IsActive: Boolean(parseInt(TableDataSet[i].IsActive))
            };
        }
    }

    setEditor(EditorInstance);
}

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

const createRecord = () => {
    const State = store.getState();

    const Editor = State.editor;

    const Params = {
        method: "crm.deliverycitylink.add",
        cityid: Editor.CityID,
        deliveryid: Editor.DeliveryID,
        isactive: Editor.IsActive ? 1 : 0
    };

    const URL = makeRequestUrl(baseAdress, Params);

    axios
        .get(URL)
        .then((Response) => {
            const id = Response.data.data.result.id;

            if (id > 0) {
                clearEditor();
            }
        });
}

const updateRecord = () => {
    const State = store.getState();

    const Editor = State.editor;

    let Params = {
        method: 'crm.deliverycitylink.change',
        id: Editor.id,
        cityid: Editor.CityID,
        deliveryid: Editor.DeliveryID,
        isactive: Editor.IsActive ? 1 : 0
    };

    const URL = makeRequestUrl(baseAdress, Params);

    console.log(URL);

    axios
        .get(URL)
        .then((Response) => {
            const Result = Response.data.data.result.result;

            if (Result) {
                clearEditor();
                reloadTableDataSet();
            }
        });
}

const resetOffset = () => {
    setStoreField('offset', 0);
}

const saveEditor = () => {
    const Editor = store.getState().editor;

    if (Editor.id > 0) {
        updateRecord();
    } else {
        createRecord();
    }
}

const wndRefresh = () => {
    ReactDOM.render(
        <BaseTable
          Store={store.getState()}
          DataSet={store.getState().TableDataSet}
          ColumnList={store.getState().ColumnList}
          setRecId={(i) => {
            setActiveRecordId(i);
          }}
          setStoreField={(Field, Value) => {
            setStoreField(Field, Value);
          }}
          loadNext={loadNext}
          loadPrev={loadPrev}
          />,
        document.getElementById('table-container')
    );

    ReactDOM.render(
        <Editor
          Store={store.getState()}
          setEditorField={(Field, Value) => {
            setEditorField(Field, Value);
          }}
          setStoreField={(Field, Value) => {
            setStoreField(Field, Value);
          }}
          clearEditor={() => {
            clearEditor();
          }}
          saveEditor={() => {
            saveEditor();
          }}
          />,
        document.getElementById('editor-container')
    );
}

const init = () => {
    reloadTableDataSet();

    reloadDeliveryOptionList();

    reloadRegionOptionList();

    wndRefresh();
}

init();

store.subscribe(() => {
    wndRefresh();

    // console.log(store.getState());
});