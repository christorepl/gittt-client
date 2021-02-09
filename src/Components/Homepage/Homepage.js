import React from 'react'
import AppContext from '../../Context/AppContext'
import HomepageNonUser from '../HomepageNonUser/HomepageNonUser'
import HomepageUser from '../HomepageUser/HomepageUser'

class Homepage extends React.Component {
    static contextType = AppContext

    render() {

        return(
            <>
            {!this.context.isAuthenticated
            ?
            <HomepageNonUser/>
            :
            <HomepageUser/>
            }
            </>
        )
    }
}

export default Homepage