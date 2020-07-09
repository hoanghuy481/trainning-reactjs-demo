import React, { Component } from 'react';
import axios from 'axios';

import DetailUser from '../components/DetailUser';

class DetailPostPages extends Component {
    constructor() {
        super()
        this.state = {
            user: {}
        }
    }

    fetchPost = async () => {
        // const waitingRespone = new Promise(resolve => {
        //     let id = this.props.match.params.id;
        //     axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => {
        //         resolve(res.data);
        //     })
        // })
        // waitingRespone.then(resolve => {
        //     this.setState({
        //         user: resolve
        //     })
        // })
        let id = this.props.match.params.id;
        let res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            this.setState({
                user: res.data
            })
    
    }

    componentDidMount(){
        this.fetchPost();
    }
    
    render() {
        let {user} = this.state;
        
        return (
            <div>
                <h1>Chi tiết User</h1>
                <DetailUser user={user} />
            </div>

        );

    }
}

export default DetailPostPages;