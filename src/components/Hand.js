import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { setUser, updateModalContents, openModal } from '../actions';
// import { bindActionCreators } from 'redux';
import Card from './Card';
import TurnControls from './TurnControls';
import Deck from './Deck';

class Hand extends Component {
  renderHand(){
    console.log(this.props.player);
    return this.props.player.hand.map((card, i)=>{
      return(
        <Card key={i} card={card}></Card>
      )
    })
  }

  render(){
      return(
        <div className='hand-container'>
          <Deck />
          <TurnControls />
          <div className="Hand">
            {this.renderHand()}
          </div>
        </div>
      )

  }
}


// function mapDispatchToProps(dispatch){
//   return bindActionCreators({setUser: setUser,
//     openModal: openModal,
//     updateModalContents: updateModalContents}, dispatch);
// }
//
function mapStateToProps(state){
  return {
    player: state.player
  }
}

export default connect(mapStateToProps)(Hand)
