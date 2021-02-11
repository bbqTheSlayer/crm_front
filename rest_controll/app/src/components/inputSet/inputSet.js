import React, { Component } from 'react';

import BaseInput from '../base/input';

import BaseSelect from '../base/select';


export default class InputSet extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {};
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


    getSafeDataList(DataList)
    {
        if (typeof DataList == 'object') {
            return DataList;
        } else {
            return [];
        }
    }


    createSelect(Control)
    {
        const OptionList = this.prepareOptionList(
            this.getSafeDataList(this.props.State[Control.DataSet]),
            Control.CaptionFieldName
        );

        return (
            <BaseSelect
              className="form-control"
              key={Control.CurrentValueVar}
              OptionList={OptionList}
              DefaultCaption={Control.DefaultCaption}
              DefaultValue={Control.DefaultValue}
              isDisabled={Control.disabled}
              value={this.props.State[Control.CurrentValueVar]}
              onChange={(Val) => {
                //   console.log(Control.CurrentValueVar);
                  this.props.setStoreField(Control.CurrentValueVar, Val);
              }}
              />
        );
    }


    renderSelect(Control, i)
    {
        const Component = this.createSelect(Control);

        return (
            <div className="row form-group" key={'filter_component_' + i}>
                <div className="col-12 col-sm-3">
                    <label htmlFor="">{Control.Label}</label>
                </div>
                    
                <div className="col-12 col-sm-6">
                    {Component}
                </div>
            </div>
        )
    }


    renderInput(Control, i)
    {
        const Component = this.createInput(Control);

        return (
            <div className="row form-group" key={'filter_component_' + i}>
                <div className="col-12 col-sm-3">
                    <label htmlFor="">{Control.Label}</label>
                </div>

                <div className="col-12 col-sm-6">
                    {Component}
                </div>
            </div>
        )
    }

    createInput(Control)
    {
        return (
            <BaseInput
              key={Control.CurrentValueVar}
              value={this.props.State[Control.CurrentValueVar]}
              onChange={(Val) => {
                this.props.setStoreField(Control.CurrentValueVar, Val);
              }}
              />
        )
    }


    getFieldList()
    {
        if (typeof this.props.FieldConfig == 'object') {
            return this.props.FieldConfig;
        } else {
            return [];
        }
    }


    renderFilterSet()
    {
        const FieldList = this.getFieldList();

        return FieldList.map((Row, i) => {
            switch (Row.type) {
                case 'select':
                    return this.renderSelect(Row, i);

                case 'input':
                    return this.renderInput(Row, i);
            }
        });
    }



    render()
    {
        const Filters = this.renderFilterSet();

        return(
            <>
            {Filters}
            </>
        )
    }

}