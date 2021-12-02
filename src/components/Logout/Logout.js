import React from 'react';
import {Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import {logout} from '../../Auth/authSlice';
import { useDispatch } from 'react-redux';

const Logout = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogOut = (e)=>{
        e.preventDefault();
        dispatch(logout());
        history.push('/login')
    }

    return (
         <Button variant='info' className='text-light' onClick={handleLogOut}>Log out</Button>
    )
}

export default Logout
