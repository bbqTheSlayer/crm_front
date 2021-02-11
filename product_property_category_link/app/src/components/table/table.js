import React, {Component} from 'react';

export default class Table extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }



    getColCodeList()
    {
        const ColumnList = this.props.ColumnList;

        let Out = [];

        for (let key in ColumnList) {
            Out.push(key);
        }

        return Out;
    }


    getColumnList()
    {
        const ColumnList = this.props.ColumnList;

        let Out = [];

        for (let key in ColumnList) {
            Out.push(ColumnList[key]);
        }

        return Out;
    }


    prepareTableHeader()
    {
        let Columns = this.getColumnList();

        Columns.push('Действия');

        return Columns.map((Current, index) => {
            return (
                <th key={index}>{Current}</th>
            );
        });
    }


    getDataSet()
    {
        if (typeof this.props.TableDataSet == 'object') {
            return this.props.TableDataSet;
        } else {
            return [];
        }
    }


    renderColumn(Value, key)
    {
        return (
            <td key={key}>{Value}</td>
        )
    }


    removeHandler(e)
    {
        this.props.removeRecord(e.target.id)
    }


    prepareTableRows()
    {
        const DataSet = this.getDataSet();

        const ColCodeList = this.getColCodeList();

        return DataSet.map((Row, i) => {            
            const Data = ColCodeList.map((Col, j) => {
                return this.renderColumn(Row[Col], 'col_' + i + '_' + j);
            });

            return (
                <tr key={'row_' + i}>

                    {Data}

                    <td className="text-center">
                        <button
                          className="btn btn-light"
                          onClick={(e) => {
                              this.removeHandler(e)}
                          }
                          id={Row.id}
                          ><i className="fa fa-times" id={Row.id}></i>
                        </button>
                    </td>
                </tr>
            )
        });
    }


    render()
    {
        const HeaderColumns = this.prepareTableHeader();

        const Rows = this.prepareTableRows();

        return (
            <>
                <div className="row">
                    <div className="col-sm-12">

                        <div id="TableNavigator"></div>

                        <div className="table-container">
                            <table className="table table-bordered table-striped no-footer" aria-describedby="DataTables_Table_0_info">
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
                    </div>
                </div>
            </>
        )
    }
}