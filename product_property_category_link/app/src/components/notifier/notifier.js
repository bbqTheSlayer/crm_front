import React, { Component } from 'react';

export default class Notifier extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {};
    }


    getString(Param)
    {
        if (typeof Param == 'string') {
            return Param;
        } else {
            return '';
        }
    }

    renderNotificationList()
    {
        const NotifyList = this.props.NotifyList;

        return NotifyList.map((Item, i) => {
            return this.renderNotification(Item, i);
        });
    }

    renderNotification(Item, Index)
    {
        let ClassList = ['notify'];

        ClassList.push('notify-' + Item.type);

        let Now = new Date();

        const ClassString = ClassList.join(' ');

        const Headline = this.getString(Item.Headline);

        const Message = this.getString(Item.Message);

        return (
        <div id="notification"
             key={'notification_' + Now.getTime()} 
             className={ClassString}>
          <div className="row">
            <div className="col-sm-12"><span className="h2 notify-title">{Headline}</span></div>
            <div className="col-sm-12"><span className="notify-description">{Message}</span></div>
          </div>
        </div>
        )
    }

    render()
    {
        const NotifySet = this.renderNotificationList();

        return (
            <>
            {NotifySet}
            </>
        )
    }
}