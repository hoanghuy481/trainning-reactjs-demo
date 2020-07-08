import React from 'react';

function Sort() {
    return (
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-2">
            <div className="dropdown">
                <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Sort by <span className="caret" />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li><a role="button">Created Date ASC</a></li>
                    <li><a role="button">Created Date DESC</a></li>
                    <li role="separator" className="divider" />
                    <li><a role="button">Total Comment ASC</a></li>
                    <li><a role="button">Total Comment DESC</a></li>
                </ul>

                <span className="label label-success label-medium">sort</span>
            </div>
        </div>
    );
}

export default Sort;