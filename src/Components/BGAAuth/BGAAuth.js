import React from "react"
import API_BASE_URL from "../../config"



export default class BGAAuth extends React.Component {
    async componentDidMount() {
        let codeStr = this.props.location.search
        let code = codeStr.substring(6, codeStr.length)
        //send code with the POST request to the API
        try {
            const response = await fetch(API_BASE_URL + "/bga-auth/auth", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: {
                    code
                }
            }).then(response => {
                if (response.ok) {
                    response.json().then(json =>{
                        console.log('success ', json)
                    })
                }
            }).catch(function(error) {
                console.log('local catch error ', error)
            })
        } catch (error) {
            console.error(error)
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