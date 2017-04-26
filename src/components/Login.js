import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/App.css';
import Auth from '../helpers/Auth';
import {connect} from 'react-redux';
import { updateInputs } from '../actions';
import { bindActionCreators } from 'redux';
import LoadScreen from './LoadScreen';
import InputHelper from '../helpers/inputs';


class Login extends Component {
  componentDidMount(){
    InputHelper.initInputs(this, {email: '', password: ''});
  }

  login(e){
    const self = this;
    if(e){
      e.preventDefault();
    }

    Auth
      .emailSignIn(InputHelper.requestInputs(this))
      .then(data => {
        location.href = '/games';
      })
      .catch(err => {
        console.log(err);
      })
  }

  render(){
    if(this.props.inputs){
      return(
        <div className='landing'>

            <div className='user-form-container'>
              <form className='user-form' onSubmit={(e)=>{this.login(e)}}>
                <h2>Login</h2>

                <label htmlFor='email'>email<span className='input-validations'></span></label>
                <input type='email' id='email' value={this.props.inputs.email.value} onChange={(e)=>{InputHelper.changeInput(this, 'email', e)}} />
                <ul className='input-errors'>{InputHelper.renderInputErrors(this, 'email')}</ul>

                <label htmlFor='password'>password<span className='input-validations'></span></label>
                <input type='password' value={this.props.inputs.password.value} onChange={(e)=>{InputHelper.changeInput(this, 'password', e)}} />
                <ul className='input-errors'>{InputHelper.renderInputErrors(this, 'password')}</ul>

                <button className='submit-button' onClick={(e)=>{this.login(e)}}>Log In</button>
                <p>Don't have an account? <Link to='/signup'>Sign up now.</Link></p>
              </form>

          </div>
        </div>

      )
    }
    return(
      <div className='container'>
        <LoadScreen />
      </div>
    )


  }

}

function mapDispatchToProps(dispatch){
  return bindActionCreators({updateInputs: updateInputs}, dispatch);
}

function mapStateToProps(state){
  return {
    inputs: state.inputs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
