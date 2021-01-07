import React from "react"
import API_BASE_URL from "../../config"
import axios from 'axios'


export default class BGAAuth extends React.Component {
    async componentDidMount() {
        try {
        let codeStr = this.props.location.search
        console.log('codestr: ', codeStr)
        let code = codeStr.substring(6, codeStr.length)
        console.log('parsed code: ', code)
        //send code with the POST request to the API
        const body = { code }
        const response = await fetch(API_BASE_URL + '/bga-auth/auth', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        })

        const parseRes = await response.json()
        console.log(parseRes)
        } catch(err) {
            console.error('local error: ', err)
        }
        // try {
        //     const response = await fetch(API_BASE_URL + "/bga-auth/auth", {
        //         method: "POST",
        //         headers: {
        //             "content-type": "application/json"
        //         },
        //         body: {
        //             code
        //         }
        //     }).then(response => {
        //         if (response.ok) {
        //             response.json().then(json =>{
        //                 console.log('success ', json)
        //             })
        //         }
        //     }).catch(function(error) {
        //         console.log('local catch error ', error)
        //     })
        // } catch (error) {
        //     console.error(error)
        // }


    }
    render() {
        return(
            <div className="info">
                bga auth page
            </div>
        )
    }
}