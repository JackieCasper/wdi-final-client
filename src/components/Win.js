import React, { Component } from 'react';
import { connect } from 'react-redux';



class Win extends Component {
  leaveGame(){
    this.props.history.push('/games');
  }

  renderScoreBoard(){
    return this.props.winners.map((winner, i)=>{
      return (
        <li key={i}>{winner.username}</li>
      )
    })
  }

  render(){
    if(this.props.winners.find((winner)=>{
      return winner.id === this.props.player.id
    })){
      return(
        <div className="score-container">
          <div className='score-content'>
            <div>
              <h2>Score Board</h2>
              <ol className='score-board'>
                {this.renderScoreBoard()}
              </ol>
            </div>
            <button className='submit-button' onClick={()=>{this.leaveGame()}}>Leave Game</button>
          </div>
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
    winners: state.winners,
    player: state.player
  }
}

export default connect(mapStateToProps)(Win)
