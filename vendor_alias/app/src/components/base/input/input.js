
import React, { Component } from 'react';

export default class BaseInput extends Component {

    constructor(props)
    {
        super(props);

        this.state = {};
    }

    changeHadler(e)
    {
        this.props.onChange(e.target.value);
    }

    render() {
        return (
            <input
              className={this.props.className}
              placeholder={this.props.placeholder}
              onChange={(e) => {
                  this.changeHadler(e);
              }}
              id={this.props.id}
              value={this.props.value}
              />
        )
    }
}