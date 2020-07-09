import React from 'react';

function DetailUser(props) {
    let user = props.user;
    return (
        <div>
            <form>
                <h4>Thông tin User: </h4>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">ID</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={user.id} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={user.email} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={user.name} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Phone</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={user.phone} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={user.username} />
                    </div>
                </div>
                <h4>Comapany: </h4>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={user.company.name} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">BS</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={user.company.bs} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Catch Phrase</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" defaultValue={user.company.catchPhrase} />
                    </div>
                </div>

            </form>
        </div>
    );
}

export default DetailUser;