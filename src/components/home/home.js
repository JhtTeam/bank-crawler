import React, { Component } from 'react';

import './home.css';
import axios from 'axios';

class Home extends Component {
    componentDidMount() {
        const url = "https://magenta-t-apimng.jp-east-1.paas.cloud.global.fujitsu.com/finplex/bankapi/kaihatsu/api/v1/banks/0001/authentication";
        const postData = {
            branch: "123",
            type: "1",
            account: "3000001",
            pin: "1234",
        };
        axios.post(url, postData, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "AppKey": "NLCB2OShUDulHDuqKKAj2DKDM2ppRr4b",
            }
        })
                .then(res => res.data)
                .then(data => console.log(data))
                .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
            </div>
        );
    }
}

export default Home;