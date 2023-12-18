import React from 'react'
import {Button, Form} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const RecomForm = (props) => {

//handle form submition to pass user input to parent component
const handleAddForm = (event) =>{
  event.preventDefault()
  props.onSubmit(event.target.elements.purpose.value)
}

  return (
    <>
    <div className='RecomMessage'>
      <span>Welcome! My name is <strong>Cinenova</strong>. I am going to find right movies for you.</span>
      <img src = "http://www.animated-gifs.fr/category_objects/robots/10660215.gif" alt = "Robot gif"></img>
      
      </div>
    <Form className='RecomMessage' onSubmit={handleAddForm}>
            <Form.Group>
                <Form.Label>Tell me what is your purpose of watching a movie?</Form.Label>
                <input
                    type="text"
                    name="purpose"
                    id="add-user-purpose"
                    placeholder="purpose"
                    required
                />
            </Form.Group>
           
            <Form.Group>
                <Button type="submit" variant="outline-success">
                    Get Recommendation
                </Button>

            </Form.Group>
        </Form>
       


    </>
  )
}

export default RecomForm