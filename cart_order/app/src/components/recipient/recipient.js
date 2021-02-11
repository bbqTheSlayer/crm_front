import React, {Component} from 'react';
import BaseInput from '../base/input';
import BaseTextArea from '../base/textArea';

export default class Recipient extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    orderClean()
    {
        this.props.orderClean();
    }

    renderInputEmail()
    {
        return (
            <BaseInput
              className="form-control required"
              id="email"
              placeholder="Email"
              onChange={(Val) => {
                  this.props.setStoreField('Email', Val);
              }}
              getID={(Val) => {
                this.props.setStoreField('EmailID', Val);
              }}
              />
          )
    }

    renderInputRecipient()
    {
        return (
            <BaseInput
              className="form-control required"
              id="receiver"
              placeholder="Получатель"
              onChange={(Val) => {
                this.props.setStoreField('Receiver', Val);
              }}
              getID={(Val) => {
                this.props.setStoreField('ReceiverID', Val);
              }}
              />
          )
    }

    renderInputPhone()
    {
        return (
            <BaseInput
              className="form-control phone required"
              id="phone"
              placeholder="Телефон"
              onChange={(Val) => {
                this.props.setStoreField('Phone', Val);
              }}
              getID={(Val) => {
                this.props.setStoreField('PhoneID', Val);
              }}
              />
          )
    }

    renderInputComment()
    {
        return (
            <BaseTextArea
              className="form-control"
              id="comment"
              placeholder="Комментарий"
              onChange={(Val) => {
                this.props.setStoreField('Comment', Val);
              }}
              getID={(Val) => {
                this.props.setStoreField('CommentID', Val);
              }}
              />
          )
    }
    
    render()
    {
      const email = this.renderInputEmail();
      const recipient =this.renderInputRecipient();
      const phone = this.renderInputPhone();
      const comment = this.renderInputComment();

        return (
        <>
            <div className="white-frame p15">
              <div className="row">
                <div className="col-xs-12">
                  <h2>2. Получатель</h2>
                </div>

                <div className="col-xs-12">

                  <div className="form-group row">
                    <label className="col-xs-12 col-sm-3">
                        Email
                    </label>

                    <div className="col-xs-12 col-sm-6">
                        {email}
                    </div>

                  </div>

                  <div className="form-group row">
                    <label className="col-xs-12 col-sm-3">
                        Получатель
                    </label>

                    <div className="col-xs-12 col-sm-6">
                        {recipient}
                    </div>

                  </div>

                  <div className="form-group row">
                    <label className="col-xs-12 col-sm-3">
                        Телефон
                    </label>

                    <div className="col-xs-12 col-sm-6">
                          {phone}
                    </div>

                  </div>

                  <div className="form-group row">
                    <label className="col-xs-12 col-sm-3">
                        Комментарий
                    </label>

                    <div className="col-xs-12 col-sm-6">
                        {comment}
                    </div>

                  </div>

                  <div className="text-right">
                    <i className="fa fa-times text-red"></i>
                    <button className="not-button ms2_link" onChange={this.orderClean}>
                        <span className="on-page-act">Очистить форму</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>
        </>
        )
    }
}