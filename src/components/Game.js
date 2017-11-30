import React, { Component } from 'react';
import { connect } from 'react-redux';
import Hand from './Hand';
import Players from './Players';
import Win from './Win';



class Game extends Component {

  render(){
    if(this.props.game.in_progress){
      return(
        <div className="Game">
          <Players />
          <Win history={this.props.history} />
          <Hand />
        </div>
      )
    } else {
      return(
        <div></div>
      )
    }
  }
}

function mapStateToProps(state){
  return {
    game: state.game
  }
}

export default connect(mapStateToProps)(Game)
