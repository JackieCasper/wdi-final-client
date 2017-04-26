import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Games from './components/Games';
import Login from './components/Login';
import SignUp from './components/Signup';
import Landing from './components/Landing';
import Play from './components/Play';



export default (
  <BrowserRouter>
    <div className="page">
      <div className='container'>
        <Route exact path='/' component={Landing} />
        <Route path='/games' component={Games} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/play/:id' component={Play} />
      </div>
    </div>
  </BrowserRouter>
)
