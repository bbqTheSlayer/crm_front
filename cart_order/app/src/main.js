import { createStore, bindActionCreators } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import reducer from './reducer';
import * as actions from './actions';
import Delivery from './components/delivery';
import Recipient from './components/recipient';
import Payment from './components/payment';
import Cart from './components/cart';

const store = createStore(reducer);

const { dispatch } = store;

const { setStore
      } = bindActionCreators(actions, dispatch);

var InputDelay = undefined;

const Debounce = function(Delay, handler) {
        clearTimeout(InputDelay);
    
        InputDelay = setTimeout(
            handler,
            Delay
        );
}

const getBaseAdress = (Arg = '') => {
    return 'crm-api';
}

const getMiniShopAdress = (Arg = '') => {
    return 'assets/components/minishop1/action.php';
}

const setStoreField = (Field, Value) => {
    let State = store.getState();

    State[Field] = Value;

    invokeEvent('onChangeStoreField', {Field: Field});

    setStore(State);
}

const onChangeStoreField = (Field) => {
    let State = store.getState();

    switch (Field) {
        case 'RegionID':
            State.OrderKey = State.RegionID;
            State.OrderValue = State.Region;


            OrderAdd();
            reloadCityDataSet();
            break;

        case 'CityID':
            State.OrderKey = State.CityID;
            State.OrderValue = State.City;

            OrderAdd();
            reloadDeliveryDataSet();
            break;

        case 'DeliveryID':
            State.OrderKey = State.DeliveryID;
            State.OrderValue = State.Delivery;

            OrderAdd();
            break;

        case 'StreetID':
            State.OrderKey = State.StreetID;
            State.OrderValue = State.Street;
            Debounce(800, () => {
                OrderAdd();
            });
            break;

        case 'BuildingID':
            State.OrderKey = State.BuildingID;
            State.OrderValue = State.Building;
            Debounce(800, () => {
                OrderAdd();
            });
            break;

        case 'EmailID':
            State.OrderKey = State.EmailID;
            State.OrderValue = State.Email;
            Debounce(800, () => {
                OrderAdd();
            });
            break;

        case 'ReceiverID':
            State.OrderKey = State.ReceiverID;
            State.OrderValue = State.Receiver;
            Debounce(800, () => {
                OrderAdd();
            });
            break;

        case 'PhoneID':
            State.OrderKey = State.PhoneID;
            State.OrderValue = State.Phone;
            Debounce(800, () => {
                OrderAdd();
            });
            break;

        case 'CommentID':
            State.OrderKey = State.CommentID;
            State.OrderValue = State.Comment;
            Debounce(800, () => {
                OrderAdd();
            });
            break;

        case 'PaymentID':
            State.OrderKey = State.PaymentID;
            State.OrderValue = State.Payment;

            OrderAdd();
            orderGetCost();
            break;

        case 'ProductRemove':
            cartProductRemove();
            break;

        case 'ProductKey':
            cartChange();
            orderGetCost();
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

const reloadRegionDataSet = () => {

    const Params = {
        method: "crm.region.list",
    };

    axios
        .get(makeRequestUrl(getBaseAdress(), Params))
        .then((Response) => {
            let data = Response.data.data;
            console.log(Response);
            setStoreField('RegionDataSet', data);
        }); 

}

const reloadPaymentDataSet = () => {
    const Payment = [
        {
            id: 1,
            name: 'Оплата онлайн'
        },{
            id: 2,
            name: 'Оплата наличными'
        }
    ];

    setStoreField('PaymentDataSet', Payment);

}

const reloadCartDataSet = () => {
    const ProductList = [
        {
            id: 1,
            image: '/assets/images/products/58/michelin-primacy-4-watermark.jpg',
            category: 'Автомобильная шина',
            key: '53531314a6756723132',
            name: 'Michelin Primacy 4 185 65 15',
            count: 1,
            price: 4650,
        },{
            id: 2,
            image: '/assets/images/products/54/nokian-nordman-sx2-watermark.jpg',
            category: 'Автомобильная шина',
            key: '6346453645asd234234',
            name: 'Nokian Hakkapelita 4 185 65 15',
            count: 1,
            price: 7650,
        }
    ];

    setStoreField('ProductList', ProductList);

}

const reloadCityDataSet = () => {
    const state = store.getState();

    const Params = {
        method: "crm.cityoption.list",
        regionid: state.Region,
    };

    const url = makeRequestUrl(getBaseAdress(), Params);

    console.log(url);

    axios
        .get(url)
        .then((Response) => {
            let data = Response.data.data.result;
            console.log(data);
            setStoreField('CityDataSet', data);
        }); 
}

const reloadDeliveryDataSet = () => {
    const state = store.getState();

    const Params = {
        method: "crm.delivery.list",
        cityid: state.City,
    };

    const url = makeRequestUrl(getBaseAdress(), Params);

    console.log(url);

    axios
        .get(url)
        .then((Response) => {
            let data = Response.data.data;
            console.log(Response);
            setStoreField('DeliveryDataSet', data);
        }); 
}

const OrderAdd = () => {
    const state = store.getState();

    const Params = {
        action: 'order/add',
        ctx: 'web',
        key: state.OrderKey,
        value: state.OrderValue,
    };

    const url = makeRequestUrl(getMiniShopAdress(), Params);

    console.log(url);

    axios
        .post(url)
        .then((Response) => {
            console.log(Response);
        }); 
}

const cartClean = () => {

    const Params = {
        action: 'cart/clean',
    };

    const url = makeRequestUrl(getMiniShopAdress(), Params);

    console.log(url);

    axios
        .post(url)
        .then((Response) => {
            console.log(Response);
        }); 
}

const cartChange = () => {
    const state = store.getState();

    const Params = {
        action: 'cart/change',
        key: state.ProductKey,
        count: state.ProductCount,
        ctx: 'web',
    };

    const url = makeRequestUrl(getMiniShopAdress(), Params);

    console.log(url);

    axios
        .post(url)
        .then((Response) => {
            console.log(Response);
        }); 
}

const cartProductRemove = () => {
    const state = store.getState();

    const Params = {
        action: 'cart/remove',
        key: state.ProductRemove,
        ctx: 'web',
    };

    const url = makeRequestUrl(getMiniShopAdress(), Params);

    console.log(url);

    axios
        .post(url)
        .then((Response) => {
            console.log(Response);
        }); 
}

const orderClean = () => {
    const Params = {
        action: 'order/clean',
    };

    const url = makeRequestUrl(getMiniShopAdress(), Params);

    console.log(url);

    axios
        .post(url)
        .then((Response) => {
            console.log(Response);
        }); 
}

const orderGetCost = () => {

    const Params = {
        action: 'order/getcost',
    };

    const url = makeRequestUrl(getMiniShopAdress(), Params);

    console.log(url);

    axios
        .post(url)
        .then((Response) => {
            let data = Response.data.data.cost;
            setStoreField('TotalCost', data);
        }); 
}

const orderSubmit = () => {
    const state = store.getState();

    const Params = {
        action: 'order/submit',
        region: state.Region,
        city: state.City,
        index: '',
        street: state.Street,
        building: state.Building,
        email: state.Email,
        receiver: state.Receiver,
        phone: state.Phone,
        comment: state.Comment,
        ctx: 'web'
    };

    const url = makeRequestUrl(getMiniShopAdress(), Params);

    console.log(url);

    axios
        .post(url)
        .then((Response) => {
            console.log(Response);
        }); 
}

const wndRefresh = () => {

    ReactDOM.render(
        <Cart
          Store={store.getState()}
          setStoreField={(Field, Value) => {
            setStoreField(Field, Value);
          }}
          cartClean={cartClean}
          />, 
          document.getElementById('cart')
    ); 

    ReactDOM.render(
        <Delivery
          Store={store.getState()}
          setStoreField={(Field, Value) => {
            setStoreField(Field, Value);
            }}
          />, 
          document.getElementById('deliverys')
    );

    ReactDOM.render(
        <Recipient
          Store={store.getState()}
          setStoreField={(Field, Value) => {
            setStoreField(Field, Value);
            }}
          orderClean={orderClean}
          />, 
          document.getElementById('recipient')
    );

    ReactDOM.render(
        <Payment
          Store={store.getState()}
          setStoreField={(Field, Value) => {
            setStoreField(Field, Value);
          }}
          orderSubmit={orderSubmit}  
          />, 
          document.getElementById('payment')
    ); 
};

const init = () => {
    reloadRegionDataSet();
    reloadPaymentDataSet();
    reloadCartDataSet();
    orderGetCost();
    wndRefresh();
};

store.subscribe(() => {
    wndRefresh();
    console.log(store.getState());
});

init();