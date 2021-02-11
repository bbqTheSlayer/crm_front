import axios from 'axios';
import React, {Component} from 'react';

export default class CitySelect extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            value: '',
            class: 'form-control',
            cityList: [],
        };
    }

    handleChange(event)
    {
        this.props.onChange(event);

        this.setState({cityList: this.props.cityList});
    }

    render()
    {
        const cityList = this.state.cityList;

        const options = cityList.map((item, i) => {
            return (
                <option value={item.id}>{item.City}</option>
            )
        });

        return (
            <select
              className={this.state.class}
              >
                  <option value="">Город не указан</option>
                  {options}
            </select>
        );
    }
}