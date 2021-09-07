import React, { useState } from 'react'

export default function Search({ handleSearch }) {
    const [text, setText] = useState('')    

    const onSearch = () => {
        handleSearch(e, text)
        setText('')
    }

    handleChange = e => {
        setText(e.target.value
    }

    return (
        <div className ="search">
            <form onSubmit={onSearch}>
                <input 
                    type='text'
                    className="form-control"
                    placeholder="Search Characters"
                    value={text}
                    onChange={handleChange}
                    autoFocus
                />
            </form>
        </div>
    )
}
