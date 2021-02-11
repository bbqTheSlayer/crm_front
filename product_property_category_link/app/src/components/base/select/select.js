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
        const Caption = this.getDefaultCaption();

        const Val = this.getDefaultValue();

        return (
        <option key={0} value={Val}>{Caption}</option>
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

    getDefaultCaption()
    {
        if (   (typeof this.props.DefaultCaption == 'string')
            && (this.props.DefaultCaption != '')
        ) {
            return this.props.DefaultCaption;
        } else {
            return '';
        }
    }

    getDefaultValue()
    {
        if (typeof this.props.DefaultValue == 'string') {
            return this.props.DefaultValue;
        } else {
            return '';
        }
    }

    getKey()
    {
        if (typeof this.props.key == 'string') {
            this.props.key;
        } else {
            return '';
        }
    }

    getDisabled()
    {
        if (   (typeof this.props.isDisabled == 'boolean')
        ) {
            return this.props.isDisabled;
        } else {
            return false;
        }
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

        if (this.getDefaultCaption().length > 0) {
            Options.unshift(this.renderEmptyOption());
        }

        return (
            <select
              key={this.getKey}
              className={ClassString}
              disabled={this.getDisabled()}
              value={this.props.value}
              onChange={(e) => {
                this.handleChange(e);
              }}
              >
                  {Options}
              </select>
        )
    }

}