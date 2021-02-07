import React from 'react'
import AppContext from '../../Context/AppContext'

export default class Logout extends React.Component {
    static contextType = AppContext

    componentDidMount = () => {
        this.context.logout()
    }

    render() {


        return(
            <>
            </>
        )
    }
}