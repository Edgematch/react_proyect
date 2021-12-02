
import React from 'react';
import {Container, Card, Alert} from 'react-bootstrap';
import {selectCurrentUser, selectHasError } from '../../Auth/authSlice';
import { useSelector } from 'react-redux';

const Dashboard =()=> {

    const currentUser = useSelector(selectCurrentUser)
    const error = useSelector(selectHasError);

    const getToken = async()=>{
        const idToken = await currentUser.getIdToken();
        console.log(idToken);
        return idToken
    }

    getToken();
    

    return (
    <Container className='pt-5' style={{minHeight: '100vh'}}>
        <Card bg={'transparent'} text={'dark'} border={'light'} className='p-5'>
            <Card.Body>
                <Card.Title className='text-primary mb-5 fs-1 fw-bold'>Profile</Card.Title>
                {error && <Alert variant={'danger'}>{error}</Alert>}
                
                <Card.Text>Email: {currentUser.email}</Card.Text>
            </Card.Body> 
        </Card>
    </Container>
    )
}

export default Dashboard
