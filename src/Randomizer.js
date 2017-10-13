import React from 'react'
import CharacterList from './CharacterList'
import characters from './characters'
import Button from 'material-ui/Button'
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card'
import {withStyles} from 'material-ui/styles'
import Character from './Character'

class Randomizer extends React.Component {
    defaultState = {
        available: [
            ...characters
        ],
        unavailable: []
    }

    state = {
        available: [],
        unavailable: [],
        chosen: {}
    }

    componentDidMount() {
        this.loadFromStorage()
        setTimeout(() => this.handleRandomize())
    }

    handleCharacterChange = prev => (event, character) => {
        let from = prev ? 'available' : 'unavailable'
        let to = prev ? 'unavailable' : 'available'
        if (character) {
            this.setState(oldState => {
                let newState = {
                    [from]: oldState[from].filter(c => c.id !== character.id),
                    [to]: [...oldState[to], character]
                }
                this.saveToStorage(newState)
                return newState
            })
        }
    }

    handleInverse = () => {
        this.setState(oldState => {
            let newState = {
                available: [...oldState.unavailable],
                unavailable: [...oldState.available]
            }
            this.saveToStorage(newState)
            return newState
        })
    }

    saveToStorage(state) {
        let storageData = state.unavailable.map(c => c.id)
        localStorage.setItem(localStorageKey, JSON.stringify(storageData))
    }

    loadFromStorage() {
        try {
            let oldStorageData = localStorage.getItem('characters') || '[]'
            let savedState = JSON.parse(oldStorageData)
            let initialState = {
                available: characters.filter(c => !savedState.includes(c.id)),
                unavailable: savedState.map(id => characters.find(c => c.id === id))
            }
            return this.setState(initialState)
        } catch (ex) {
            console.log('Error loading local storage data: ', ex)
            localStorage.removeItem(localStorageKey)
        }
        this.setState({...this.defaultState})
    }

    handleRandomize = () => {
        const {available} = this.state
        const count = available.length
        const result = Math.floor(Math.random() * count)
        this.setState({chosen: available[result]})
    }

    handleReset = () => {
        this.setState({...this.defaultState})
        localStorage.removeItem(localStorageKey)
    }

    render() {
        const {chosen, available, unavailable} = this.state
        const {classes} = this.props

        return (
            <div className={classes.container}>
                {/* Chosen Character */}
                <Card className={classes.chosenCard}>
                    <CardHeader title="Random Character Select"/>
                    <CardContent>
                        <Character data={chosen} type="chosen"/>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" onClick={this.handleRandomize}>
                            Randomize
                        </Button>
                        <Button color="accent" onClick={this.handleReset}>
                            Clear
                        </Button>
                        <Button onClick={this.handleInverse}>
                            Inverse
                        </Button>
                    </CardActions>
                </Card>

                {/* Available Characters */}
                <Card className={classes.card}>
                    <CardHeader title="Available Characters"/>
                    <CardContent>
                        <CharacterList
                            characters={available}
                            onCharacterClick={this.handleCharacterChange(true)}
                            type="available"
                        />
                    </CardContent>
                </Card>

                {/* Unavailable Characters */}
                {unavailable.length > 0 && <Card className={classes.card}>
                    <CardHeader title="Unavailable Characters"/>
                    <CardContent>
                        <CharacterList
                            characters={unavailable}
                            onCharacterClick={this.handleCharacterChange(false)}
                            type="unavailable"
                        />
                    </CardContent>
                </Card>}
            </div>

        )
    }
}

const localStorageKey = 'characters'

const styles = theme => ({
    container: {
        minWidth: 400,
        maxWidth: 716
    },
    card: {
        margin: 16,
        minWidth: 364
    },
    chosenCard: {
        margin: 16,
        width: 368
    },
    chosenContainer: {
        margin: 'auto'
    }
})

export default withStyles(styles)(Randomizer)
