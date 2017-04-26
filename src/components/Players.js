import React, { Component } from 'react';
import { connect } from 'react-redux';


class Players extends Component {

  renderPlayers(){
    return this.props.players.map((player, i)=>{
      return (
        <li className={`player${player.is_turn ? ' is-turn' : ''}`} key={i}>
          <h3>{player.username}</h3>
          <p>cards: {player.card_count}</p>
        </li>
      )
    })
  }

  render(){
    return(
      <div className='players'>
        {this.renderPlayers()}
      </div>
    )

  }
}

function mapStateToProps(state){
  return {
    players: state.players
  }
}

export default connect(mapStateToProps)(Players)
