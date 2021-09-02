import React from 'react'

export default function Pagination({ goToNextPage, goToPrevPage, goToFirstPage }) {
    return (
        <div>
            {goToPrevPage && <button onClick={goToPrevPage}>Previous</button>}
            {goToNextPage && <button onClick={goToNextPage}>Next</button>}
        </div>
    )
}
