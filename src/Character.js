import React from 'react'

class Character extends React.Component {
    handleClick = (...args) => {
        this.props.onClick(...args, this.props.data)
    }

    render() {
        const {data, type} = this.props

        const style = {
            ...styles.character,
            ...styles[type]
        }

        return (
            <div
                style={style}
                title={data.name}
                onClick={this.handleClick}
            >
                <img alt={data.name} src={data.img}/>
            </div>
        )
    }
}

const styles = {
    character: {
        margin: 2,
        width: 100,
        height: 100,
        color: 'white',
        cursor: 'pointer',
        userSelect: 'none'
    },
    unselected: {
        filter: 'grayscale(100%)'
    }
}

export default Character
