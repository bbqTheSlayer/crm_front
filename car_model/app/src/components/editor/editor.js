import React, {Component} from 'react';
import BaseInput from '../base/input';
import BaseSelect from '../base/select';
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

    renderNotification(){
        const responseObject = this.props.Store.response;
        return (
            <BaseNotification
            responseObject={responseObject}
            />
        );
    }

    renderNameInput()
    {
        return (
          <BaseInput
            className="form-control"
            placeholder="Название"
            onChange={(Val) => {
                this.props.setEditorField("Name", Val)
            }}
            id="editor-name"
            value={this.props.Store.editor.Name}
            />
        )
    }

    renderOIDInput()
    {
        return (
          <BaseInput
            className="form-control"
            placeholder="OID"
            onChange={(Val) => {
                this.props.setEditorField("OID", Val)
            }}
            id="editor-oid"
            value={this.props.Store.editor.OID}
            />
        )
    }

    prepareOptionList(List, CaptionField)
    {
        if (List.length === 0) {
            return List;
        }

        return List.map((Row) => {
            return {Value: parseInt(Row.OID), Caption: Row[CaptionField]};
        });
    }

    renderSelect()
    {
        const OptionList = this.prepareOptionList(this.props.Store.OptionList, 'Name');
        return (
            <BaseSelect
                className="form-control"
                OptionList={OptionList}
                onChange={(Val) => {
                    this.props.setEditorField('CarModelFamilyOID', Val)
                }}
                id="editor-family"
                value={this.props.Store.editor.CarModelFamilyOID}
            />
        );
    }

    render()
    {
        const NameInput = this.renderNameInput();
        const OIDInput = this.renderOIDInput();
        const FamilySelect = this.renderSelect();
        const Notification = this.renderNotification();

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="row form-group">
                            <div className="col-xs-12 col-sm-3">
                                <label>Семейство</label>
                            </div>

                            <div className="col-xs-12 col-sm-6">
                                {FamilySelect}
                            </div>
                        </div>
                        
                        <div className="row form-group">
                            <div className="col-xs-12 col-sm-3">
                                <label>OID</label>
                            </div>

                            <div className="col-xs-12 col-sm-6">
                                {OIDInput}
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-xs-12 col-sm-3">
                                <label>Модель</label>
                            </div>

                            <div className="col-xs-12 col-sm-6">
                                {NameInput}
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
