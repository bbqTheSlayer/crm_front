import axios from 'axios';
import React, {Component} from 'react';

import { findDOMNode } from 'react-dom';

import BitButton from '../bitButton/bitButton';

import BaseTextInput from '../textInput';

import BaseSelect from '../select';


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

    renderCitySearchInput()
    {
        return (
            <CitySearchInput
              value={this.state.SearchInputValue}
              onChange={(e) => this.handleSearchInput(e)}
            />
        );
    }

    renderCitySelect()
    {
        return <CitySelect
                  cityList={this.state.cityList}
                 />
    }


    renderPrevButton()
    {
        let disClass = '';

        if (this.state.offset === 0) {
            disClass = 'disabled';
        }

        return (
            <button className="btn btn-light" onClick={() => {this.decrOffset()}}>Назад</button>
        )
    }

    renderNextButton()
    {
        return (
            <button className="btn btn-light" onClick={() => {this.incrOffset()}}>Далее</button>
        )
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

    renderSearchInput()
    {
        return (
            <BaseTextInput
              key="SearchInput"
              value={this.props.Store.SearchString}
              onChange={(Value) => {
                this.props.setStoreField('SearchString', Value);
              }}
              />
        )
    }

    renderColumn(Value, key)
    {
        return (
            <td key={key}>{Value}</td>
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

    renderFilterRegionSelect()
    {
        const OptionList = this.prepareOptionList(this.props.Store.RegionList, 'Region');

        return (
            <BaseSelect
                key="FilterRegionSelect"
                value={this.props.Store.editor.FilterRegionID}
                OptionList={OptionList}
                onChange={(Value) => {
                    this.props.setStoreField('FilterRegionID', Value);
                }}
            />
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

        const SearchInput = this.renderSearchInput();
        const FilterRegionSelect = this.renderFilterRegionSelect();

        const RightButton = this.renderNextButton();
        const LeftButton = this.renderPrevButton();

        return (
            <>
            <div className="block-content block-content-full">
                <div className="row form-group">
                    <div className="col-12 col-sm-3">
                        <label htmlFor="">Регион</label>
                    </div>

                    <div className="col-12 col-sm-6">
                    {FilterRegionSelect}
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-12 col-sm-3">
                        <label htmlFor="">Город</label>
                    </div>

                    <div className="col-12 col-sm-6">
                    {SearchInput}
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-12 col-sm-6">
                    
                    </div>

                    <div className="col-12 col-sm-6 text-right">
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