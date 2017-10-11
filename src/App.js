import React from 'react'
import CharacterList from './CharacterList'
import characters from './characters'
import Randomizer from './Randomizer'

class App extends React.Component {
    defaultState = {
        selected: [
            ...characters
        ],
        unselected: []
    }
    state = {...this.defaultState}

    handleClick = prev => (event, character) => {
        let from = prev ? 'selected' : 'unselected'
        let to = prev ? 'unselected' : 'selected'
        this.setState(oldState => ({
            [from]: oldState[from].filter(c => c.id !== character.id),
            [to]: [...oldState[to], character]
        }))
    }

    handleReset = () => {
        this.setState({...this.defaultState})
    }

    render() {
        const {selected, unselected} = this.state

        return (
            <div>
                <CharacterList
                    characters={selected}
                    onClick={this.handleClick(true)}
                    selected={true}
                />
                <CharacterList
                    characters={unselected}
                    onClick={this.handleClick(false)}
                />
                <Randomizer
                    characters={selected}
                    onReset={this.handleReset}
                />
            </div>
        )
    }
}

export default App
