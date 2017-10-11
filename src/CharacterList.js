import React from 'react'
import Character from './Character'
import Masonry from 'react-masonry-component'

class CharacterList extends React.Component {
    render() {
        const {characters, onClick, selected} = this.props

        return (
            <Masonry style={styles.masonry}>
                {
                    characters.map((data, key) =>
                        <Character
                            key={key}
                            data={data}
                            onClick={onClick}
                            selected={selected}
                        />
                    )
                }
            </Masonry>
        )
    }
}

const styles = {
    masonry: {
        maxWidth: 500
    }
}

export default CharacterList
