import axios from 'axios';
import React, {Component} from 'react';

export default class CitySearchInput extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            value: '',
            class: 'form-control',
            placeholder: 'Город',
        };
    }

    handleChange(event)
    {
        this.props.onChange(event);

        this.setState({value: event.target.value});
    }

    render()
    {
        return (
            <input
              type="text"
              value={this.props.value}
              className={this.state.class}
              placeholder={this.state.placeholder}
              onChange={(e) => this.handleChange(e)}
              />
        );
    }
}