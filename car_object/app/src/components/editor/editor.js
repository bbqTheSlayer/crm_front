import React, {Component} from 'react';
import BaseInput from '../base/input';
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

    prepareOptionList(List, CaptionField)
    {
        if (List.length === 0) {
            return List;
        }

        return List.map((Row) => {
            return {Value: parseInt(Row.OID), Caption: Row[CaptionField]};
        });
    }

    renderModelSelect()
    {
        const OptionList = this.prepareOptionList(this.props.Store.ModelDataSet, 'Name');
        return (
            <BaseSelect
                className="form-control"
                OptionList={OptionList}
                onChange={(Val) => {
                    this.props.setEditorField('CarModelID', Val)
                }}
                id="editor-model"
                value={this.props.Store.editor.CarModelID}
            />
        );
    }

    renderFamilySelect()
    {
        const OptionList = this.prepareOptionList(this.props.Store.FamilyDataSet, 'Name');
        return (
            <BaseSelect
                className="form-control"
                OptionList={OptionList}
                onChange={(Val) => {
                    this.props.setEditorField('CarModelFamilyID', Val)
                }}
                id="editor-family"
                value={this.props.Store.editor.CarModelFamilyID}
            />
        );
    }

    renderBrandSelect()
    {
        const OptionList = this.prepareOptionList(this.props.Store.BrandDataSet, 'Name');
        return (
            <BaseSelect
                className="form-control"
                OptionList={OptionList}
                onChange={(Val) => {
                    this.props.setEditorField('CarBrandID', Val)
                }}
                id="editor-brand"
                value={this.props.Store.editor.CarBrandID}
            />
        );
    }

    render()
    {
        const EditModel = this.renderModelSelect();
        const EditFamily = this.renderFamilySelect();
        const EditBrand = this.renderBrandSelect();
        const Notification = this.renderNotification();

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="row form-group">
                            <div className="col-xs-12 col-sm-3">
                                <label>Марка</label>
                            </div>

                            <div className="col-xs-12 col-sm-6">
                                {EditBrand}
                            </div>
                        </div>
                        
                        <div className="row form-group">
                            <div className="col-xs-12 col-sm-3">
                                <label>Семейство</label>
                            </div>

                            <div className="col-xs-12 col-sm-6">
                                {EditFamily}
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-xs-12 col-sm-3">
                                <label>Модель</label>
                            </div>

                            <div className="col-xs-12 col-sm-6">
                                {EditModel}
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
