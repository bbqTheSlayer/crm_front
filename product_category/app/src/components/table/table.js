import React, {Component} from 'react';
import BaseInput from '../base/input';

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
        this.props.EditModel(e);
    }

    renderFilterInputCode()
    {
        return (
          <BaseInput
            className="form-control"
            placeholder="Код"
            onChange={(Val) => {
                this.props.setStoreField('FilterCode', Val)
            }}
            />
        )
    }

    render()
    {
        const ProductArray = this.props.Store.TableDataSet;
        const FilterCode = this.renderFilterInputCode();

        const Products = ProductArray.map((Row, i) => {
            
            return  (
                <tr key={i}>
                    <td className="text-center">{Row.id}</td>
                    <td className="text-center">{Row.Code}</td>
                    <td className="text-center">{Row.Name}</td>
                    <td className="text-center">{Row.Description}</td>
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
                                {FilterCode}
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
                                        Код
                                    </th>

                                    <th className="text-center">
                                        Название
                                    </th>

                                    <th className="text-center">
                                        Описание
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