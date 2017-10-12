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
        chosen: null,
        hide: true
    }

    componentDidMount() {
        try {
            let oldStorageData = localStorage.getItem('characters') || '{}'
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
            localStorage.removeItem(localStorageKey)
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
            this.saveToStorage(newState)
            return newState
        })
    }

    handleInverse = () => {
        this.setState(oldState => {
            let newState = {
                selected: [...oldState.unselected],
                unselected: [...oldState.selected]
            }
            this.saveToStorage(newState)
            return newState
        })
    }

    saveToStorage(state) {
        let storageData = {
            selected: state.selected.map(c => c.id),
            unselected: state.unselected.map(c => c.id)
        }
        localStorage.setItem(localStorageKey, JSON.stringify(storageData))
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
        localStorage.removeItem(localStorageKey)
    }

    hideUnselected = () => {
        this.setState({hide: true})
    }

    showUnselected = () => {
        this.setState({hide: false})
    }

    render() {
        const {chosen, hide, selected, unselected} = this.state

        return (
            <div>
                <CharacterList
                    characters={selected}
                    onClick={this.handleCharacterChange(true)}
                    type='selected'
                />
                {
                    !hide &&
                    <CharacterList
                        characters={unselected}
                        onClick={this.handleCharacterChange(false)}
                        type='unselected'
                    />
                }

                <button onClick={this.handleGo}>Go!</button>
                <button onClick={this.handleClear}>Clear</button>
                <button onClick={this.handleReset}>Reset</button>
                <button onClick={this.handleInverse}>Inverse</button>
                {!hide && <button onClick={this.hideUnselected}>Hide Unselected</button>}
                {hide && <button onClick={this.showUnselected}>Show Unselected</button>}

                <CharacterList
                    characters={(chosen && [chosen]) || []}
                    type='chosen'
                />
            </div>
        )
    }
}

const localStorageKey = 'characters'

export default App
