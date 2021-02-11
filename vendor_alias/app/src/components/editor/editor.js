import React, {Component} from 'react';
import BaseSelect from '../base/select';
import BaseInput from '../base/input';
import BaseNotification from '../base/notification';

export default class Editor extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    clickSaveEditor()
    {
        this.props.checkEditorEmpty();
    }

    clickClearEditor()
    {
        this.props.clearEditor();
    }

    setStoreField(e)
    {
        this.props.setStoreField(e.target.value);
    }
    
    renderInputName()
    {
        return (
            <BaseInput
              className="form-control"
              placeholder="Название"
              onChange={(Val) => {
                  this.props.setEditorField('VendorAlias', Val);
              }}
              id="editor-input"
              value={this.props.Store.editor.VendorAlias}
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

    prepareOptionList(List, CaptionField)
    {
        if (List.length === 0) {
            return List;
        }

        return List.map((Row) => {
            return {Value: parseInt(Row.id), Caption: Row[CaptionField]};
        });
    }

    renderVendorSelect()
    {
        const OptionList = this.prepareOptionList(this.props.Store.OptionList, 'VendorName');
        return (
            <BaseSelect
                className="form-control"
                editor={this.props.Store.editor}
                OptionList={OptionList}
                onChange={(Val) => {
                    this.props.setEditorField('VendorID', Val);
                }}
                id="editor-select"
                value={this.props.Store.editor.VendorID}
            />
        );
    }

    render()
    {
        const Select = this.renderVendorSelect();
        const Input = this.renderInputName();
        const Notification = this.renderNotification();

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="row form-group">
                            <div className="col-xs-12 col-sm-3">
                                <label>Производитель</label>
                            </div>

                            <div className="col-xs-12 col-sm-6">
                                {Select}
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-xs-12 col-sm-3">
                                <label>Псевдоним</label>
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
                                  className="btn btn-success col-sm-12">Применить</button>
                            </div>
                        </div>

                        <div className="row pt10">
                            <div className="col-xs-12 col-sm-6 offset-sm-3">
                                <button
                                  onClick={() => {
                                    this.clickClearEditor();
                                  }}
                                  id="clear-editor"
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