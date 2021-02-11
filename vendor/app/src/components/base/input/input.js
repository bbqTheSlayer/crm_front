
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
              id={this.props.id}
              onChange={(e) => {
                  this.changeHadler(e);
              }}
              value={this.props.value}
              />
        )
    }
}