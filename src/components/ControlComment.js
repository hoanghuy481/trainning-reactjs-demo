import React, {useState} from 'react';
import Filter from './Filter';
import Sort from './Sort';
import { Button } from 'react-bootstrap';

import FormAddComment from '../components/Modal/FormAddComment';
function ControlComment(props) {
    const [modalShow, setModalShow] = useState(false);
    return (
        <div className="row">
            <Filter onClickFilter={props.onClickFilter} />
            <Sort sortByID={props.sortByID} />
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <Button variant="btn btn-success btn-block" onClick={() => setModalShow(true)}>
                    Add Comment
                    </Button>
                <FormAddComment postId={props.postId} show={modalShow} onHide={() => setModalShow(false)} />
            </div>
        </div>
    );
}

export default ControlComment;