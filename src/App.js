import React from 'react'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import {red, yellow} from 'material-ui/colors'
import Randomizer from './Randomizer'
import Nav from './Nav'

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Nav/>
                    <Randomizer/>
                </div>
            </MuiThemeProvider>
        )
    }
}

const theme = createMuiTheme({
    palette: {
        primary: red,
        secondary: yellow,
        type: 'dark'
    }
})

export default App
