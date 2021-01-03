import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import AppContext from '../../Context/AppContext'

export default class UserDash extends React.Component {
    static contextType = AppContext

    render() {
        const userDash =
        this.context.isAuthenticated
        ?
        <div className="user-dash">
            Your Groups:
                <ul>
                    <Link to="/chatMike, Tori, Ali">
                        <li>Mike, Tori, Ali</li>
                    </Link>


                    <Link to="/chatTori">
                        <li>Tori</li>
                    </Link>
                    
                    
                    <Link to="/chatJosh, Alex">
                        <li>Josh, Alex</li>
                    </Link>

                    <Link to="/chatJosh, Alex, Jake">
                        <li>Josh, Alex, Jake</li>
                    </Link>
                </ul>

        </div>
        :
        <Redirect to="/login"/>


        return(
            <>
            {userDash}
            </>
        )
    }
}