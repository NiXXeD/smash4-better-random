import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import githubSvg from './img/github.svg'

class Nav extends React.Component {
    render() {
        return (
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography type="title" style={{flex: 1}}>Smash 4 Better Random</Typography>

                    <IconButton target="_blank" href="https://github.com/NiXXeD/smash4-better-random">
                        <img alt="github link" width="24" height="24" src={githubSvg}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Nav
