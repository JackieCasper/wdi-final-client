import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePlayer } from '../actions';
import { bindActionCreators } from 'redux';
import Images from '../helpers/images';
import _ from 'lodash';


class Card extends Component {
  componentDidMount(){
    if(this.props.card.value === 3 && this.props.card.suit === 'd' && !this.props.player.buildingTurn.find((card)=>{
      return card.id === this.props.card.id
    })){
      this.props.player.buildingTurn = [this.props.card, ...this.props.player.buildingTurn]
      this.props.updatePlayer(this.props.player, this.props.deck);
    }
  }
  onClick(){
    if(this.props.card.playable){
      console.log('.................', newTurn, this.props.card);
      let newTurn;
      if(this.props.card.value === 3 && this.props.card.suit === 'd'){
        console.log('======================')
        newTurn = [...this.props.player.buildingTurn];
      } else if (this.props.player.buildingTurn.find((card)=>{
        return card.id === this.props.card.id
      })){
        newTurn = _.filter(this.props.player.buildingTurn, (card)=>{
          return this.props.card.id !== card.id;
        });

      }else {
        newTurn = [...this.props.player.buildingTurn];
        newTurn.push(this.props.card);
      }
      console.log(newTurn);
      const newPlayer = {...this.props.player}
      newPlayer.buildingTurn = newTurn
      this.props.updatePlayer(newPlayer, this.props.deck)

    }
  }

  render(){

    let cardType = this.props.card.playable ? 'playable' : 'notPlayable';
    if (this.props.player.buildingTurn.find((card)=>{
      return card.id === this.props.card.id
    })){
      cardType = 'selected'
    }

    return(
      <div className='card-container'>
        <img alt={`${this.props.card.suit} ${this.props.card.value}`} onClick={()=>{this.onClick()}} className='card' src={ Images[cardType][this.props.card.suit + this.props.card.value] } />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({updatePlayer: updatePlayer}, dispatch);
}

function mapStateToProps(state){
  return {
    player: state.player,
    deck: state.deck
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)
