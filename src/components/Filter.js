import React, { useState } from 'react';

function Filter(props) {
    const [strSearch, setStrSearch] = useState('');

    const handleChange = (event) => {
        setStrSearch(event.target.value);
    }

    const handleSearch = () => {
        props.onClickFilter(strSearch);
    }

    const handleClear = () => {
        setStrSearch('');
        props.onClickFilter('');
    }

    return (
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <div className="input-group">
                <input value={strSearch} onChange={handleChange} type="text" className="form-control" placeholder="Search for..." />
                <span className="input-group-btn">
                    <button onClick={handleSearch} className="btn btn-info" type="button">Search</button>
                    <button onClick={handleClear} className="btn btn-warning" type="button">Clear</button>
                </span>
            </div>
        </div>
    );
}

export default Filter;