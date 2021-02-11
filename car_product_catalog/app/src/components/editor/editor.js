import React, {Component} from 'react';
import BaseInput from '../base/input';
import BaseNotification from '../base/notification';

export default class Editor extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    handleClick()
    {
        this.props.reloadList();
    }

    saveEditordHandler()
    {
        this.props.checkEditorEmpty();
    }

    clearEditorHandler()
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

    renderEditOID()
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

    renderEditVendorCode()
    {
        return (
          <BaseInput
            className="form-control"
            placeholder="Код"
            onChange={(Val) => {
                this.props.setEditorField("VendorCode", Val)
            }}
            id="editor-code"
            value={this.props.Store.editor.VendorCode}
            />
        )
    }

    renderEditVendor()
    {
        return (
            <BaseInput
              className="form-control"
              placeholder="Название"
              onChange={(Val) => {
                  this.props.setEditorField("Vendor", Val)
              }}
              id="editor-vendor"
              value={this.props.Store.editor.Vendor}
            />
        );
    }

    render()
    {
        const EditVendor = this.renderEditVendor();
        const EditVendorCode = this.renderEditVendorCode();
        const EditOID = this.renderEditOID();
        const Notification = this.renderNotification();

        return (
            <>
                <div className="row">
                    <div className="col-12">

                    <div className="row form-group">
                            <div className="col-xs-12 col-sm-3">
                                <label>OID</label>
                            </div>

                            <div className="col-xs-12 col-sm-6">
                                {EditOID}
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-xs-12 col-sm-3">
                                <label>Код</label>
                            </div>

                            <div className="col-xs-12 col-sm-6">
                                {EditVendorCode}
                            </div>
                        </div>
                        
                        <div className="row form-group">
                            <div className="col-xs-12 col-sm-3">
                                <label>Наименование</label>
                            </div>

                            <div className="col-xs-12 col-sm-6">
                                {EditVendor}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12 col-sm-6 offset-sm-3">
                                <button
                                  onClick={() => {
                                    this.saveEditordHandler();
                                  }}
                                  className="btn btn-success col-sm-12">Применить</button>
                            </div>
                        </div>

                        <div className="row pt10">
                            <div className="col-xs-12 col-sm-6 offset-sm-3">
                                <button
                                  onClick={() => {
                                    this.clearEditorHandler();
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
