import React from 'react';
import Filter from './Filter';
import Sort from './Sort';

function Control(props) {
    return (
        <div className="row">
            <Filter onClickFilter={props.onClickFilter} />
            <Sort sortByID={props.sortByID} />
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <button type="button" className="btn btn-success btn-block">Add</button>
            </div>
        </div>
    );
}

export default Control;