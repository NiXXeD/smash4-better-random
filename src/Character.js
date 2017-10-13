import React from 'react'

class Character extends React.Component {
    handleClick = (...args) => {
        if (this.props.type !== 'chosen') {
            this.props.onCharacterClick(...args, this.props.data)
        }
    }

    render() {
        const {data = {}, type} = this.props

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
        margin: 4,
        width: 100,
        height: 100,
        cursor: 'pointer'
    },
    unavailable: {
        filter: 'grayscale(100%)'
    },
    chosen: {
        cursor: 'default',
        margin: 'auto'
    }
}

export default Character
