import React, { useState } from 'react'

export default function Search({ handleSearch }) {
    const [text, setText] = useState('')    

    return (
        <div className ="search">
            <form onSubmit={(e) => handleSearch(e, text)}>
                <input 
                    type='text'
                    className="form-control"
                    placeholder="Search Characters"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    autoFocus
                />
            </form>
        </div>
    )
}
