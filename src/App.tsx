import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './page/login';

import Register from './page/Register';

import Dashboard from './page/Dashboard';
import Shop from './page/shop';
import ReStock from './page/restock';
import Checkout from './page/checkout';
import History from './page/history';
import Account from './page/account';



const App: React.FC = () => {

    return (

        <Router>

            <Routes>

                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<Dashboard />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/restock' element={<ReStock />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/history' element={<History />} />
                <Route path='/account' element={<Account />} />
                <Route path='/' element={<Login />} />

            </Routes>

        </Router>

    );

};



export default App; 