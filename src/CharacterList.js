import React from 'react'

export default function CharacterList({ characters }) {
    return (
        <div>
            {characters.map(character => (
                <div key={character}>{character}</div>
            ))}
        </div>
    )
}
