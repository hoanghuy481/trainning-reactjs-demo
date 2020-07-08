import React from 'react';

function Panigation({postPerPost, totalPost, paginate}) {
    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(totalPost / postPerPost); i++){
        pageNumber.push(i);
    }
    
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <a className="page-link" href="#">Previous</a>
                </li>
                {pageNumber.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a className="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>
    );
}

export default Panigation;