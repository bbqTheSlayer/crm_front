import React, {Component} from 'react';

// import BitButton from '../base/bitButton';

// import BaseTextInput from '../base/textInput';

import BaseSelect from '../base/select';

import BaseCheckbox from '../base/checkbox';

export default class Editor extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
        };
    }

    renderDeliverySelect()
    {
        const OptionList = this.prepareOptionList(this.props.Store.DeliveryOptionList, 'Delivery');

        return (
            <BaseSelect
                key="DeliverySelect"
                value={this.props.Store.editor.DeliveryID}
                OptionList={OptionList}
                onChange={(Value) => {
                    this.props.setEditorField('DeliveryID', Value);
                }}
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
        const OptionList = this.prepareOptionList(this.props.Store.RegionOptionList, 'Region');

        return (
            <BaseSelect
                key="RegionSelect"
                value={this.props.Store.RegionID}
                OptionList={OptionList}
                onChange={(Value) => {
                    this.props.setStoreField('RegionID', Value);
                }}
            />
        );
    }

    renderCitySelect()
    {
        const OptionList = this.prepareOptionList(this.props.Store.CityOptionList, 'City');

        return (
            <BaseSelect
                key="CitySelect"
                value={this.props.Store.editor.CityID}
                OptionList={OptionList}
                onChange={(Value) => {
                    this.props.setEditorField('CityID', Value);
                }}
            />
        );
    }

    renderIsActiveCbx()
    {
        return (
            <BaseCheckbox
              KeyProp="IsActiveCheckbox"
              checked={this.props.Store.editor.IsActive}
              Caption="Активен"
              onChange={() => {
                this.props.setEditorField('IsActive', !this.props.Store.editor.IsActive);
              }}
              />
        );
    }


    render()
    {
        
        const DeliverySelect = this.renderDeliverySelect();

        const RegionSelect = this.renderRegionSelect();

        const CitySelect = this.renderCitySelect();

        const IsActiveCbx = this.renderIsActiveCbx();

        return (
            <>
            <div className="block-header">
              <h3 className="block-title">Редактор</h3>
            </div>

            <div className="block-content block-content-full">
              <div className="col-12">

                <div className="row form-group">
                    <div className="col-12 col-sm-3">
                    <label htmlFor="">Способ получения</label>
                    </div>

                    <div className="col-12 col-sm-6">
                    {DeliverySelect}
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-12 col-sm-3">
                    <label htmlFor="">Регион</label>
                    </div>

                    <div className="col-12 col-sm-6">
                    {RegionSelect}
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-12 col-sm-3">
                    <label htmlFor="">Город</label>
                    </div>

                    <div className="col-12 col-sm-6">
                    {CitySelect}
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-12 col-sm-3">
                    <label htmlFor="">Состояние</label>
                    </div>

                    <div className="col-12 col-sm-6">
                    {IsActiveCbx}
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-12 col-sm-6 offset-sm-3">
                    <button
                        key="ConfirmationBtn"
                        onClick={() => {
                            this.props.saveEditor();
                        }}
                        className="btn btn-success btn-block">Сохранить</button>
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-12 col-sm-6 offset-sm-3">
                    <button
                        key="ClearBtn"
                        onClick={() => {
                            this.props.clearEditor();
                        }}
                        className="btn btn-light btn-block">Сбросить</button>
                    </div>
                </div>

              </div>
            </div>
            </>
        )
    }
}