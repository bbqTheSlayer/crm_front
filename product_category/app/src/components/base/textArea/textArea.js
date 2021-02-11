
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

    render() {
        return (
            <textarea
                className={this.props.className}
                placeholder={this.props.placeholder}
                onChange={(e) => {
                    this.changeHadler(e);
                }}
                value={this.props.value}
            >    
            </textarea>
        )
    }
}