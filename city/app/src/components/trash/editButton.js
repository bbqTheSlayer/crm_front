import React, {Component} from 'react';

export default class EditButton extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            id: props.ItemId,
            ParentItemId: props.CurrentItemID,
            onClickHandler: props.onClickHandler
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.onButtonClick(this.state.id);
    }


    render()
    {
        return (
            <button type="button"
                    className="btn btn-sm btn-light"
                    onClick={this.onClick}
                    id={'EditButton_' + this.state.id}>
              <i class="fa fa-fw fa-pencil-alt"></i>
            </button>
        );
    }
}