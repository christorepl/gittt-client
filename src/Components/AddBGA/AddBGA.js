import React from 'react'
import axios from 'axios'
import API_BASE_URL from '../../config'

export default class AddBGA extends React.Component {
    // async componentDidMount() {
    //     try {
    //         const response = await fetch(API_BASE_URL + '/add-bga')
    //         const allRes = await response.json()
    //         alert(allRes)
    //     } catch (error) {
    //         console.error(error.message)
    //     } 
    // }
    bgaAuth = async () => {
        var options = {
            method: 'GET',
            url: 'https://api.boardgameatlas.com/oauth/authorize?response_type=code&client_id=LN1xFTrB6e&redirect_uri=https://get-it-to-the-table.vercel.app/bga-auth/',
            params: {state: null},
        }
        axios.request(options).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.error(error)
        })
    }
    render() {
        return(
            <div className="info">
                add bga
                <button onClick={() => this.bgaAuth()}>add bga button</button>
            </div>
        )
    }
}