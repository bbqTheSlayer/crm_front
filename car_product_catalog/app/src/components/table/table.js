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
        this.props.EditProduct(e);
    }

    renderSearchVendorCode()
    {
        return (
          <BaseInput
            className="form-control"
            placeholder="Название"
            onChange={(Val) => {
                this.props.setStoreField('FilterVendorCode', Val)
            }}
            />
        )
    }

    renderSearchVendor()
    {
        return (
            <BaseInput
              className="form-control"
              placeholder="Название"
              onChange={(Val) => {
                this.props.setStoreField('FilterVendor', Val)
            }}
            />
        );
    }

    render()
    {
        const ProductArray = this.props.Store.TableDataSet;
        const SearchVendorCode = this.renderSearchVendorCode();
        const SearchVendor = this.renderSearchVendor();

        const Products = ProductArray.map((Row, i) => {
            return  (
                <tr key={i}>
                    <td className="text-center">{Row.id}</td>
                    <td className="text-center">{Row.OID}</td>
                    <td className="text-center">{Row.VendorCode}</td>
                    <td className="text-center" value={Row.VendorID}>{Row.Vendor}</td>
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
                                <label htmlFor="">Код</label>
                            </div>
                                
                            <div className="col-12 col-sm-6">
                                {SearchVendorCode}
                            </div>
                        </div>
  
                        <div className="row form-group">
                            <div className="col-12 col-sm-3">
                                <label htmlFor="">Наименование</label>
                            </div>

                            <div className="col-12 col-sm-6">
                                {SearchVendor}
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
                                        Код
                                    </th>

                                    <th className="text-center">
                                        Наименование
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
                                {Products}
                            </tbody>
                        </table>
                      </div>
                    </div>
                </div>
            </>
        )
    }
}