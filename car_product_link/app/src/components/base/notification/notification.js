import React, { Component } from 'react';

export default class BaseNotification extends Component {

    constructor(props)
    {
        super(props);

        this.state = {};
    }

    changeHadler(e)
    {
        this.props.onChange(e);
    }

    getClassByType()
    {
        let code =  this.props.code;
        
        if(code === 200){
            return 'notifi-success';
        }

        if(code > 299){
            return 'notifi-error';
        }

        if(code === 250){
            return 'notifi-warning';
        }
    }

    render() {

        let classArray = [
            'notification-hidden'
        ];

        classArray.push(this.getClassByType());

        const classesString = classArray.join(' ');
        const Code = this.props.code;
        const Description = this.props.message;

        return  (
            <div className={classesString}  id="notification">
                <div className="row">
                    <div className=" col-sm-12">
                        <span className="h2 notifi-title">{Code}</span>
                    </div>

                    <div className="col-sm-12">
                        <div className="notifi-description">{Description}</div>
                    </div>
                </div>
            </div>

        )
    }
}