import React from "react"
import API_BASE_URL from "../../config"

export default class BGAAuth extends React.Component {
    async componentDidMount() {
        let codeStr = this.props.location.search
        let code = codeStr.substring(6, codeStr.length - 11)
        console.log(code)
        const body = {
            "client_id": "LN1xFTrB6e",
            "client_secret": "17c218619e19b928562296f2edbdc711",
            "code" : code,
            "redirect_uri": "https://get-it-to-the-table.vercel.app/bga-auth",
            "grant_type": "authorization_code"
        }
        try {
            const response = await fetch("https://api.boardgameatlas.com/oauth/token" ,
            {
                method: "POST",
                body: JSON.stringify(body),
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