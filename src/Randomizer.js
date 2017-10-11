import React from 'react'
import Character from './Character'

class Randomizer extends React.Component {
    state = {}

    handleGo = () => {
        const {characters} = this.props
        const count = characters.length
        const result = Math.floor(Math.random() * count)
        console.log(result, characters[result])
        this.setState({selected: characters[result]})
    }

    handleClear = () => {
        this.setState({selected: null})
    }

    render() {
        const {selected} = this.state

        return (
            <div>
                <button onClick={this.handleGo}>Go!</button>
                <button onClick={this.handleClear}>Clear</button>
                <button onClick={this.props.onReset}>Reset</button>

                {
                    selected &&
                    <div style={styles.selectedCharacter}>
                        <Character data={selected}/>
                    </div>
                }
            </div>
        )
    }
}

const styles = {
    container: {
        border: '1px solid white',
        color: 'white'
    }
}

export default Randomizer
