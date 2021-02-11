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
              value={this.props.State.FilterVendorCode}
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

    renderEmptyPageSelect()
    {
        const OptionList = this.prepareOptionList(this.props.State.EmptyPageOptionList, 'Caption');

        return (
            <BaseSelect
                key="EmptyPageSelect"
                value={this.props.State.FilterEmptyPage}
                OptionList={OptionList}
                onChange={(Value) => {
                    this.props.setStoreField('FilterEmptyPage', Value);
                }}
            />
        );
    }

    renderDoupletSelect()
    {
        const OptionList = this.prepareOptionList(this.props.State.DoupletOptionList, 'Caption');

        return (
            <BaseSelect
                key="DoupletSelect"
                value={this.props.State.FilterDouplet}
                OptionList={OptionList}
                onChange={(Value) => {
                    this.props.setStoreField('FilterDouplet', Value);
                }}
            />
        );
    }

    renderIsCatalogProductSelect()
    {
        const OptionList = this.prepareOptionList(this.props.State.CatalogProductOptionList, 'Caption');

        return (
            <BaseSelect
                key="IsCatalogProductSelect"
                value={this.props.State.FilterIsCatalogProduct}
                OptionList={OptionList}
                onChange={(Value) => {
                    this.props.setStoreField('FilterIsCatalogProduct', Value);
                }}
            />
        );
    }

    renderVendorSelect()
    {
        const OptionList = this.prepareOptionList(this.props.State.VendorOptionList, 'VendorName');

        return (
            <BaseSelect
                key="VendorSelect"
                value={this.props.State.FilterVendorID}
                OptionList={OptionList}
                DefaultCaption="Не выбрано"
                DefaultValue="0"
                onChange={(Value) => {
                    this.props.setStoreField('FilterVendorID', Value);
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


    renderCreateProductCartButton(Row)
    {
        return (
            <td>
              <button
                className="btn btn-light"
                onClick={() => {
                    this.props.sendCreatePageFromTyre(Row.id)
                }}
                >Создать</button>
            </td>
        )
    }

    renderProductCartLink(Row)
    {
        const UrlArray = [
            'adminka/?a=resource/update&id=',
            Row.ProductID
        ];

        const Url = UrlArray.join('');

        return (
            <td><a href={Url} target="blank_">{Row.ProductID}</a></td>
        )
    }

    renderActionAlias(Row)
    {
        if (Row.Alias == '') {
            return this.renderCreateProductCartButton(Row);
        } else {
            return this.renderProductCartLink(Row);
        }
    }


    render()
    {
        const DataSet = this.props.State.TableDataSet;

        const ColumnList = this.props.State.ColumnList;

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
                if (Col == 'Alias') {
                    return this.renderActionAlias(Row);
                } else {
                    return this.renderColumn(Row[Col], 'col_' + i + '_' + j);
                } 
            });

            return (
                <tr key={'row_' + i}>

                    {Data}

                </tr>
            )
        });

        const VendorCodeInput = this.renderVendorCodeInput();
        
        const DoupletSelect = this.renderDoupletSelect();
        const EmptyPageSelect = this.renderEmptyPageSelect();
        const IsCatalogProductSelect = this.renderIsCatalogProductSelect();
        const VendorSelect = this.renderVendorSelect();

        const RightButton = this.renderNextButton();
        const LeftButton = this.renderPrevButton();

        return (
            <>
            <div className="block-content block-content-full">

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
                        <label htmlFor="">Дубли</label>
                    </div>
                    
                    <div className="col-12 col-sm-6">
                    {DoupletSelect}
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-12 col-sm-3">
                        <label htmlFor="">Наличие страницы</label>
                    </div>
                    
                    <div className="col-12 col-sm-6">
                    {EmptyPageSelect}
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-12 col-sm-3">
                        <label htmlFor="">Наличие в каталоге</label>
                    </div>
                    
                    <div className="col-12 col-sm-6">
                    {IsCatalogProductSelect}
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-12 col-sm-3">
                        <label htmlFor="">Производитель</label>
                    </div>
                    
                    <div className="col-12 col-sm-6">
                    {VendorSelect}
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