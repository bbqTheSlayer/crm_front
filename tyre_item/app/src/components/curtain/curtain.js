import React, { Component } from 'react';

export default class Curtain extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {

        };
    }

    renderCurtain(ContainerId, Visible = false)
    {
        let ClassList = ['universal-curtain'];

        const StateClass = Visible ? 'curtain-shown' : 'curtain-hidden';

        ClassList.push(StateClass);

        const ClassString = ClassList.join(' ');

        return (
            <div className={ClassString}
                 key={ContainerId}
                 >
              <button
                onClick={this.props.setStoreField('ActiveCurtain', '')}
                >Закрыть</button>

              <div id={ContainerId}></div>

            </div>
        );
    }

    render()
    {
        // const CurtainList = this.props.State.CurtainList;

        // const ActiveCurtain = this.props.State.ActiveCurtain;

        // const Curtains = CurtainList.map((Row, i) => {
        //     let Visible = Row.IdName == ActiveCurtain ? true : false;

        //     return this.renderCurtain(Row.IdName, Visible);
        // });

        return (
            <>
            {/* {Curtains} */}
            </>
        );
    }
}