import React from 'react'
import Character from './Character'
import Masonry from 'react-masonry-component'

class CharacterList extends React.Component {
    render() {
        const {characters, onCharacterClick, type} = this.props

        return (
            <Masonry>
                {
                    characters.map((data, key) =>
                        <Character
                            key={key}
                            data={data}
                            onCharacterClick={onCharacterClick}
                            type={type}
                        />
                    )
                }
            </Masonry>
        )
    }
}

export default CharacterList
