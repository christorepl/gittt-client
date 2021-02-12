import React from 'react'
import { Redirect } from 'react-router-dom'
import AppContext from '../../Context/AppContext'

export default class Login extends React.Component {
    static contextType = AppContext

    render() {

       return (
            <>
            {this.context.isAuthenticated
            ?
            <Redirect to="/home"/>
            :
            <div className="user-forms">
                <form className="user-form" onSubmit={(e) => this.context.onSubmitLogin(e)}>
                <label htmlFor="email">E-mail Address:</label>
                <br/>
                <input type="email" name="email" required onChange={e => this.context.setEmail(e.target.value)}/>
                <br/>
                <label htmlFor="password">Password:</label>
                <br/>
                <input type="password" name="password" required onChange={e => this.context.setPassword(e.target.value)}/>
                <br/>
                <button type="submit">Login</button>
                <p>For testing, try using the these credentials:</p>
                <p>E-mail: test@test.com - Password: test</p>
                <p>E-mail: jimmy@test.com - Password: test</p>
                <p>E-mail: johnny@test.com - Password: test</p>
                <p>E-mail: bobby@test.com - Password: test</p>
                <p>E-mail: joey@test.com - Password: test</p>
                </form>
            </div>
            }
            </>
        )
    }
}