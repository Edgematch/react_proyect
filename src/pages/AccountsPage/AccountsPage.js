import React from 'react';
import {Container} from 'react-bootstrap';

import Accounts from '../../features/Accounts/Accounts'

const AccountsPage = () => {
    return (
    <Container  className='pt-5' style={{minHeight: '100vh'}}>
        <Accounts/>
    </Container>
    )
}

export default AccountsPage
