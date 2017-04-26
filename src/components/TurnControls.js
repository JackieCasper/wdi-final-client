import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTurn } from '../actions';
import { bindActionCreators } from 'redux';
import _ from 'lodash';


class TurnControls extends Component {

  pass(){
    this.props.subscriptions.game.perform('pass', {order_index: this.props.player.order});

  }
  play(){
    if(this.canPlay()){
      this.props.subscriptions.game.perform('play', {cards: this.props.player.buildingTurn, order_index: this.props.player.order});
    }
  }

  turnTotal(){
    return _.reduce(this.props.player.buildingTurn, (total, card)=>{
      return total + card.comparer
    }, 0)
  }

  canPlay(){
    const total = this.turnTotal()
    console.log("----------------TOTAL", total);
    console.log('++++++++++++++++++deck comparer', this.props.deck.comparer);
    if (!this.props.player.buildingTurn.length){
      return false;
    }
    if(this.props.player.buildingTurn.find((card)=>{
      return card.value === 2
    })){
      return true;
    } else if (this.props.deck.cards.length + this.props.player.buildingTurn.length === 4){
      if(this.props.deck.cards.length){
        if (this.props.deck.cards[0].value === this.props.player.buildingTurn[0].value){
          return true;
        }
      } else {
        return true;
      }
    }
    if(this.props.deck.cards.length > this.props.player.buildingTurn.length){
      return false;
    }else if((total > this.props.deck.comparer) || (this.props.deck.comparer === 'first' && total)){
      return true;
    }
    return false;
  }

  render(){
    if (this.props.player.is_turn){
      return(
        <div className='turn-controls'>
          <button className='pass-button' onClick={()=>{this.pass()}} >Pass</button>
          <button className={`play-button${this.canPlay() ? ' can-play' : ''}`} onClick={()=>{this.play()}}>Play</button>
        </div>
      )
    }else{
      return(
        <div className='turn-controls'>
          <button className={`play-button${this.canPlay() ? ' can-play' : ''}`} onClick={()=>{this.play()}}>Play</button>
        </div>
      )
    }

  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({updateTurn: updateTurn}, dispatch);
}

function mapStateToProps(state){
  return {
    subscriptions: state.subscriptions,
    player: state.player,
    deck: state.deck
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TurnControls)
