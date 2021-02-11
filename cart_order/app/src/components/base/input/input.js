
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
    
    getElementId(e)
    {
        this.props.getID(e.target.id);

    }

    render() {
        return (
            <input
              className={this.props.className}
              id={this.props.id}
              name={this.props.name}
              typeof={this.props.typeof}
              placeholder={this.props.placeholder}
              onKeyUp={(e) => {
                  this.changeHadler(e);
                  this.getElementId(e);
              }}
              />
        )
    }
}