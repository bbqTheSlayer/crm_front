import { createStore, bindActionCreators } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import reducer from './reducer';
import * as actions from './actions';

import InputSet from './components/inputSet';

import DSNavigator from './components/DSNavigator';

import Table from './components/table';

import Editor from './components/editor';

import Notifier from './components/notifier';

const store = createStore(reducer);

const { dispatch } = store;

var InputDelay = undefined;

const Debounce = function(Delay, handler) {
    clearTimeout(InputDelay);

    InputDelay = setTimeout(
        handler,
        Delay
    );
};

const { setStore
      } = bindActionCreators(actions, dispatch);

const getBaseAdress = (Arg = '') => {
    return 'crm-api';
};



const loadNextPage = () => {
    const Offset = store.getState().offset;

    setOffset(Offset + 1);

    reloadTableDataSet();
};



const loadPrevPage = () => {
    const Offset = store.getState().offset;

    let Value = Offset - 1;

    if (Offset < 0) {
        Value = 0;
    }

    setOffset(Value);

    reloadTableDataSet();
};



const setStoreField = (Field, Value) => {
    let State = store.getState();

    State[Field] = Value;

    invokeEvent('onChangeStoreField', {Field: Field});

    setStore(State);
};


const onChangeStoreField = (Field) => {
    switch (Field) {
        case 'FilterVendorCode':
            Debounce(800, () => {
                console.log(store.getState().FilterVendorCode);
                resetOffset();
                reloadTableDataSet();
            });

            break;

        case 'FilterStock':
            resetOffset();
            reloadTableDataSet();
            break;

        case 'FilterVendorID':
            resetOffset();
            reloadTableDataSet();
            break;

        case 'FilterSeasonID':
            resetOffset();
            reloadTableDataSet();
            break;

        case 'FilterProviderID':
            resetOffset();

            reloadTableDataSet();

            // reloadStorageOptionList(
            //     'StorageFilterList',
            //     store.getState().FilterProviderID
            //     );

            break;

        case 'FilterStorageID':
            resetOffset();
            reloadTableDataSet();
            break;

        case 'FilterWidth':
            Debounce(800, () => {
                console.log(store.getState().FilterVendorCode);
                resetOffset();
                reloadTableDataSet();
            });
            break;

        case 'FilterHeight':
            Debounce(800, () => {
                console.log(store.getState().FilterVendorCode);
                resetOffset();
                reloadTableDataSet();
            });
            break;

        case 'FilterDiametr':
            Debounce(800, () => {
                console.log(store.getState().FilterVendorCode);
                resetOffset();
                reloadTableDataSet();
            });
            break;

        default:
            console.log(Field);
            console.log(store.getState()[Field]);
            break;
    }
};

const notify = (Headline, Message, type='success') => {
    setStoreField('NotifyList', []);

    setStoreField('NotifyList', [
        {
            Headline: Headline,
            Message: Message,
            type: type
        }
    ]);

    renderNotification();
}

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



const reloadTableDataSet = () => {
    const State = store.getState();

    const Params = {
        method: "crm.ownrest.list",
        vendorcode: State.FilterVendorCode,
        provider: State.FilterProviderID,
        storage: State.FilterStorageID,
        instock: State.FilterStock,
        vendor: State.FilterVendorID,
        season: State.FilterSeasonID,
        width: State.FilterWidth,
        height: State.FilterHeight,
        diam: State.FilterDiametr,
        limit: State.limit,
        offset: State.offset * State.limit
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            // console.log(Response);
            setStoreField('TableDataSet', Response.data.data.payload);
        });

};

const reloadProviderFilterSet = () => {
    const Params = {
        method: "crm.provider.optionlist",
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            setStoreField('ProviderFilterList', Response.data.data.payload);
        });

};

const reloadStorageFilterSet = () => {
    const State = store.getState();

    const Params = {
        method: "crm.storageselector.list",
        provider: State.FilterProviderID
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            console.log(Response);
            setStoreField('StorageFilterList', Response.data.data.result);
        });

};



const reloadStorageOptionList = (Target, ProviderID) => {
    const State = store.getState();

    const Params = {
        method: "crm.storage.optionlist",
        providerid: ProviderID,
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            // console.log(Response);
            setStoreField(Target, Response.data.data.result);
        });
};



const reloadVendorOptionList = () => {
    const State = store.getState();

    const Params = {
        method: "crm.vendor.optionlist"
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            // console.log(Response);
            setStoreField('VendorOptionList', Response.data.data);
        });
};



const updateRecord = () => {
    const State = store.getState();

    const Params = {
        method: "crm.providerproductstock.change",
        productid: State.EditorProductID,
        id: State.EditorStockID,
        count: State.EditorCount,
        storageid: State.EditorStorageID
    };

    axios
        .post(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            console.log(Response);
 
            const Result = Response.data.data.result;
            if (Result) {
                clearEditor();
                reloadTableDataSet();
                notify('Успешно', 'Обновлено', 'success');
            } else {
                notify('Ошибка', 'Не удалось сохранить', 'error');
            }
        });
};



const createRecord = () => {
    const State = store.getState();

    const Params = {
        method: "crm.providerproductstock.add",
        productid: State.EditorProductID,
        id: State.EditorStockID,
        count: State.EditorCount,
        storageid: State.EditorStorageID

    };

    axios
    .post(makeRequestUrl(getBaseAdress(), Params))
    .then((Response) => {
        console.log(Response);

        const id = Response.data.data.payload.data.id;
        if (id > 0) {
            clearEditor();
            reloadTableDataSet();
            notify('Успешно', 'Сохранено', 'success');
        } else {
            notify('Ошибка', 'Не удалось сохранить', 'error');
        }
    });
};



const setEditorParamValues = (Row) => {
    setStoreField('EditorStockID', Row.StockID);
    setStoreField('EditorProductID', Row.id);
    setStoreField('EditorStorageID', Row.StorageID);
    setStoreField('EditorCount', Row.Rest);
};



const clearEditor = () => {
    setEditorParamValues(
        {
            StockID: '0',
            id: '0',
            StorageID: '0',
            Rest: '0'
        }
    );

    notify('Успешно', 'Редактор очищен', 'success');
};


const setEditorData = (TargetID) => {
    const DataSet = store.getState().TableDataSet;

    let RestObject = DataSet.find((Row) => {
        return Row.id == TargetID;
    });

    setEditorParamValues(RestObject);
};



const saveEditor = () => {
    const ID = parseInt(store.getState().EditorStockID);

    if(ID > 0){
        updateRecord();
    }else {
        createRecord();
    }
};


const resetOffset = () => {
    setStoreField('offset', 0);
};



const loadNext = () => {
    const Offset = store.getState().offset;

    setStoreField('offset', Offset + 1);

    reloadTableDataSet();
};



const loadPrev = () => {
    const Offset = store.getState().offset;

    let Value = Offset - 1;

    if (Offset < 0) {
        Value = 0;
    }

    setStoreField('offset', Value);

    reloadTableDataSet();
};


const renderEditorFieldSetContainer = () => {
    ReactDOM.render(
        <InputSet
          State={store.getState()}
          FieldConfig={store.getState().EditorList}
          setStoreField={(Field, Value) => {
            setStoreField(Field, Value);
          }}
          />,
          document.getElementById('EditorFieldSetContainer')
    );
};

const renderNotification = () => {
    ReactDOM.render(
        <Notifier
          NotifyList={store.getState().NotifyList}
          />,
        document.getElementById('NotificationContainer')
    );
};

const wndRefresh = () => {
    ReactDOM.render(
        <InputSet
          State={store.getState()}
          FieldConfig={store.getState().FilterList}
          setStoreField={(Field, Value) => {
            setStoreField(Field, Value);
          }}
          />,
          document.getElementById('FilterContainer')
    );

    ReactDOM.render(
        <Table
          State={store.getState()}
          TableDataSet={store.getState().TableDataSet}
          loadNext={loadNext}
          loadPrev={loadPrev}
          setStoreField={(Field, Value) => {
              setStoreField(Field, Value);
            }}
          setEditorData={setEditorData}
          />, 
          document.getElementById('TableContainer')
    );

    ReactDOM.render(
        <DSNavigator
          Offset={store.getState().offset}
          loadNext={loadNext}
          loadPrev={loadPrev}
          setStoreField={(Field, Value) => {
            setStoreField(Field, Value);
          }}
          />,
        document.getElementById('TableNavigator')
    );

    ReactDOM.render(
        <Editor
        Store={store.getState()}
        setStoreField={(Field, Value) => {
          setStoreField(Field, Value);
        }}
        clearEditor={clearEditor}
        saveEditor={saveEditor}
        />, 
        document.getElementById('EditorContainer')
    );

    renderEditorFieldSetContainer();
};

const init = () => {
    clearEditor();

    reloadTableDataSet();

    reloadProviderFilterSet();

    reloadStorageOptionList(
        'StorageFilterList',
        store.getState().FilterStorageID
        );

    reloadStorageOptionList(
        'EditorStorageList',
        store.getState().Storage
        );

    reloadVendorOptionList();

    wndRefresh();
};

store.subscribe(() => {
    wndRefresh();
    // console.log(store.getState());
});

init();