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
        this.props.saveEditor();
    }

    clickClearEditor()
    {
        this.props.clearEditor();
    }
    
    renderInputRegion()
    {
        return (
            <BaseInput
              className="form-control"
              placeholder="Название"
              onChange={(Val) => {
                  this.props.setEditorField('Region', Val);
              }}
              value={this.props.Store.editor.Region}
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

    renderRegionSelect()
    {
        const OptionList = this.prepareOptionList(this.props.Store.OptionList, 'District');
        return (
            <BaseSelect
                className="form-control"
                editor={this.props.Store.editor}
                OptionList={OptionList}
                onChange={(Val) => {
                    this.props.setEditorField('DistrictID', Val)
                }}
                value={this.props.Store.editor.DistrictID}
            />
        );
    }

    render()
    {

        const Select = this.renderRegionSelect();
        const Input = this.renderInputRegion();
        const Notification = this.renderNotification();

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="row form-group">
                            <div className="col-xs-12 col-sm-3">
                                <label>Регион</label>
                            </div>

                            <div className="col-xs-12 col-sm-6">
                                {Input}
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-xs-12 col-sm-3">
                                <label>Округ</label>
                            </div>

                            <div className="col-xs-12 col-sm-6 promo-text">
                                {Select}
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