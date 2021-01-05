import React from 'react'
import API_BASE_URL from '../../config'

export default class AddBGA extends React.Component {
    async componentDidMount() {
        try {
            const response = await fetch(API_BASE_URL + '/add-bga')
            const allRes = await response.json()
            alert(allRes)
        } catch (error) {
            console.error(error.message)
        } 
    }
    render() {
        return(
            <div className="info">
                add bga
                <button onClick={() => console.log('add bga button clicked')}>add bga button</button>
            </div>
        )
    }
}