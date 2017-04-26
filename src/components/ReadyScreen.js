import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import LoadScreen from './LoadScreen';

class ReadyScreen extends Component{

  ready(){
    this.props.subscriptions.game.perform('set_ready', {ready: this.props.players.find((player)=>{ return this.props.current_user.id === player.user_id }).ready ? false : true});
  }

  renderPlayers(){
    return _.map(this.props.players, (player, i)=>{
      return (
        <li key={i}>
          <h3>{player.username}</h3>
          <p>{player.ready ? 'Ready' : 'Not Ready'}</p>
        </li>
      )
    })
  }


  render(){
    if(this.props.game){
      if(this.props.game.in_progress){
        return(
          <div></div>
        )
      }
      return(
        <div className='ReadyScreen'>
          <ul className='ready-list'>
            {this.renderPlayers()}
          </ul>
          <button onClick={()=>{this.ready()}}>Ready</button>
        </div>
      )
    }
    return(
      <div>
      <LoadScreen />
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    game: state.game,
    players: state.players,
    subscriptions: state.subscriptions,
    current_user: state.current_user
  }
}

export default connect(mapStateToProps)(ReadyScreen)
