import React, {Component} from 'react';
import BaseInput from '../base/input';
import BaseNotification from '../base/notification';

export default class Editor extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    clickSaveEditor()
    {
        this.props.saveEditor();
    }

    clickClearEditor()
    {
        this.props.clearEditor();
    }

    setStoreField(e)
    {
        this.props.setStoreField(e.target.value);
    }
    
    renderInputDistrict()
    {
        return (
            <BaseInput
              className="form-control"
              placeholder="Название"
              onChange={(Val) => {
                  this.props.setEditorField('District', Val);
              }}
              value={this.props.Store.editor.District}
              />
          )
    }

    renderNotification(){
        return (
            <BaseNotification
            code={this.props.Store.code}
            message={this.props.Store.message}
            />
        );
    }

    render()
    {

        const Input = this.renderInputDistrict();
        const Notification = this.renderNotification();

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="row form-group">
                            <div className="col-xs-12 col-sm-3">
                                <label>Название округа</label>
                            </div>

                            <div className="col-xs-12 col-sm-6">
                                {Input}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12 col-sm-6 offset-sm-3">
                                <button
                                  onClick={() => {
                                    this.clickSaveEditor();
                                  }}
                                  id="btn-alias-add"
                                  className="btn btn-success col-sm-12">Применить</button>
                            </div>
                        </div>

                        <div className="row pt10">
                            <div className="col-xs-12 col-sm-6 offset-sm-3">
                                <button
                                  onClick={() => {
                                    this.clickClearEditor();
                                  }}
                                  id="btn-alias-clear"
                                  className="btn btn-light col-sm-12">Очистить</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="InfoContainer">
                    {Notification}
                </div>
            </>
        )
    }
}