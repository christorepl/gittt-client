import React from "react"
import API_BASE_URL from "../../config"



export default class BGAAuth extends React.Component {
    async componentDidMount() {
        let codeStr = this.props.location.search
        console.log(codeStr)
        let code = codeStr.substring(6, codeStr.length)
        console.log(code)
        let client_id= "LN1xFTrB6e"
        let client_secret = "17c218619e19b928562296f2edbdc711"
        let redirect_uri= "https://get-it-to-the-table.vercel.app/bga-auth/"
        let grant_type ="authorization_code"
        fetch('https://api.boardgameatlas.com/oauth/token', {
                "method": "POST",
                "header": [
                    {
                        "key": "content-type",
                        "value": "application/x-www-form-urlencoded",
                        "type": "text"
                    }
                ],
                "body": {
                    "mode": "urlencoded",
                    "urlencoded": [
                        {
                            "key": "client_id",
                            "value": "LN1xFTrB6e",
                            "type": "text"
                        },
                        {
                            "key": "client_secret",
                            "value": "17c218619e19b928562296f2edbdc711",
                            "type": "text"
                        },
                        {
                            "key": "code",
                            "value": "e8ec199476f64154a582f3278d0914c8781ac762",
                            "type": "text"
                        },
                        {
                            "key": "redirect_uri",
                            "value": "https://get-it-to-the-table.vercel.app/bga-auth/ ",
                            "type": "text"
                        },
                        {
                            "key": "grant_type",
                            "value": "authorization_code",
                            "type": "text"
                        }
                    ],
                    "options": {
                        "raw": {
                            "language": "json"
                        }
                    }
                },
                "url": {
                    "raw": "https://api.boardgameatlas.com/oauth/token",
                    "protocol": "https",
                    "host": [
                        "api",
                        "boardgameatlas",
                        "com"
                    ],
                    "path": [
                        "oauth",
                        "token"
                    ],
                    "query": [
                        {
                            "key": "client_id",
                            "value": "LN1xFTrB6e",
                            "disabled": true
                        },
                        {
                            "key": "client_secret",
                            "value": "17c218619e19b928562296f2edbdc711",
                            "disabled": true
                        },
                        {
                            "key": "code",
                            "value": "f719ff21228b7e81bdc6235c9e502a0dbbc26614",
                            "disabled": true
                        },
                        {
                            "key": "redirect_uri",
                            "value": "https://get-it-to-the-table.vercel.app/bga-auth",
                            "disabled": true
                        },
                        {
                            "key": "grant_type",
                            "value": "authorization_code",
                            "disabled": true
                        }
                    ]
                }
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    console.log(json)
                })
            }
        }).catch(function(error) {
            console.log(error)
        })

    }
    render() {
        return(
            <div className="info">
                bga auth page
            </div>
        )
    }
}

// method: "POST",
// headers: {
//     "content-type": "application/x-www-form-urlencoded"
// },
// form: {
//     client_id,
//     client_secret,
//     redirect_uri,
//     grant_type
// }








// {
//     "method": "POST",
//     "header": [
//         {
//             "key": "content-type",
//             "value": "application/x-www-form-urlencoded",
//             "type": "text"
//         }
//     ],
//     "body": {
//         "mode": "urlencoded",
//         "urlencoded": [
//             {
//                 "key": "client_id",
//                 "value": "LN1xFTrB6e",
//                 "type": "text"
//             },
//             {
//                 "key": "client_secret",
//                 "value": "17c218619e19b928562296f2edbdc711",
//                 "type": "text"
//             },
//             {
//                 "key": "code",
//                 "value": "e8ec199476f64154a582f3278d0914c8781ac762",
//                 "type": "text"
//             },
//             {
//                 "key": "redirect_uri",
//                 "value": "https://get-it-to-the-table.vercel.app/bga-auth/ ",
//                 "type": "text"
//             },
//             {
//                 "key": "grant_type",
//                 "value": "authorization_code",
//                 "type": "text"
//             }
//         ],
//         "options": {
//             "raw": {
//                 "language": "json"
//             }
//         }
//     },
//     "url": {
//         "raw": "https://api.boardgameatlas.com/oauth/token",
//         "protocol": "https",
//         "host": [
//             "api",
//             "boardgameatlas",
//             "com"
//         ],
//         "path": [
//             "oauth",
//             "token"
//         ],
//         "query": [
//             {
//                 "key": "client_id",
//                 "value": "LN1xFTrB6e",
//                 "disabled": true
//             },
//             {
//                 "key": "client_secret",
//                 "value": "17c218619e19b928562296f2edbdc711",
//                 "disabled": true
//             },
//             {
//                 "key": "code",
//                 "value": "f719ff21228b7e81bdc6235c9e502a0dbbc26614",
//                 "disabled": true
//             },
//             {
//                 "key": "redirect_uri",
//                 "value": "https://get-it-to-the-table.vercel.app/bga-auth",
//                 "disabled": true
//             },
//             {
//                 "key": "grant_type",
//                 "value": "authorization_code",
//                 "disabled": true
//             }
//         ]
//     }
// }