import React, {Component} from 'react';
import BaseSelect from '../base/select';
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
        this.props.saveEditor();
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

    prepareCarList(List, CaptionField)
    {
        if (List.length === 0) {
            return List;
        }

        return List.map((Row) => {
            return {Value: parseInt(Row.id), Caption: Row[CaptionField]};
        });
    }

    renderSelectCarObject()
    {
        const OptionList = this.prepareCarList(this.props.Store.CarList, 'ModelName');
        return (
            <BaseSelect
                className="form-control"
                OptionList={OptionList}
                onChange={(Val) => {
                    this.props.setEditorField('CarObjectID', Val)
                }}
                value={this.props.Store.editor.CarObjectID}
            />
        );
    }

    prepareProductList(List, CaptionField)
    {
        if (List.length === 0) {
            return List;
        }

        return List.map((Row) => {
            return {Value: parseInt(Row.OID), Caption: Row[CaptionField]};
        });
    }

    renderSelectProductCatalog()
    {
        const OptionList = this.prepareProductList(this.props.Store.ProductList, 'Vendor');
        return (
            <BaseSelect
                className="form-control"
                OptionList={OptionList}
                onChange={(Val) => {
                    this.props.setEditorField('ProductOID', Val)
                }}
                value={this.props.Store.editor.ProductOID}
            />
        );
    }

    render()
    {
        const CarObject = this.renderSelectCarObject();
        const Product = this.renderSelectProductCatalog();
        const Notification = this.renderNotification();

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="row form-group">
                            <div className="col-xs-12 col-sm-3">
                                <label>Автомобиль</label>
                            </div>

                            <div className="col-xs-12 col-sm-6">
                                {CarObject}
                            </div>
                        </div>
                        
                        <div className="row form-group">
                            <div className="col-xs-12 col-sm-3">
                                <label>Продукт</label>
                            </div>

                            <div className="col-xs-12 col-sm-6">
                                {Product}
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
