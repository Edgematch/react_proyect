import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';

//features
import {loggedUser} from '../Auth/authSlice';
import {selectDarkmodeState} from '../features/Darkmode/DarkmodeSlice';

//auth
import {auth} from '../services/firebase';
import {onAuthStateChanged} from 'firebase/auth';


//layout component
import Layout from '../components/Layout/Layout'

//pages
import Dashboard from '../pages/Dashboard/Dashboard';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import TransactionsPage from '../pages/TransactionsPage/TransactionsPage';
import AccountsPage from '../pages/AccountsPage/AccountsPage';
import Loading from '../components/Loading/Loading';


const Routes=()=>{


    const [routesLoading, setRoutesLoading] = useState(true)
    const dark = useSelector(selectDarkmodeState)
 
    const dispatch = useDispatch();

    useEffect(()=>{ 
        const unsubscribe = onAuthStateChanged(auth, (user) => {           
            dispatch(loggedUser(user));
            setRoutesLoading(false)
        })
        return unsubscribe;

    }, [])

    if(routesLoading) return <Loading/>

    return ( 
        <Container fluid className={dark ?'ps-0 pe-0 bg-dark': 'ps-0 pe-0 bg-light'}>
            <Router>
                <Switch>
                <Layout exact path="/" component={Dashboard}/>
                <Layout exact path="/transactions" component={TransactionsPage}/>
                <Layout exact path="/accounts" component={AccountsPage}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                </Switch>
            </Router>
        </Container>          
    )
}

export default Routes
