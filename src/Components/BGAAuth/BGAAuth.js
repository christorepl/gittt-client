import React from 'react'
import API_BASE_URL from '../../config'

export default class BGAAuth extends React.Component {
    async componentDidMount() {
        let codeStr = this.props.location.search
        console.log('code string ', codeStr)
        let code = codeStr.substring(6, codeStr.length)
       console.log('code ', code)
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