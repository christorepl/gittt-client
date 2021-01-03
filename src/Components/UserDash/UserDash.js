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
                    <Link to={{
                        pathname: "/chat",
                        props :{
                            chatName: 'Mike, Tori, Ali'
                        }
                    }}>
                    <li>Mike, Tori, Ali</li>
                    </Link>


                    <Link to={{
                        pathname: "/chat",
                        props :{
                            chatName: 'Tori'
                        }
                    }}>
                    <li>Tori</li>
                    </Link>
                    
                    
                    <Link to={{
                        pathname: "/chat",
                        props :{
                            chatName: 'Josh, Alex'
                        }
                    }}>
                    <li>Josh, Alex</li>
                    </Link>


                    <Link to={{
                        pathname: "/chat",
                        props :{
                            chatName: 'Josh, Alex, Jake'
                        }
                    }}>
                    <li>Josh, Alex, Jake</li>
                    </Link>                </ul>

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