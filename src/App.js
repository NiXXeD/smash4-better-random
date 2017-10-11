import React from 'react'
import CharacterList from './CharacterList'
import characters from './characters'

class App extends React.Component {
    defaultState = {
        selected: [
            ...characters
        ],
        unselected: []
    }
    state = {
        selected: [],
        unselected: [],
        chosen: null
    }

    componentDidMount() {
        try {
            let oldStorageData = localStorage.getItem('characters')
            let savedState = JSON.parse(oldStorageData)
            if (savedState.selected && savedState.unselected) {
                let initialState = {
                    selected: savedState.selected.map(id => characters.find(c => c.id === id)),
                    unselected: savedState.unselected.map(id => characters.find(c => c.id === id))
                }
                return this.setState(initialState)
            }
        } catch (ex) {
            console.log('Error loading local storage data: ', ex)
        }
        this.setState({...this.defaultState})
    }

    handleCharacterChange = prev => (event, character) => {
        let from = prev ? 'selected' : 'unselected'
        let to = prev ? 'unselected' : 'selected'
        this.setState(oldState => {
            let newState = {
                [from]: oldState[from].filter(c => c.id !== character.id),
                [to]: [...oldState[to], character]
            }

            //save to local storage
            let storageData = {
                selected: newState.selected.map(c => c.id),
                unselected: newState.unselected.map(c => c.id)
            }
            localStorage.setItem('characters', JSON.stringify(storageData))

            return newState
        })
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
