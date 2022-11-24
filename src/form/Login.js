import React from 'react';
import './login.css';

const FormInput = props => (
    <div className="row">
        <label>{props.description}</label>
        <input name={props.name} type={props.type} placeholder={props.placeholder} value={props.value} onChange={e => props.onchange(e)}/>
    </div>
);

export class LoginFrom extends React.Component {
    constructor(props) {
        super(props);
        //props.handleLogin();
        this.state = {
            username: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log('A name was submitted: ' + this.state.username);
        event.preventDefault();
        this.props.handleLogin(this.state.username, this.state.password);
    }

    render() {
        return (
            <div id="loginform">
                <form onSubmit={this.handleSubmit}>
                    <h2 id="headerTitle">Login to TickStats</h2>
                    <FormInput description="Username" placeholder="Enter your username" type="text" name="username" value={this.state.username} onchange={this.handleChange}/>
                    <FormInput description="Password" placeholder="Enter your password" type="password" name="password" value={this.state.password} onchange={this.handleChange}/>
                    <div id="button" className="row">
                        <button type="submit">login</button>
                    </div>
                    {this.props.invalidCredential &&
                        <div className="error-msg row">
                            Wrong username or password
                        </div>
                    }{this.props.serverUneachable &&
                        <div className="error-msg row">
                            Server unreachable, retry later
                        </div>
                    }
                    <div className="row"></div>
                </form>
            </div>
        );
    }
}

