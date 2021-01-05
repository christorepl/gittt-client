import React from 'react'
import API_BASE_URL from '../../config'

export default class BGAAuth extends React.Component {
    async componentDidMount() {
       console.log('code received', this.props.location.search)
        try {
            const response = await fetch(API_BASE_URL + '/bga-auth')
            const allRes = await response.json()
            alert(allRes)
        } catch (error) {
            console.error(error.message)
        } 

    }
    // async componentDidMount() {
    //     try {
            
    //     } catch (error) {
            
    //     }
    // }
    render() {
        return(
            <div className="info">
                bga auth page
            </div>
        )
    }
}