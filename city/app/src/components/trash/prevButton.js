import axios from 'axios';
import React, {Component} from 'react';

export default class PreviousButton extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            disableClass: props.disClass,
        };
    }

    handleChange(event)
    {
        this.props.onChange(event);

        this.setState({disableClass: this.props.disableClass});
    }


    render()
    {
        const ClsSet = [
            'btn',
            'btn-light'
        ];

        ClsSet.push(this.state.disableClass);

        let Classes = ClsSet.join(' ');

        return (
            <button className={Classes} >Назад</button>
        );
    }
}