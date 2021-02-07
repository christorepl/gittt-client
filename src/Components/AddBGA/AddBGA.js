import React from 'react'

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
    // bgaAuth = async () => {
    //     try {
    //         const response = await fetch('https://api.boardgameatlas.com/oauth/authorize?response_type=code&client_id=LN1xFTrB6e&redirect_uri=https://get-it-to-the-table.vercel.app/bga-auth/')
    //         const res = await response.json()
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    render() {


        return(
            <div className="info">
                add bga
                <a href="https://api.boardgameatlas.com/oauth/authorize?response_type=code&client_id=LN1xFTrB6e&state=fdsft4edm8wfgjl08sfgyy_FHFf7rhfGRY5&redirect_uri=https://get-it-to-the-table.vercel.app/bga-auth/"><button>add bga button</button></a>
            </div>
        )
    }
}