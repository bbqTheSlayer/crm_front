import React, { Component } from 'react';

export default class BaseSelect extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            // OptionList: this.getOptionList(this.props.OptionList)
        };
    }

    getOptionList(OptionList)
    {
        if (typeof OptionList == 'undefined') {
            OptionList = [];
        }

        return OptionList;
    }

    handleChange(e)
    {
        this.props.onChange(e.target.value);
    }

    renderEmptyOption()
    {
        return (
            <option key={0} value="0">Не выбрано</option>
        )
    }

    renderSelected(Val, Caption, key)
    {
        return (
            <option selected key={key} value={Val}>{Caption}</option>
        )
    }

    renderStandart(Val, Caption, key)
    {
        return (
            <option key={key} value={Val}>{Caption}</option>
        )
    }

    render()
    {
        let ClassArray = [
            'form-control'
        ];

        const ClassString = ClassArray.join(' ');

        const OptionList = this.getOptionList(this.props.OptionList);

        let Options = OptionList.map((Option, i) => {
            if (this.props.value === parseInt(Option.Value)) {
                return this.renderSelected(Option.Value, Option.Caption, i+1);
            } else {
                return this.renderStandart(Option.Value, Option.Caption, i+1);
            }
        });
        
        Options.unshift(this.renderEmptyOption());

        return (
            <select
              className={ClassString}
              value={this.props.value}
            //   value={}
            //   value={this.state.value}
              onChange={(e) => {
                this.handleChange(e);
              }}
              >
                  {Options}
              </select>
        )
    }

}