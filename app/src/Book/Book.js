import React from 'react';
import './Book.css'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Book = (props) => {
    return (
        <>
            <Card className = 'mb-4 box-shadow' >
                <Card.Header>{props.isbn}</Card.Header>
                <Card.Img variant='top' src =''></Card.Img>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.author}</Card.Subtitle>
                    <Card.Text>{props.description}</Card.Text>
                    <Button variant="primary">Visualizza</Button>
                </Card.Body>
            </Card>
        </>
    );
};

export default Book;