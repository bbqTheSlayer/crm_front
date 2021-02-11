import React, {Component} from 'react';

import BitButton from '../base/bitButton';

import BaseSelect from '../base/select';

import BaseTextInput from '../base/textInput';

export default class BaseTable extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            cityList: [],

            ColumnList: this.props.ColumnList,
        };
    }

    renderEditButton(i)
    {
        const KeyProp = 'edt_btn_' + i;

        return (
            <BitButton
              Type="edit"
              Id={i}
              key={KeyProp}
              onClick={(i) => {
                  this.props.setRecId(i);
              }}
              />
        )
    }

    renderNextButton()
    {
        return (
            <BitButton
              Type="right"
              Id={0}
              onClick={() => {
                this.props.loadNext();
              }}
              />
        )
    }

    renderPrevButton()
    {
        return (
            <BitButton
              Type="left"
              Id={0}
              onClick={() => {
                this.props.loadPrev();
              }}
              />
        )
    }

    prepareOptionList(List, CaptionField)
    {
        if (List.length === 0) {
            return List;
        }

        return List.map((Row) => {
            return {Value: parseInt(Row.id), Caption: Row[CaptionField]};
        });
    }

    renderRegionSelect()
    {
        const OptionList = this.prepareOptionList(this.props.Store.RegionOptionList, 'Region');

        return (
            <BaseSelect
                key="RegionSelect"
                value={this.props.Store.FilterRegionID}
                OptionList={OptionList}
                onChange={(Value) => {
                    this.props.setStoreField('FilterRegionID', Value);
                }}
            />
        );
    }

    renderIsActiveSelect()
    {
        const List = [
            {
                id: 2,
                Text: 'Любые'
            },{
                id: 1,
                Text: 'Активны'
            },{
                id: 0,
                Text: 'Не активны'
            }
        ]

        const OptionList = this.prepareOptionList(List, 'Text');

        return (
            <BaseSelect
                key="FilterIsActiveSelect"
                value={this.props.Store.FilterIsActive}
                OptionList={OptionList}
                onChange={(Value) => {
                    this.props.setStoreField('FilterIsActive', Value);
                }}
            />
        );
    }

    renderDeliverySelect()
    {
        const OptionList = this.prepareOptionList(this.props.Store.DeliveryOptionList, 'Delivery');

        return (
            <BaseSelect
                key="FilterDeliverySelect"
                value={this.props.Store.FilterDeliveryID}
                OptionList={OptionList}
                onChange={(Value) => {
                    this.props.setStoreField('FilterDeliveryID', Value);
                }}
            />
        );
    }

    renderCityInput()
    {
        return (
            <BaseTextInput
              
              />
        );
    }

    // renderSearchInput()
    // {
    //     return (
    //         <BaseTextInput
    //           key="SearchInput"
    //           value={this.props.Store.SearchString}
    //           onChange={(Value) => {
    //             this.props.setStoreField('SearchString', Value);
    //           }}
    //           />
    //     )
    // }

    renderColumn(Value, key)
    {
        return (
            <td key={key}>{Value}</td>
        )
    }

    render()
    {
        const DataSet = this.props.DataSet;

        const ColumnList = this.props.ColumnList;

        const Columns = [];

        const ColCodeList = [];

        for (let key in ColumnList) {
            Columns.push(ColumnList[key]);
            ColCodeList.push(key);
        }

        const HeaderColumns = Columns.map((Current, index) => {
            return (
                <th key={index}>{Current}</th>
            );
        });

        const ButtonsList = [
            'edit', 
        ]

        const Rows = DataSet.map((Row, i) => {
            const EditButton = this.renderEditButton(Row.id);
            
            const Data = ColCodeList.map((Col, j) => {
                return this.renderColumn(Row[Col], 'col_' + i + '_' + j);
            });

            return (
                <tr key={'row_' + i}>

                    {Data}

                    <td>
                    {EditButton}
                    </td>

                </tr>
            )
        });

        const RegionSelect = this.renderRegionSelect();
        const IsActiveSelect = this.renderIsActiveSelect();
        const DeliverySelect = this.renderDeliverySelect();

        const RightButton = this.renderNextButton();
        const LeftButton = this.renderPrevButton();

        return (
            <>
            <div className="block-content block-content-full">
                <div className="row form-group">
                    <div className="col-12 col-sm-3">
                        <label htmlFor="">Активны</label>
                    </div>
                    
                    <div className="col-12 col-sm-6">
                    {IsActiveSelect}
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-12 col-sm-3">
                        <label htmlFor="">Регион</label>
                    </div>
                    
                    <div className="col-12 col-sm-6">
                    {RegionSelect}
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-12 col-sm-3">
                        <label htmlFor="">Доставка</label>
                    </div>
                    
                    <div className="col-12 col-sm-6">
                    {DeliverySelect}
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 text-right">
                    {LeftButton}&nbsp;{RightButton}
                    </div>
                </div>
            </div>

            <div className="block-content block-content-full">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            {HeaderColumns}
                            <th className="text-center">Действия</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Rows}
                    </tbody>
                </table>
            </div>
            </>
        )
    }
}