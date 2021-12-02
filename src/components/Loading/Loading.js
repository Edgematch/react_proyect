import React from 'react'
import {Container, Spinner} from 'react-bootstrap';

const Loading =()=> {
    return (
        <Container fluid className='ps-0 pe-0 bg-light '>
            <div className='d-flex align-items-center justify-content-center' style={{minHeight: '100vh'}}>
            <Spinner animation="border" role="status" variant="info">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            </div>
        </Container>
    )
}

export default Loading
