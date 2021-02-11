
import React, { Component } from 'react';

export default class BaseTextArea extends Component {

    constructor(props)
    {
        super(props);

        this.state = {

        };
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
            <textarea
                className={this.props.className}
                id={this.props.id}
                placeholder={this.props.placeholder}
                onChange={(e) => {
                    this.changeHadler(e);
                    this.getElementId(e);
                }}
                value={this.props.value}
            >    
            </textarea>
        )
    }
}