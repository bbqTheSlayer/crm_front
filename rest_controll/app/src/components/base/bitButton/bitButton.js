import React, { Component } from 'react';

export default class BitButton extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            Id: this.getId(this.props.Id),
            Type: this.getType(this.props.Type)
        };
    }

    getId(Id)
    {
        if (typeof Id == 'undefined') {
            Id = 0;
        }

        return parseInt(Id);
    }

    getType(Type)
    {
        if (typeof Type == 'undefined') {
            Type = 'edit';
        }

        return Type;
    }

    handleClick()
    {
        this.props.onClick(this.state.Id);
    }

    getTextByType(Type)
    {
        const Dict = {
            edit: 'far fa-edit',
            right: 'fa fa-arrow-alt-circle-right',
            left: 'fa fa-arrow-alt-circle-left'
        };

        return Dict[Type];
    }

    render()
    {

        let ClassArray = [
            ''
        ];

        ClassArray.push(this.getTextByType(this.state.Type));

        const ClassString = ClassArray.join(' ');

        return (
            <button
              key={this.props.KeyProp}
              className="btn btn-light"
              onClick={() => {
                  this.handleClick();
              }}
              >
                  <i className={ClassString}></i>
              </button>
        )
    }

}