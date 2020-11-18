import React from 'react';
import './Book.css'

const book = (props) => {
    return (
        <div className = 'Book'>
            <h5>ISBN</h5>
            <p>{props.isbn}</p>
            <br></br>
            <h5>Title</h5>
            <p>{props.title}</p>
            <br></br>
            <h5>Author</h5>
            <p>{props.author}</p>
            <br></br>
            <h5>Year</h5>
            <p>{props.year}</p>
            <br></br>
            <h5>Editor</h5>
            <p>{props.editor}</p>
            <br></br>
            <h5>Description</h5>
            <p>{props.description}</p>
            <br></br>
        </div> 
    );
};

export default book;