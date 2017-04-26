import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser, removeSubscriptions } from '../actions';
import { bindActionCreators } from 'redux';
import LoadScreen from './LoadScreen';
import Auth from '../helpers/Auth';

class Logout extends Component{

  logout(){
    const self = this;
    Auth
      .signOut()
      .then(data => {
        this.props.setUser(null);
        this.props.removeSubscriptions();
        console.log(this.props);
        location.href = '/';
      })
      .fail(err => {
        console.log(err);
      });
  }


  render(){
    return(
      <button onClick={()=>{this.logout()}} className='logout'></button>
    )
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({setUser: setUser,
    removeSubscriptions: removeSubscriptions}, dispatch);
}

function mapStateToProps(state){
  return {
    subscriptions: state.subscriptions,
    current_user: state.current_user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
