import React from 'react'
import CharacterList from './CharacterList'
import characters from './characters'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card'
import {withStyles} from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import ReplayIcon from 'material-ui-icons/Replay'
import VisibilityIcon from 'material-ui-icons/Visibility'
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff'
import ClearIcon from 'material-ui-icons/Clear'
import SelectAllIcon from 'material-ui-icons/SelectAll'
import Tooltip from 'material-ui/Tooltip'

class Randomizer extends React.Component {
    defaultState = {
        selected: [
            ...characters
        ],
        unselected: []
    }

    state = {
        selected: [],
        unselected: [],
        chosen: {},
        hide: true
    }

    componentDidMount() {
        this.loadFromStorage()
        setTimeout(() => this.handleRandomize())
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

    loadFromStorage() {
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

    handleRandomize = () => {
        const {selected} = this.state
        const count = selected.length
        const result = Math.floor(Math.random() * count)
        this.setState({chosen: selected[result]})
    }

    handleReset = () => {
        this.setState({...this.defaultState})
        localStorage.removeItem(localStorageKey)
    }

    handleVisibilityChange = hide => () => {
        this.setState({hide})
    }

    render() {
        const {chosen, hide, selected, unselected} = this.state
        const {classes} = this.props

        return (
            <Card className={classes.card}>
                <CardHeader title="Random Character Select"/>
                <CardContent>
                    <Typography type="subheading">Selected</Typography>
                    <CharacterList
                        characters={selected}
                        onClick={this.handleCharacterChange(true)}
                        type='selected'
                    />

                    {
                        !hide && <div>
                            <Divider className={classes.divider}/>
                            <Typography type="subheading">Unselected</Typography>
                            <CharacterList
                                characters={unselected}
                                onClick={this.handleCharacterChange(false)}
                                type='unselected'
                            />
                        </div>
                    }

                    <Divider className={classes.divider}/>
                    <Typography type="subheading">Chosen</Typography>
                    <CharacterList
                        characters={[chosen]}
                        type='chosen'
                    />
                </CardContent>

                <CardActions>
                    <Tooltip title="Choose New Character">
                        <IconButton color="primary" onClick={this.handleRandomize}>
                            <ReplayIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Reset Selection">
                        <IconButton color="accent" onClick={this.handleReset}>
                            <ClearIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Invert Selection">
                        <IconButton onClick={this.handleInverse}>
                            <SelectAllIcon/>
                        </IconButton>
                    </Tooltip>
                    {
                        !hide &&
                        <Tooltip title="Hide Unselected Characters">
                            <IconButton onClick={this.handleVisibilityChange(true)}>
                                <VisibilityOffIcon/>
                            </IconButton>
                        </Tooltip>
                    }
                    {
                        hide &&
                        <Tooltip title="Show Unselected Characters">
                            <IconButton onClick={this.handleVisibilityChange(false)}>
                                <VisibilityIcon/>
                            </IconButton>
                        </Tooltip>
                    }
                </CardActions>
            </Card>
        )
    }
}

const localStorageKey = 'characters'

const styles = theme => ({
    card: {
        margin: 16,
        minWidth: 345
    },
    divider: {
        marginTop: 8,
        marginBottom: 8
    }
})

export default withStyles(styles)(Randomizer)
