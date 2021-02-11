import React, {Component} from 'react';
import BaseInput from '../base/input';
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
        this.props.EditFamily(e);
    }

    renderSearchInputName()
    {
        return (
          <BaseInput
            className="form-control"
            placeholder="Название"
            onChange={(Val) => {
                this.props.setStoreField('FilterName', Val)
            }}
            />
        )
    }

    renderSearchInputOID()
    {
        return (
          <BaseInput
            className="form-control"
            placeholder="OID"
            onChange={(Val) => {
                this.props.setStoreField('FilterOID', Val)
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
            return {Value: parseInt(Row.OID), Caption: Row[CaptionField]};
        });
    }

    renderSelectSearch()
    {
        const OptionList = this.prepareOptionList(this.props.Store.OptionList, 'Name');
        return (
            <BaseSelect
                className="form-control"
                OptionList={OptionList}
                onChange={(Val) => {
                    this.props.setStoreField('FilterCarBrand', Val)
                }}
            />
        );
    }

    render()
    {
        const FamilyArray = this.props.Store.TableDataSet;
        const SearchName = this.renderSearchInputName();
        const SearchOID = this.renderSearchInputOID();
        const SearchBrand = this.renderSelectSearch();

        const Familys = FamilyArray.map((Row, i) => {
            return  (
                <tr key={i}>
                    <td className="text-center">{Row.id}</td>
                    <td className="text-center">{Row.OID}</td>
                    <td className="text-center">{Row.Name}</td>
                    <td className="text-center" value={Row.CarBrandOID}>{Row.BrandName}</td>
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
                                {SearchBrand}
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-12 col-sm-3">
                                <label htmlFor="">OID</label>
                            </div>
                                
                            <div className="col-12 col-sm-6">
                                {SearchOID}
                            </div>
                        </div>
  
                        <div className="row form-group">
                            <div className="col-12 col-sm-3">
                                <label htmlFor="">Семейство</label>
                            </div>

                            <div className="col-12 col-sm-6">
                                {SearchName}
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
                                        OID
                                    </th>

                                    <th className="text-center">
                                        Название
                                    </th>

                                    <th className="text-center">
                                        Марка
                                    </th>

                                    <th className="text-center">
                                        Дата Создания
                                    </th>

                                    <th className="text-center">
                                        Изменить
                                    </th>
                                </tr>
                            </thead>

                            <tbody id="family-table">
                                {Familys}
                            </tbody>
                        </table>
                      </div>
                    </div>
                </div>
            </>
        )
    }
}