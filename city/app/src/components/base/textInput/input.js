import React, { Component } from 'react';

export default class BaseTextInput extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            // value: this.getValue(this.props.value)
        };
    }

    getValue(Value)
    {
        if (typeof Value == 'undefined') {
            Value = '';
        }

        return Value;
    }

    handleChange(e)
    {
        this.props.onChange(e.target.value);
    }

    render()
    {
        let ClassArray = [
            'form-control'
        ];

        const ClassString = ClassArray.join(' ');

        return (
            <input
              className={ClassString}
            //   value={this.state.value}
              onChange={(e) => {
                this.handleChange(e);
              }}
              value={this.props.value}
              ></input>
        )
    }

}