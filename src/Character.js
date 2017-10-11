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
                {data.name}
            </div>
        )
    }
}

const styles = {
    character: {
        margin: 2,
        width: 75,
        height: 75,
        color: 'white',
        cursor: 'pointer',
        userSelect: 'none'
    },
    selected: {
        border: '1px solid green'
    },
    unselected: {
        border: '1px solid red'
    },
    chosen: {
        border: '2px solid blue'
    }
}

export default Character
