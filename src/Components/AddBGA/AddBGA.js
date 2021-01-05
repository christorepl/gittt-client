import React from 'react'

export default class AddBGA extends React.Component {
    render() {
        return(
            <div className="info">
                add bga
                <button onClick={() => console.log('add bga button clicked')}>add bga button</button>
            </div>
        )
    }
}