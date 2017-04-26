import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {

  render(){
    return(
      <div className='landing'>
        <div className='landing-contents'>
          <h1>Back End Socket</h1>
          <div className='landing-options'>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
          </div>

        </div>
      </div>
    )
  }

}

export default Landing
