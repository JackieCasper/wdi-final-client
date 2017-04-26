import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/App.css';
import Auth from 'j-toker';
import {connect} from 'react-redux';
import { updateInputs, setUser } from '../actions';
import { bindActionCreators } from 'redux';
import LoadScreen from './LoadScreen';
import InputHelper from '../helpers/inputs';

class Signup extends Component {
  componentDidMount(){
    InputHelper.initInputs(this, {username: '', email: '', password: '', password_confirmation: ''});

  }

  signup(e){
    const self = this;
    if(e){
      e.preventDefault();
    }
    Auth
      .emailSignUp(InputHelper.requestInputs(this))
      .then(data => {
        this.props.history.push('/games');
      })
      .catch(err => {
        console.log(err);
      })
  }

  render(){
    if(this.props.inputs && this.props.inputs.username){
      return(
        <div className='landing'>
          <div className='user-form-container'>
            <form className='user-form' onSubmit={(e)=>{this.signup(e)}}>
              <h2>Sign Up</h2>

              <label htmlFor='username'>username<span className='input-validations'></span></label>
              <input id='username' value={this.props.inputs.username.value} onChange={(e)=>{InputHelper.changeInput(this, 'username', e)}} />
              <ul className='input-errors'>{InputHelper.renderInputErrors(this, 'username')}</ul>

              <label htmlFor='email'>email<span className='input-validations'></span></label>
              <input type='email' id='email' value={this.props.inputs.email.value} onChange={(e)=>{InputHelper.changeInput(this, 'email', e)}} />
              <ul className='input-errors'>{InputHelper.renderInputErrors(this, 'email')}</ul>

              <label htmlFor='password'>password<span className='input-validations'></span></label>
              <input type='password' id='password' value={this.props.inputs.password.value} onChange={(e)=>{InputHelper.changeInput(this, 'password', e)}} />
              <ul className='input-errors'>{InputHelper.renderInputErrors(this, 'password')}</ul>

              <label htmlFor='password_confirmation'>confirm password<span className='input-validations'></span></label>
              <input type='password' id='password_confirmation' value={this.props.inputs.password_confirmation.value} onChange={(e)=>{InputHelper.changeInput(this, 'password_confirmation', e)}} />
              <ul className='input-errors'>{InputHelper.renderInputErrors(this, 'password_confirmation')}</ul>

              <button className='submit-button' onClick={(e)=>{this.signup(e)}}>Sign Up</button>
              <p>Already have an account? <Link to='/login'>Log in now.</Link></p>
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
  return bindActionCreators({updateInputs: updateInputs, setUser: setUser}, dispatch);
}

function mapStateToProps(state){
  return {
    inputs: state.inputs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
