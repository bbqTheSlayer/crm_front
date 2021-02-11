import React, {Component} from 'react';
import BaseInput from '../base/input';

export default class Editor extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    clickSaveEditor()
    {
        this.props.saveEditor();
    }

    clickClearEditor()
    {
        this.props.clearEditor();
    }

    renderCodeInput()
    {
        return (
          <BaseInput
            className="form-control"
            placeholder="Код"
            onChange={(Val) => {
                this.props.setEditorField("Code", Val)
            }}
            value={this.props.Store.editor.Code}
            />
        )
    }

    renderNameInput()
    {
        return (
          <BaseInput
            className="form-control"
            placeholder="Название"
            onChange={(Val) => {
                this.props.setEditorField("Name", Val)
            }}
            value={this.props.Store.editor.Name}
            />
        )
    }

    render()
    {
        const CodeInput = this.renderCodeInput();
        const NameInput = this.renderNameInput();

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="row form-group">
                            <div className="col-xs-12 col-sm-3">
                                <label>Код</label>
                            </div>

                            <div className="col-xs-12 col-sm-6">
                                {CodeInput}
                            </div>
                        </div>
                        
                        <div className="row form-group">
                            <div className="col-xs-12 col-sm-3">
                                <label>Название</label>
                            </div>

                            <div className="col-xs-12 col-sm-6">
                                {NameInput}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12 col-sm-6 offset-sm-3">
                                <button
                                  onClick={() => {
                                    this.clickSaveEditor();
                                  }}
                                  className="btn btn-success col-sm-12">Применить</button>
                            </div>
                        </div>

                        <div className="row pt10">
                            <div className="col-xs-12 col-sm-6 offset-sm-3">
                                <button
                                  onClick={() => {
                                    this.clickClearEditor();
                                  }}
                                  id="clear-editor"
                                  className="btn btn-light col-sm-12">Очистить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
