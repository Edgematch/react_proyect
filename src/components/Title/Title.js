import React from 'react';
import {useSelector} from 'react-redux';
import {selectDarkmodeState} from '../../features/Darkmode/DarkmodeSlice';

const Title = ({title}) => {
    const dark = useSelector(selectDarkmodeState)
    const theme = dark ?  'mt-5 fw-bold text-secondary' : 'mt-5 fw-bold text-primary'
    return (
        <h1 className={theme}>{title}</h1>
    )
}

export default Title
