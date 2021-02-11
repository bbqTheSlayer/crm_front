import React, {Component} from 'react';
import BaseSelect from '../base/select';
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
        this.props.EditRegion(e);
    }

    renderSearchInput()
    {
        return (
            <BaseInput
              className="form-control"
              placeholder="Название"
              onChange={(Val) => {
                this.props.setStoreField('FilterRegion', Val);
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

    renderSearchSelect()
    {
        const OptionList = this.prepareOptionList(this.props.Store.OptionList, 'District');
        return (
            <BaseSelect
                className="form-control"
                OptionList={OptionList}
                onChange={(Val) => {
                    this.props.setStoreField('FilterDistrict', Val);
                }}
            />
        );
    }

    render()
    {
        const FilterDistrict = this.renderSearchSelect();
        const FilterRegion = this.renderSearchInput();
        const RegionArray = this.props.Store.TableDataSet;

        const Regions = RegionArray.map((Row, i) => {
            return  (
                <tr key={i}>
                    <td className="text-center">{Row.id}</td>
                    <td className="text-center">{Row.Region}</td>
                    <td className="text-center" id={Row.DistrictID}>{Row.District}</td>
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
                                <label htmlFor="">Название региона</label>
                            </div>
                                
                            <div className="col-12 col-sm-6">
                                {FilterRegion}
                            </div>
                        </div>
  
                        <div className="row form-group">
                            <div className="col-12 col-sm-3">
                                <label htmlFor="">Название округа</label>
                            </div>

                            <div className="col-12 col-sm-6">
                                {FilterDistrict}
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
                                        Регион
                                    </th>

                                    <th className="text-center">
                                        Округ
                                    </th>

                                    <th className="text-center">
                                        Изменить
                                    </th>
                                </tr>
                            </thead>

                            <tbody id="alias-table">
                                {Regions}
                            </tbody>
                        </table>
                      </div>
                    </div>
                </div>
            </>
        )
    }
}