import React, { Component } from 'react';
import { connect } from 'react-redux';
import Images from '../helpers/images';


class Deck extends Component {

  renderDeckCards(){
    return this.props.deck.cards.map((card, i)=>{
      return (
        <img src={Images.playable[card.suit + card.value]} key={i} className='deck-card' />
      )
    })
  }

  render(){
    return(
      <div className='deck'>
        {this.renderDeckCards()}
      </div>
    )

  }
}

function mapStateToProps(state){
  return {
    deck: state.deck
  }
}

export default connect(mapStateToProps)(Deck)
