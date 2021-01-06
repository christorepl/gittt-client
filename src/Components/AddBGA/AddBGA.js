import React from 'react'

export default class AddBGA extends React.Component {
    render() {
        return(
            <div className="info">
                add bga
                <a href="https://api.boardgameatlas.com/oauth/authorize?response_type=code&client_id=LN1xFTrB6e&state=fdsft4edm8wfgjl08sfgyy_FHFf7rhfGRY5&redirect_uri=https://get-it-to-the-table.vercel.app/bga-auth/"><button>add bga button</button></a>
            </div>
        )
    }
}