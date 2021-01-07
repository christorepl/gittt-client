import React from "react"
import API_BASE_URL from "../../config"

export default class BGAAuth extends React.Component {
    async componentDidMount() {
        try {
        let codeStr = this.props.location.search
        let code = codeStr.substring(6, codeStr.length - 42)
        //send code with the POST request to the API
        const body = { code }
        const response = await fetch(API_BASE_URL + 'bga-auth/auth', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        })

        const parseRes = await response.json()
        console.log('respose ', parseRes)
        } catch(err) {
            console.error('local error: ', err)
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