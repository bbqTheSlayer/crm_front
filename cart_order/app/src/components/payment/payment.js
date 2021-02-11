import React, {Component} from 'react';
import BaseRadio from '../base/radio';

export default class Payment extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    orderSubmit()
    {
        this.props.orderSubmit();
    }

    renderPaymentRadio()
    {
      const OptionList = this.props.Store.PaymentDataSet;
        return (
            <BaseRadio
            name="payment"
            OptionList={OptionList}
            onChange={(Val) => {
                this.props.setStoreField('Payment', Val);
            }}
            getID={(Val) => {
              this.props.setStoreField('PaymentID', Val);
            }}
              />
          )
    }

    render()
    {
        const payment = this.renderPaymentRadio();
        let Cost = this.props.Store.TotalCost;

        return (
        <>
            <div className="col-lg-12 pt15">
              <div className="white-frame p15">
                <div className="row">
                  <div className="col-xs-12" id="payments">
                    <h2>3. Выбор способа оплаты</h2>
                    <div id="PaymentAfter">
                        <div className="row">
                            <label className="col-xs-12 col-sm-3">
                                Оплата
                            </label>

                            <div className="col-xs-12 col-sm-6">
                                <div className="payment-container">
                                    {payment}
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 pt15 pb15">
              <div className="white-frame p15">
                <div className="row">
                  <div className="col-lg-12">

                    <div className="h3 text-right">
                      <span id="ms2_order_cost">Итого с доставкой: {Cost}</span>
                    </div>

                    <div className="text-center ">
                      <button className="btn btn-lg btn-success ms2_link"
                            onChange={this.orderSubmit}
                      >
                          Сделать заказ!
                      </button>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
        </>
        )
    }
}