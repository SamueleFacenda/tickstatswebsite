import React from 'react';
import './App.css';
import {login, getData, getDataFrequency} from './api/backend';
import Loading from 'react-fullscreen-loading';
import {LoginFrom} from "./form/Login";
import {TickStats} from "./dataviz/tickStats";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataAvailable: false,
            showLoading: true,
            data: null,
            serverUnreachable: false
        }
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    exitChain() {
        const newerror = new Error('promise chain cancelled');
        newerror.name = 'CancelPromiseChainError';
        throw newerror;
    }

    fetchData() {

        Promise.all([getData(), getDataFrequency()])
            .then((response) => {
                if (response[0].status !== 200) {
                    if(response[0].status === 401){
                        //token expired
                        console.log('token expired, relogin');
                        this.setState({ dataAvailable: false });
                    }
                    this.exitChain();
                }
                return Promise.all(response.map(r => r.json()));
            })
            .then((responseData) => {
                let data = {...responseData[0], ...responseData[1]};
                this.setState({ dataAvailable: true, data: {data}, showLoading: false });
            })
            .catch((error) => {
                console.error('Error:', error);
                this.setState({ showLoading: false });
            });
    }

    handleLogin(username, password) {

        this.setState({ showLoading: true });
        //fetch per il login
        login(username, password)
            .catch((error) => {
                //server unreachable
                console.error('Error:', error);
                this.setState({ serverUnreachable: true });

                this.exitChain();
            })
            .then((response) => {
                if(response.status === 401){
                    //wrong credentials
                    console.log('wrong credentials');
                    this.setState({ showErrorLogin: true });

                    this.exitChain();
                }

                return response.json()
            })
            .then((responseData) => {
                console.log('Success:', responseData);

                this.fetchData();
            }).catch(error => {
                this.setState({ showLoading: false });
                if (error.name !== 'CancelPromiseChainError') {
                    //rilancio gli errori che non sono stati lanciati da me
                    throw error;
                }
            });
    }

    render() {
        if(this.state.dataAvailable)
            console.log(this.state.data.data);
        return (
            <div className="App">
                {this.state.showLoading && <Loading loading background="#000000" loaderColor="#ffffff" />}


                <header className="App-header">
                    TickStats
                </header>
                <div>
                    {this.state.dataAvailable ?
                        <TickStats dataRaw={this.state.data.data.tickData} dataFreq={this.state.data.data.labelFrequency} />
                        :
                        <LoginFrom handleLogin={this.handleLogin} invalidCredential={this.state.showErrorLogin} serverUneachable={this.state.serverUnreachable} />}
                </div>
            </div>
        )
            ;
    }
}

export default App;
