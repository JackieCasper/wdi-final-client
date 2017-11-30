import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { setUser, updateModalContents, openModal } from '../actions';
// import { bindActionCreators } from 'redux';
import Card from './Card';
import TurnControls from './TurnControls';
import Deck from './Deck';
import Images from '../helpers/images';

class Hand extends Component {
  renderHand(){
    console.log(this.props.player);
    return this.props.player.hand.map((card, i)=>{
      let cardType = card.playable ? 'playable' : 'notPlayable';
      if (this.props.player.buildingTurn.find((c)=>{
        return card.id === c.id;
      })){
        cardType = 'selected';
      }
      return(
        <Card key={i} card={card} cardImg={Images[cardType][card.suit + card.value]}></Card>
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
