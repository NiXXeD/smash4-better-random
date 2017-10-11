import React from 'react'

class Character extends React.Component {
    handleClick = (...args) => {
        this.props.onClick(...args, this.props.data)
    }

    render() {
        const {data, selected} = this.props

        const style = {
            ...styles.character,
            ...!selected ? styles.disabled : styles.enabled
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
    enabled: {
        border: '1px solid green'
    },
    disabled: {
        border: '1px solid red'
    }
}

export default Character
