import React from 'react'
import API_BASE_URL from '../../config'

export default class BGAAuth extends React.Component {
   async componentDidMount() {
        try {
            const response = await fetch(API_BASE_URL + '/bga-auth')
            const allRes = await response.json()
            alert(allRes)
        } catch (error) {
            console.error(error.message)
        } 

    }
    render() {
        return(
            <div className="info">
                bga auth page
            </div>
        )
    }
}