import React, { Component } from 'react';

export default class BaseCheckbox extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {};
    }

    handleChange()
    {
        this.props.onChange();
    }

    render()
    {
        let ClassArray = [
            'form-control'
        ];

        const ClassString = ClassArray.join(' ');

        return (
            <div>
                <label>
                  <input
                    key={this.props.KeyProp}
                    type="checkbox"
                    onChange={() => {
                        this.handleChange();
                    }}
                  checked={this.props.checked}
                  /> {this.props.Caption}
                </label>
            </div>
        )
    }

}