import React from "react"
import API_BASE_URL from "../../config"

export default class BGAAuth extends React.Component {
    async componentDidMount() {
        try {
        let codeStr = this.props.location.search
        let code = codeStr.substring(6, codeStr.length - 42)
        //send code with the POST request to the API
        const body = { code }
        console.log(code, ' the code')
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





// import React from "react"
// import API_BASE_URL from "../../config"



// export default class BGAAuth extends React.Component {
//     async componentDidMount() {
//         let codeStr = this.props.location.search
//         console.log(codeStr)
//         let code = codeStr.substring(6, codeStr.length)
//         console.log(code)
//         let client_id= "LN1xFTrB6e"
//         let client_secret = "17c218619e19b928562296f2edbdc711"
//         let redirect_uri= "https://get-it-to-the-table.vercel.app/bga-auth/"
//         let grant_type ="authorization_code"
//         fetch('https://api.boardgameatlas.com/oauth/token', {
//             method: "POST",
//             headers: {
//                 "content-type": "application/x-www-form-urlencoded"
//             },
//             body: 
//                 `client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&grant_type=${grant_type}&code=${code}`
//         }).then(response => {
//             if (response.ok) {
//                 response.json().then(json => {
//                     console.log(json)
//                 })
//             }
//         }).catch(function(error) {
//             console.log(error)
//         })

//     }
//     render() {
//         return(
//             <div className="info">
//                 bga auth page
//             </div>
//         )
//     }
// }