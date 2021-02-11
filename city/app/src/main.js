
import { createStore, bindActionCreators } from 'redux';

import React from 'react';
import ReactDOM from 'react-dom';
import BaseTable from './components/base/table';

import reducer from './reducer';

import axios from 'axios';

import * as actions from './actions';

import Editor from './components/editor';

const store = createStore(reducer);

const baseAdress = 'crm-api.php';

const { dispatch } = store;

let SearchInputTimestamp = new Date(0);

const dkfmvdv = (Val) => {
    setStoreField('Field', Val);
    reloadCityList();
}

var InputDelay = undefined;

const Debounce = function(Delay, handler) {
    clearTimeout(InputDelay);

    InputDelay = setTimeout(
        handler,
        Delay
    );
}

const { setState,
        setCityList,
        setRegionList,
        setOffset,
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

const reloadRegionList = () => {
    const State = store.getState();

    const Params = {
        method: "crm.region.list",
        limit: 100
    };

    const URL = makeRequestUrl(baseAdress, Params);

    axios
        .get(URL)
        .then((Response) => {
            // console.log(Response);
            setRegionList(Response.data.data.result);
        });
}

const setEditorField = (Field, Value) => {
    let Editor = store.getState().editor;

    Editor[Field] = Value;

    setEditor(Editor);
}

const resetOffset = () => {
    setStoreField('offset', 0);
}

const reloadCityList = () => {
    const State = store.getState();

    const Params = {
        method: "crm.city.list",
        city: State.SearchString,
        regionid: State.FilterRegionID,
        limit: State.limit,
        offset: State.offset * State.limit
    };

    const URL = makeRequestUrl(baseAdress, Params);
    console.log(URL);

    axios
        .get(URL)
        .then((Response) => {
            console.log(Response);
            setCityList(Response.data.data.result);
        });
}

const onChangeStoreField = (Field) => {
    switch (Field) {
        case 'SearchString':
            Debounce(800, () => {
                resetOffset();
                reloadCityList();
            });
            break;
        
        case 'FilterRegionID':
            resetOffset();
            reloadCityList();
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
    setEditor(
        {
            id: 0,
            City: '',
            RegionID: 0,
            IsActive: false,
            IsPopular: false,
            CapitalDistance: 0
        }
    );
}

const setActiveRecordId = (Id) => {
    console.log(Id);

    let EditorInstance = {
        id: 0,
        City: '',
        RegionID: 0,
        IsActive: false,
        IsPopular: false,
        CapitalDistance: 0
    };

    const CityList = store.getState().CityList;

    for (let i = 0; i < CityList.length; i++) {
        if (CityList[i].id == Id) {
            EditorInstance = {
                id: parseInt(CityList[i].id),
                City: CityList[i].City,
                RegionID: parseInt(CityList[i].RegionID),
                IsActive: Boolean(parseInt(CityList[i].IsActive)),
                IsPopular: Boolean(parseInt(CityList[i].IsPopular)),
                CapitalDistance: parseInt(CityList[i].CapitalDistance)
            };
        }
    }

    setEditor(EditorInstance);
}

const loadNext = () => {
    const Offset = store.getState().offset;

    setOffset(Offset + 1);

    reloadCityList();
}

const loadPrev = () => {
    const Offset = store.getState().offset;

    let Value = Offset - 1;

    if (Offset < 0) {
        Value = 0;
    }

    setOffset(Value);

    reloadCityList();
}

const createRecord = () => {
    const State = store.getState();

    const Editor = State.editor;

    const Params = {
        method: "crm.city.add",
        city: Editor.City,
        regionid: Editor.RegionID,
        isactive: Editor.IsActive ? 1 : 0,
        ispopular: Editor.IsPopular ? 1 : 0,
        capitaldistance: Editor.CapitalDistance
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
        method: 'crm.city.change',
        id: Editor.id,
        city: Editor.City,
        regionid: Editor.RegionID,
        isactive: Editor.IsActive ? 1 : 0,
        ispopular: Editor.IsPopular ? 1 : 0,
        capitaldistance: Editor.CapitalDistance
    };

    const URL = makeRequestUrl(baseAdress, Params);

    console.log(URL);

    axios
        .get(URL)
        .then((Response) => {
            const Result = Response.data.data.result.result;

            if (Result) {
                clearEditor();
                reloadCityList();
            }
        });
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
          DataSet={store.getState().CityList}
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
          saveEditor={() => {
            saveEditor();
          }}
          clearEditor={() => {
              clearEditor();
          }}
          />,
        document.getElementById('editor-container')
    );
}

const init = () => {
    reloadCityList();

    reloadRegionList();

    wndRefresh();
}

init();

store.subscribe(() => {
    wndRefresh();

    console.log(store.getState());
});
