import React, { Component } from 'react';

import BitButton from '../base/bitButton';

export default class DSNavigator extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {};
    }

    render()
    {
        return (
        <>
        <div className="row form-group text-right">
            <div className="col-xs-12 col-sm-12 text-right">
                <span className="dec-offset">
                    <button onClick={this.props.loadPrev}
                            className="btn btn-light"><i className="fa fa-arrow-alt-circle-left"></i></button>
                </span>

                {/* <input
                  className="form-control"
                  value={parseInt(this.props.Offset) + 1}
                  onChange={(Val) => {
                    this.props.setStoreField('Offset', Val);
                  }}
                  ></input> */}

                <span className="inc-offset">
                    <button onClick={this.props.loadNext}
                            className="btn btn-light">
                            <i className="fa fa-arrow-alt-circle-right"
                              ></i>
                    </button>
                </span>
            </div>
        </div>
        </>
        )
    }
}