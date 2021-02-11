
import React, { Component } from 'react';

export default class BaseRadio extends Component {

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
        this.props.getID(e.target.name);

    }

    render() {

        const OptionList = this.props.OptionList;

        const Options = OptionList.map((Row, i) => {

            const TotalPrice =  () => {
                if(Row.price == 0){
                    return 'Бесплатно';
                }else {
                    return Row.price;
                }
            }

            return  (
                <div data-d-type="pickup"  className="checkbox" key={i}>
                    <label className="pt15 border-panel col-form-label delivery input-parent block">
                        <input 
                        type="radio" 
                        onChange={(e) => {
                            this.changeHadler(e);
                            this.getElementId(e);
                        }}
                        id={Row.id}
                        key={i} 
                        value={Row.id}
                        name={this.props.name}
                        />&nbsp;{Row.name}
                        <p className="small">
                            {TotalPrice()}
                        </p>
                    </label>
                </div>
            )
        });

        return (
            <>
            {Options}
            </>
        )
    }
}