import React from 'react'

const SearchBar = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault()
        props.onSubmit(event.target.elements.search.value)//prevents rerendering
    }
        

    return (
        <>
            <div>SearchBar</div>
            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="search"
                    id="add-user-name"
                    placeholder="Search by movie title"

                />
                <button type="submit">Search</button>
            </form>

        </>
    )
}

export default SearchBar