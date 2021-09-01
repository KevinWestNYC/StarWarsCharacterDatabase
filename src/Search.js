import React, { useState } from 'react'

export default function Search({ getQuery }) {
    const [text, setText] = useState('')

    const onChange = (query) => {
        setText(query)
        getQuery(query)
    }
    

    return (
        <div className ="search">
            <form>
                <input 
                    type='text'
                    className="form-control"
                    placeholder="Search Characters"
                    value={text}
                    onChange={(e) => onChange(e.target.value)}
                    autoFocus
                />
            </form>
        </div>
    )
}
