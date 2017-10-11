import React from 'react'
import CharacterList from './CharacterList'
import characters from './characters'
import Character from './Character'

class App extends React.Component {
    defaultState = {
        selected: [
            ...characters
        ],
        unselected: []
    }
    state = {...this.defaultState}

    handleCharacterChange = prev => (event, character) => {
        let from = prev ? 'selected' : 'unselected'
        let to = prev ? 'unselected' : 'selected'
        this.setState(oldState => ({
            [from]: oldState[from].filter(c => c.id !== character.id),
            [to]: [...oldState[to], character]
        }))
    }

    handleGo = () => {
        const {selected} = this.state
        const count = selected.length
        const result = Math.floor(Math.random() * count)
        this.setState({chosen: selected[result]})
    }

    handleClear = () => {
        this.setState({chosen: null})
    }

    handleReset = () => {
        this.setState({...this.defaultState})
    }

    render() {
        const {chosen, selected, unselected} = this.state

        return (
            <div>
                <CharacterList
                    characters={selected}
                    onClick={this.handleCharacterChange(true)}
                    type='selected'
                />
                <CharacterList
                    characters={unselected}
                    onClick={this.handleCharacterChange(false)}
                    type='unselected'
                />

                <button onClick={this.handleGo}>Go!</button>
                <button onClick={this.handleClear}>Clear</button>
                <button onClick={this.handleReset}>Reset</button>

                <CharacterList
                    characters={(chosen && [chosen]) || []}
                    type='chosen'
                />
            </div>
        )
    }
}

export default App
