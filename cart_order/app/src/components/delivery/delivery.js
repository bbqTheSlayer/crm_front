import React, {Component} from 'react';
import BaseInput from '../base/input';
import BaseSelect from '../base/select';
import BaseRadio from '../base/radio';

export default class Delivery extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    renderInputStreet()
    {
        return (
            <BaseInput
              className="form-control"
              id="street"
              placeholder="Улица"
              onChange={(Val) => {
                  this.props.setStoreField('Street', Val);
              }}
              getID={(Val) => {
                this.props.setStoreField('StreetID', Val);
              }}
              />
          )
    }

    renderInputBuilding()
    {
        return (
            <BaseInput
            className="form-control"
            id="building"
            placeholder="Дом"
            onChange={(Val) => {
              this.props.setStoreField('Building', Val);
            }}
            getID={(Val) => {
              this.props.setStoreField('BuildingID', Val);
            }}
            />
          )
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
        const OptionList = this.prepareOptionList(this.props.Store.RegionDataSet, 'Region');
        return (
            <BaseSelect
                className="form-control"
                id="region"
                editor={this.props.Store.editor}
                OptionList={OptionList}
                onChange={(Val) => {
                    this.props.setStoreField('Region', Val)
                }}
                getID={(Val) => {
                  this.props.setStoreField('RegionID', Val);
                }}
            />
        );
    }

    renderSitySelect()
    {
        const OptionList = this.prepareOptionList(this.props.Store.CityDataSet, 'City');
        return (
            <BaseSelect
                className="form-control"
                id="city"
                editor={this.props.Store.editor}
                OptionList={OptionList}
                onChange={(Val) => {
                    this.props.setStoreField('City', Val)
                }}
                getID={(Val) => {
                  this.props.setStoreField('CityID', Val);
                }}
            />
        );
    }

    renderDelvieryRadio()
    {
      const OptionList = this.props.Store.DeliveryDataSet;
        return (
            <BaseRadio
            name="delivery"
            OptionList={OptionList}
            onChange={(Val) => {
                this.props.setStoreField('Delivery', Val);
            }}
            getID={(Val) => {
              this.props.setStoreField('DeliveryID', Val);
            }}
            />
          )
    }

    render()
    {
        const region = this.renderRegionSelect();
        const city = this.renderSitySelect();
        const street = this.renderInputStreet();
        const building = this.renderInputBuilding();
        const delivery = this.renderDelvieryRadio();

        return (
        <>
        <div className="white-frame p15">
          <div className="row">
            <div className="col-lg-12">
              <h2>1. Способ получения</h2>
            </div>
    
            <div className="col-lg-12">    
              <div className="tab-content">
                  <div className="row">
                    <div className="col-xs-12 pt15 js-form-address">
                      <div id="DeliveryParametersHeadline"></div>

                      <div className="form-group row">
                        <label className="col-xs-12 col-sm-3">
                            Регион доставки
                        </label>
    
                        <div className="col-xs-12 col-sm-6">
                            {region}
                        </div>
    
                      </div>

                      <div className="form-group row">
                        <label className="col-xs-12 col-sm-3">
                            Город доставки
                        </label>
    
                        <div className="col-xs-12 col-sm-6">
                            {city}
                        </div>
    
                      </div>

                      <div className="form-group row">
                        <label className="col-xs-12 col-sm-3">
                            Способ получения
                        </label>
    
                        <div className="col-xs-12 col-sm-6">
                            {delivery}
                        </div>
    
                      </div>

                      <div className="form-group row">
                        <label className="col-xs-12 col-sm-3">
                            Улица
                        </label>
    
                        <div className="col-xs-12 col-sm-6">
                            {street}
                        </div>
    
                      </div>
    
                      <div className="form-group row">
                        <label className="col-xs-12 col-sm-3">
                            Дом
                        </label>
    
                        <div className="col-xs-12 col-sm-6">
                            {building}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
    
              </div>
          </div>
        </div>
        </>
        )
    }
}