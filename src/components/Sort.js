import React, { useContext } from 'react';

import UserContext from '../context/UserContext';

function Sort(props) {

    const { orderBy, orderDir } = useContext(UserContext);
    const handleSort = (orderBy, orderDir) => {
        props.sortByID(orderBy, orderDir);
    }
    let strSort = orderBy + " - " + orderDir;

    return (
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-2">
            <div className="dropdown">
                <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Sort by <span className="caret" />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li><a onClick={() => handleSort('id', 'asc')} href=" #" role="button">POSTS ID ASC</a></li>
                    <li><a onClick={() => handleSort('id', 'desc')} href=" #" role="button">POSTS ID DESC</a></li>
                    <li role="separator" className="divider" />
                    <li><a onClick={() => handleSort('total', 'asc')} href=" #" role="button">Total Comment ASC</a></li>
                    <li><a onClick={() => handleSort('total', 'desc')} href=" #" role="button">Total Comment DESC</a></li>
                </ul>
                <span className="label label-success label-medium">{strSort}</span>
            </div>
        </div>
    );
}

export default Sort;