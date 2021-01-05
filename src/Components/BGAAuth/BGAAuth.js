import React from 'react'
import API_BASE_URL from '../../config'

export default class BGAAuth extends React.Component {
    async componentDidMount() {
        let codeStr = this.props.location.search.substring(6, codeStr.length - 11)
        // let code = codeStr
        console.log(code)
        try {
            const response = await fetch('https://api.boardgameatlas.com/oauth/token' ,
            {
                method: 'POST',
                body: JSON.stringify({
                    client_id = 'LN1xFTrB6e',
                    client_secret = '17c218619e19b928562296f2edbdc711',
                    codeStr,
                    redirect_uri = 'https://get-it-to-the-table.vercel.app/bga-auth',
                    grant_type = "authorization_code"
                }),
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                }
            })
            const allRes = await response.json()
            console.log(allRes)
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