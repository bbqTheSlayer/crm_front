import React, {Component} from 'react';
import BaseSelect from '../base/select';

export default class Table extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    handleClick()
    {
        this.props.reloadList();
        this.props.loadNext();
        this.props.loadPrev();
    }

    changeHadler(e)
    {
        this.props.EditProductLink(e);
    }

    prepareOptionList(List, CaptionField)
    {
        if (List.length === 0) {
            return List;
        }

        return List.map((Row) => {
            return {Value: parseInt(Row.OID), Caption: Row[CaptionField]};
        });
    }

    renderFilterBrand()
    {
        const OptionList = this.prepareOptionList(this.props.Store.BrandDataSet, 'Name');
        return (
            <BaseSelect
                className="form-control"
                OptionList={OptionList}
                onChange={(Val) => {
                    this.props.setStoreField('FilterBrand', Val)
                }}
            />
        );
    }

    renderFilterFamily()
    {
        const OptionList = this.prepareOptionList(this.props.Store.FamilyDataSet, 'Name');
        return (
            <BaseSelect
                className="form-control"
                OptionList={OptionList}
                onChange={(Val) => {
                    this.props.setStoreField('FilterModelFamily', Val)
                }}
            />
        );
    }

    renderFilterModel()
    {
        const OptionList = this.prepareOptionList(this.props.Store.ModelDataSet, 'Name');
        return (
            <BaseSelect
                className="form-control"
                OptionList={OptionList}
                onChange={(Val) => {
                    this.props.setStoreField('FilterModel', Val)
                }}
            />
        );
    }

    render()
    {
        const CarProductArray = this.props.Store.TableDataSet;
        const FilterBrand = this.renderFilterBrand();
        const FilterFamily = this.renderFilterFamily();
        const FilterModel = this.renderFilterModel();

        const Links = CarProductArray.map((Row, i) => {
            
            return  (
                <tr key={i}>
                    <td className="text-center">{Row.id}</td>
                    <td className="text-center">{Row.BrandName} {Row.ModelName}</td>
                    <td className="text-center" value={Row.ProductCatalogOID}>{Row.ProductName}</td>
                    <td className="text-center">{Row.CreateDate}</td>
                    <td className="text-center">
                        <button className="btn btn-light" onClick={(e) => {this.changeHadler(e)}} id={Row.id}><i className="fa fa-edit fw100" id={Row.id}></i></button>
                    </td>
                </tr>
            )
        });

        return (
            <>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row form-group">
                            <div className="col-12 col-sm-3">
                                <label htmlFor="">Марка</label>
                            </div>
                                
                            <div className="col-12 col-sm-6">
                                {FilterBrand}
                            </div>
                        </div>
  
                        <div className="row form-group">
                            <div className="col-12 col-sm-3">
                                <label htmlFor="">Семейство</label>
                            </div>

                            <div className="col-12 col-sm-6">
                                {FilterFamily}
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-12 col-sm-3">
                                <label htmlFor="">Модель</label>
                            </div>

                            <div className="col-12 col-sm-6">
                                {FilterModel}
                            </div>
                        </div>

                        <div className="row form-group text-right">
                            <div className="col-xs-12 col-sm-12 text-right">
                                <span className="dec-offset">
                                    <button onClick={this.props.loadPrev}
                                            className="btn btn-light"><i className="fa fa-arrow-alt-circle-left"></i></button>
                                </span>

                                <span className="inc-offset">
                                    <button onClick={this.props.loadNext}
                                            className="btn btn-light">
                                            <i className="fa fa-arrow-alt-circle-right"></i>
                                    </button>
                                </span>
                            </div>
                        </div>
     
                      <div className="table-container">
                        <table className="table table-bordered table-striped no-footer" aria-describedby="DataTables_Table_0_info">
                            <thead>
                                <tr property="row">
                                    <th className="text-center">
                                        ID
                                    </th>

                                    <th className="text-center">
                                        Автомобиль
                                    </th>

                                    <th className="text-center">
                                        Продукт
                                    </th>

                                    <th className="text-center">
                                        Дата Создания
                                    </th>

                                    <th className="text-center">
                                        Изменить
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {Links}
                            </tbody>
                        </table>
                      </div>
                    </div>
                </div>
            </>
        )
    }
}