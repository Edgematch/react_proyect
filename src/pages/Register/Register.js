import {Card, Form, Stack , Button, Alert} from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import {useRef} from 'react'; 
import { useSelector, useDispatch} from 'react-redux';
import {register, selectCurrentUser,  selectIsLoading, selectHasError } from '../../Auth/authSlice';

function Register() {

    const email = useRef(); 
    const password = useRef();
    const passwordConfirm = useRef();

    const currentUser = useSelector(selectCurrentUser)
    const loading = useSelector(selectIsLoading);
    const error = useSelector(selectHasError);

    const dispatch = useDispatch();

    const handleSubmit = async (e)=>{

        e.preventDefault();

        if (password.current.value !== passwordConfirm.current.value) return 

        const userData = {
            email: email.current.value,
            password: password.current.value
        }
        
        dispatch(register(userData));
        
    }

    if (currentUser) return <Redirect to='/'/>

    return (
        <div className='d-flex align-items-center justify-content-center' style={{minHeight: '100vh'}}>
            <div className= 'w-100' style={{maxWidth: '500px'}}>
                <Card bg={'transparent'} text={'dark'} border={'light'} className='p-5'>
                    <Card.Body>
                        <Card.Title className='text-primary mb-5 fs-1 fw-bold'>Register</Card.Title>
                        {error && <Alert variant={'danger'}>{error.message}</Alert>}
                        <Form onSubmit={handleSubmit}>
                        <Stack direction="vertical" gap={3}>
                            <Form.Group id='email'>
                                <Form.Label className='fs-4 text-info'>Email</Form.Label>
                                <Form.Control type='email' ref={email} required/> 
                            </Form.Group>
                            <Form.Group id='password'>
                                <Form.Label className='fs-4 text-info'>Password</Form.Label>
                                <Form.Control type='password' ref={password}required/> 
                            </Form.Group>
                            <Form.Group id='password-confirm'>
                                <Form.Label className='fs-4 text-info'>Confirm Password</Form.Label>
                                <Form.Control type='password' ref={passwordConfirm} required/> 
                            </Form.Group>

                            <Button type="submit" disabled={loading} variant={'primary'} className='mt-5 text-light fs-4'>Register</Button> 
                            </Stack>
                        </Form>

                        <Card.Text className='mt-3 text-center'> Already a user? <Link to='/login'>Log In</Link></Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Register