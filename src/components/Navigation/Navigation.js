import React from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'

import Logout from '../Logout/Logout';
import Darkmode from '../../features/Darkmode/Darkmode';
import logo from '../../assets/logo.png';

const Navigation=()=> {

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" fixed={'top'}>
            <Container>
            <LinkContainer to='/transactions'>   
                <Navbar.Brand className={'text-secondary fw-bold'}><img alt={'logo'} src={logo}/>MoneyTracker</Navbar.Brand>
            </LinkContainer> 
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <LinkContainer to='/transactions'>
                        <Nav.Link>Transactions</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/accounts'>
                        <Nav.Link>Accounts</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/budgets'>
                        <Nav.Link>Budgets</Nav.Link>
                    </LinkContainer>           
                </Nav>
                <Nav>
                    <Darkmode/>
                    <Logout/>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation
