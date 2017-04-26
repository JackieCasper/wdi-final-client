import React, { Component } from 'react';
import Auth from '../helpers/Auth';
import { connect } from 'react-redux';
import { setUser, updateModalContents, openModal } from '../actions';
import { bindActionCreators } from 'redux';
import LoadScreen from './LoadScreen';
import GameList from './GameList';
import NewGame from './NewGame';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import Modal from './Modal';


class Games extends Component {
  componentDidMount(){
    console.log('AT GAMES ------------------')
    this.checkUser();
  }
  checkUser(attempt = 0){
    if(!this.props.current_user){
      Auth
        .validateToken()
        .then((user)=>{
          this.props.setUser(user);
        })
        .fail((error)=> {
          console.log(error);
          this.props.history.push('/login');
        });
    }
  }

  openNewGame(){
    const newGame=(
        <NewGame />
    )
    this.props.updateModalContents(newGame);
    this.props.openModal();
  }

  render(){
    if(this.props.current_user){
      return(
        <div className='Games'>
          <Modal />
          <Logout history={this.props.history} />
          <GameList />
          <button className='new-game-button' onClick={()=>{this.openNewGame()}}>New Game</button>
        </div>
      )
    } else {
      return(
        <div>
          <LoadScreen />
        </div>
      )
    }

  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({setUser: setUser,
    openModal: openModal,
    updateModalContents: updateModalContents}, dispatch);
}

function mapStateToProps(state){
  return {
    current_user: state.current_user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Games)
