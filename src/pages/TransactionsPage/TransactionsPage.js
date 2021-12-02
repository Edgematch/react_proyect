import React from 'react'
import {Container} from 'react-bootstrap'

import Transactions from '../../features/transactions/Transactions'

const TransactionsPage = () => {
    return (
        <Container className='pt-5' style={{minHeight: '100vh'}}>
            <Transactions/>
        </Container>
    )
}

export default TransactionsPage
