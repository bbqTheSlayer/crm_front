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

    renderVendorCodeInput()
    {
        return (
            <BaseTextInput
              KeyProp="FilterVendorCodeInput"
              value={this.props.Store.FilterVendorCode}
              onChange={(Val) => {
                this.props.setStoreField('FilterVendorCode', Val);
              }}
              />
        )
    }

    renderProviderStorageSelect()
    {

        const OptionList = this.prepareOptionList(this.props.Store.ProviderStorageOptionList, 'Storage');

        return (
            <BaseSelect
              KeyProp="FilterProviderStorageSelect"
              value={this.props.Store.FilterProviderStorageID}
              OptionList={OptionList}
              onChange={(Val) => {
                this.props.setStoreField('FilterProviderStorageID', Val);
              }}
              />
        )
    }

    renderProductNameInput()
    {
        return (
            <BaseTextInput
              KeyProp="FilterProductNameInput"
              value={this.props.Store.FilterProductName}
              onChange={(Val) => {
                this.props.setStoreField('FilterProductName', Val);
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

    renderColumn(Value, key)
    {
        // if (typeof Value == 'string') {
        //     Value = Value.split('  ').join('&nbsp;&nbsp;');
        // }

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

        const Rows = DataSet.map((Row, i) => {            
            const Data = ColCodeList.map((Col, j) => {
                return this.renderColumn(Row[Col], 'col_' + i + '_' + j);
            });

            return (
                <tr key={'row_' + i}>

                    {Data}

                </tr>
            )
        });

        // const RegionSelect = this.renderRegionSelect();
        // const IsActiveSelect = this.renderIsActiveSelect();
        const VendorCodeInput = this.renderVendorCodeInput();
        const ProductNameInput = this.renderProductNameInput();
        const ProviderStorageSelect = this.renderProviderStorageSelect();

        const RightButton = this.renderNextButton();
        const LeftButton = this.renderPrevButton();

        return (
            <>
            <div className="block-content block-content-full">

                <div className="row form-group">
                    <div className="col-12 col-sm-3">
                        <label htmlFor="">Склад поставщика</label>
                    </div>
                    
                    <div className="col-12 col-sm-6">
                    {ProviderStorageSelect}
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-12 col-sm-3">
                        <label htmlFor="">Артикул</label>
                    </div>
                    
                    <div className="col-12 col-sm-6">
                    {VendorCodeInput}
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-12 col-sm-3">
                        <label htmlFor="">Название</label>
                    </div>
                    
                    <div className="col-12 col-sm-6">
                    {ProductNameInput}
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