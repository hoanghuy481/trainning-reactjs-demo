import React, {useState} from 'react';
import Filter from './Filter';
import Sort from './Sort';
import { Button } from 'react-bootstrap';

import FormAddPost from '../components/Modal/FormAddPost';
function Control(props) {
    const [modalShow, setModalShow] = useState(false);
    return (
        <div className="row">
            <Filter onClickFilter={props.onClickFilter} />
            <Sort sortByID={props.sortByID} />
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <Button variant="btn btn-success btn-block" onClick={() => setModalShow(true)}>
                    Add Post
                    </Button>
                <FormAddPost show={modalShow} onHide={() => setModalShow(false)} />
            </div>
        </div>
    );
}

export default Control;