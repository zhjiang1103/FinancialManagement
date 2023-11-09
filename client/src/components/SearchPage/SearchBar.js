import React from 'react'
import {Button,Form} from "react-bootstrap"

const SearchBar = (props) => {

    //handle submit event to pass user input to parent component
    const handleSubmit = (event) => {
        event.preventDefault()
        props.onSubmit(event.target.elements.search.value)//prevents rerendering
    }
        

    return (
        <>
           
            <Form className='searchBar' onSubmit={handleSubmit}>

                <input 
                    type="text"
                    name="search"
                    id="add-user-name"
                    placeholder="Search by movie title or person name"

                />
                <Button type="submit" variant="outline-success">Search</Button>
            </Form>

        </>
    )
}

export default SearchBar