import React, {Component} from 'react';

import BitButton from '../base/bitButton';

import BaseTextInput from '../base/textInput';

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

    renderCitySearchInput()
    {
        return (
            <CitySearchInput
              value={this.state.citySearchInputValue}
              onChange={(e) => this.handleCitySearchInput(e)}
            />
        );
    }

    renderPrevButton()
    {
        let disClass = '';

        if (this.state.offset === 0) {
            disClass = 'disabled';
        }

        return (
            <button className="btn btn-light" onClick={() => {this.decrOffset()}}>Назад</button>
        )
    }

    renderNextButton()
    {
        return (
            <button className="btn btn-light" onClick={() => {this.incrOffset()}}>Далее</button>
        )
    }

    changeLimit(e)
    {
        let CurrentLimit = this.state.limit;

        let NewState = {
            limit: parseInt(e.target.value)
        }

        this.setState(NewState);

        this.reloadCityList();
    }

    renderEditButton(i)
    {
        return (
            <BitButton
              Type="edit"
              Id={i}
              onClick={(i) => {
                  this.props.setRecId(i);
              }}
              />
        )
    }

    renderNextButton()
    {
        return (
            <BitButton
              Type="right"
              Id={0}
              onClick={() => {
                this.props.loadNext();
              }}
              />
        )
    }

    renderCityInput()
    {
        return (
            <BaseTextInput
              key="CityInput"
              value={this.props.Store.editor.City}
              onChange={(Value) => {
                  this.props.setEditorField('City', Value);
              }}
              />
        );
    }

    prepareRegionList() {
        const RegionList = this.props.Store.RegionList;

        if (RegionList.length === 0) {
            return RegionList;
        }

        return RegionList.map((Row) => {
            return {Value: Row.id, Caption: Row.Region};
        });
    }

    renderRegionSelect()
    {
        const OptionList = this.prepareRegionList();

        return (
            <BaseSelect
                key="RegionSelect"
                value={this.props.Store.editor.RegionID}
                OptionList={OptionList}
                onChange={(Value) => {
                    this.props.setEditorField('RegionID', Value);
                }}
            />
        )
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


    renderIsPopularCbx()
    {
        return (
            <BaseCheckbox
              KeyProp="IsPopularCheckbox"
              checked={this.props.Store.editor.IsPopular}
              Caption="Популярный"
              onChange={() => {
                this.props.setEditorField('IsPopular', !this.props.Store.editor.IsPopular);
              }}
              />
        );
    }

    renderCapitalDistanceInput()
    {
        return (
            <BaseTextInput
              key="CapitalDistanceInput"
              value={this.props.Store.editor.CapitalDistance}
              onChange={(Value) => {
                  this.props.setEditorField('CapitalDistance', Value);
              }}
              />
        );
    }

    render()
    {
        const CityInput = this.renderCityInput();
        
        const RegionSelect = this.renderRegionSelect();

        const IsActiveCbx = this.renderIsActiveCbx();

        const IsPopularCbx = this.renderIsPopularCbx();

        const CapitalDistanceInput = this.renderCapitalDistanceInput();

        return (
            <>
            <div className="block-header">
              <h3 className="block-title">Редактор</h3>
            </div>

            <div className="block-content block-content-full">
              <div className="col-12">
                <div className="row form-group">
                    <div className="col-12 col-sm-3">
                    <label htmlFor="">Город</label>
                    </div>

                    <div className="col-12 col-sm-6">
                    {CityInput}
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
                    <label htmlFor="">Регион</label>
                    </div>

                    <div className="col-12 col-sm-6">
                    {CapitalDistanceInput}
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
                    <div className="col-12 col-sm-3">
                      <label htmlFor="">Популярный</label>
                    </div>

                    <div className="col-12 col-sm-6">
                    {IsPopularCbx}
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