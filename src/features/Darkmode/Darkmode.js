import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Button} from 'react-bootstrap'; 
import {turnDarkMode, selectDarkmodeState} from './DarkmodeSlice';


const Darkmode = () => {

    const dispatch = useDispatch();
    const dark = useSelector(selectDarkmodeState);
    const theme = dark ? 'secondary': 'dark'

    const setDarkmode = ()=>{
        dispatch(turnDarkMode());
    }

    return (
        <>
            <Button variant={theme} onClick={setDarkmode}>{dark ? 'light' : 'dark'}</Button> 
        </>
    )
}

export default Darkmode
