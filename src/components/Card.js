import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePlayer } from '../actions';
import { bindActionCreators } from 'redux';
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

    return(
      <div className='card-container'>
        <img alt={`${this.props.card.suit} ${this.props.card.value}`} onClick={()=>{this.onClick()}} className='card' src={ this.props.cardImg } />
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

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { updatePlayer } from '../actions';
// import { bindActionCreators } from 'redux';
// // import Images from '../helpers/images';
// import _ from 'lodash';
//
//
// class Card extends Component {
//   componentDidMount(){
//     if(this.props.card.value === 3 && this.props.card.suit === 'd' && !this.props.player.buildingTurn.find((card)=>{
//       return card.id === this.props.card.id
//     })){
//       this.props.player.buildingTurn = [this.props.card, ...this.props.player.buildingTurn]
//       this.props.updatePlayer(this.props.player, this.props.deck);
//     }
//   }
//   onClick(){
//     if(this.props.card.playable){
//       console.log('.................', newTurn, this.props.card);
//       let newTurn;
//       if(this.props.card.value === 3 && this.props.card.suit === 'd'){
//         console.log('======================')
//         newTurn = [...this.props.player.buildingTurn];
//       } else if (this.props.player.buildingTurn.find((card)=>{
//         return card.id === this.props.card.id
//       })){
//         newTurn = _.filter(this.props.player.buildingTurn, (card)=>{
//           return this.props.card.id !== card.id;
//         });
//
//       }else {
//         newTurn = [...this.props.player.buildingTurn];
//         newTurn.push(this.props.card);
//       }
//       console.log(newTurn);
//       const newPlayer = {...this.props.player}
//       newPlayer.buildingTurn = newTurn
//       this.props.updatePlayer(newPlayer, this.props.deck)
//     }
//   }
//
//   render(){
//
//     let cardType = this.props.card.playable ? 'playable' : 'notPlayable';
//     if (this.props.player.buildingTurn.find((card)=>{
//       return card.id === this.props.card.id
//     })){
//       cardType = 'selected'
//     }
//
//     const symbols = {
//       d: `Card-Diamond-${this.props.value}`,
//       s: `Card-Spade-${this.props.value}`,
//       c: `Card-Clover-${this.props.value}`,
//       h: `Card-Heart-${this.props.value}`
//     }
//     const values = {
//       2:2,
//       3:3,
//       4:4,
//       5:5,
//       6:6,
//       7:7,
//       8:8,
//       9:9,
//       10:10,
//       11:'J',
//       12:'Q',
//       13:'K',
//       14:'A'
//     }
//
//     const black = '#222526';
//     const fadedBlack = '#494f52';
//     const red = '#c21b1f';
//     const fadedRed = 'c25d60';
//     const grey = '#E6E6E6';
//     const white = '#fff';
//
//     const colors = {
//       d: {
//         selected: {
//           front: white,
//           background: red
//         },
//         playable: {
//           front: red,
//           background: white
//         },
//         notPlayable:{
//           front: fadedRed,
//           background: grey
//         }
//       },
//       h: {
//         selected: {
//           front: white,
//           background: red
//         },
//         playable: {
//           front: red,
//           background: white
//         },
//         notPlayable:{
//           front: fadedRed,
//           background: grey
//         }
//       },
//       s: {
//         selected: {
//           front: white,
//           background: black
//         },
//         playable: {
//           front: black,
//           background: white
//         },
//         notPlayable:{
//           front: fadedBlack,
//           background: grey
//         }
//       },
//       c: {
//         selected: {
//           front: white,
//           background: black
//         },
//         playable: {
//           front: black,
//           background: white
//         },
//         notPlayable:{
//           front: fadedBlack,
//           background: grey
//         }
//       }
//     }
//     console.log(colors[this.props.card.suit][cardType]);
//     return(
//       <div className='card-container'>
//         <svg onClick={()=>{this.onClick()}} className='card'
//           xmlns="http://www.w3.org/2000/svg"
//           xmlnsXlink="http://www.w3.org/1999/xlink"
//           viewBox="0 0 719 1129">
//           <defs>
//             <style>{
//               `.cls-1-${this.props.card.suit + this.props.card.value}, .cls-3-${this.props.card.suit + this.props.card.value}{` +
//                   `fill:${colors[this.props.card.suit][cardType].front};` +
//                 `}` +
//                 `.cls-2-${this.props.card.suit + this.props.card.value}{`+
//                   `fill:${colors[this.props.card.suit][cardType].background};`+
//                 `}` +
//                 `.cls-3-${this.props.card.suit + this.props.card.value}{` +
//                   `font-size:120px;` +
//                   `font-family:Quicksand-Bold, Quicksand;font-weight:700;`+
//                 `}`
//             }</style>
//             <g id={`Card-Clover-${this.props.value}`} data-name={`Card-Clover-${this.props.value}`} viewBox="0 0 428 428">
//               <path className={`cls-1-${this.props.card.suit + this.props.card.value}`} d="M318.26,126.21c-.46,0-.91.06-1.38.07a109.74,109.74,0,1,0-216.67.41A109.71,109.71,0,1,0,194.6,305.53L170.1,428H257.9L233.4,305.53a109.74,109.74,0,1,0,84.85-179.32Z"/>
//             </g>
//             <g id={`Card-Diamond-${this.props.value}`} data-name={`Card-Diamond-${this.props.value}`} viewBox="0 0 400 428.29">
//               <path className={`cls-1-${this.props.card.suit + this.props.card.value}`} d="M204.25,1.79,398.71,210.94a4.62,4.62,0,0,1,0,6.41L204.25,426.51a6,6,0,0,1-8.5,0L1.29,217.35a4.62,4.62,0,0,1,0-6.41L195.75,1.79A6,6,0,0,1,204.25,1.79Z"/>
//             </g>
//             <g id={`Card-Heart-${this.props.value}`} data-name={`Card-Heart-${this.props.value}`} viewBox="0 0 371.96 370.41">
//               <path className={`cls-1-${this.props.card.suit + this.props.card.value}`} d="M185.79,53.18C162,13.52,118.64-6,83.73,1.63,29.3,13.52-45.54,96.8,36.11,215.76S187.79,370.41,187.79,370.41s66.41-35.69,148.06-154.65,6.8-202.24-47.63-214.13C253.32-6,210,13.52,186.17,53.18Z"/>
//             </g>
//             {/* <g id={`Card-Spade-${this.props.value}`} data-name={`Card-Spade-${this.props.value}`} viewBox="0 0 371.96 427.18">
//               <path className={`cls-1-${this.props.card.suit + this.props.card.value}`} d="M335.86,146.41C254.21,33.79,184.17,0,184.17,0S117.75,33.79,36.11,146.41,29.3,337.87,83.73,349.14c24.72,5.12,53.67-2.68,76.91-21l-17.19,99h84l-17.35-103c23.45,19,53,30.14,78.12,24.93C342.66,337.87,417.5,259,335.86,146.41Z"/>
//             </g> */}
//           </defs>
//           <title>card</title>
//           <g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
//             <g id="background">
//               <rect className={`cls-2-${this.props.card.suit + this.props.card.value}`} width="719" height="1129"/></g>
//               <g id="front">
//                 <text className={`cls-3-${this.props.card.suit + this.props.card.value}`} transform="translate(36.7 120.44)">{values[this.props.card.value]}</text>
//                 <text className={`cls-3-${this.props.card.suit + this.props.card.value}`} transform="translate(681.76 1005.41) rotate(180)">{values[this.props.card.value]}</text>
//                 <g id={`Card-Spade-${this.props.value}`} width="428" height="428" transform="translate(147 358)" data-name={`Card-Spade-${this.props.value}`} viewBox="0 0 371.96 427.18">
//                   <path className={`cls-1-${this.props.card.suit + this.props.card.value}`} d="M335.86,146.41C254.21,33.79,184.17,0,184.17,0S117.75,33.79,36.11,146.41,29.3,337.87,83.73,349.14c24.72,5.12,53.67-2.68,76.91-21l-17.19,99h84l-17.35-103c23.45,19,53,30.14,78.12,24.93C342.66,337.87,417.5,259,335.86,146.41Z"/>
//                 </g>
//                 {/* <use width="428" height="428" transform="translate(147 358)" xlinkHref={`#${symbols[this.props.card.suit]}`}/> */}
//                 <g id={`Card-Spade-${this.props.value}`} width="428" height="428" transform="translate(21 164) scale(0.24)" data-name={`Card-Spade-${this.props.value}`} viewBox="0 0 371.96 427.18">
//                   <path className={`cls-1-${this.props.card.suit + this.props.card.value}`} d="M335.86,146.41C254.21,33.79,184.17,0,184.17,0S117.75,33.79,36.11,146.41,29.3,337.87,83.73,349.14c24.72,5.12,53.67-2.68,76.91-21l-17.19,99h84l-17.35-103c23.45,19,53,30.14,78.12,24.93C342.66,337.87,417.5,259,335.86,146.41Z"/>
//                 </g>
//                 {/* <use width="428" height="428" transform="translate(21 164) scale(0.24)" xlinkHref={`#${symbols[this.props.card.suit]}`}/> */}
//                 <g id={`Card-Spade-${this.props.value}`} width="428" height="428" transform="translate(699 974) rotate(180) scale(0.24)" data-name={`Card-Spade-${this.props.value}`} viewBox="0 0 371.96 427.18">
//                   <path className={`cls-1-${this.props.card.suit + this.props.card.value}`} d="M335.86,146.41C254.21,33.79,184.17,0,184.17,0S117.75,33.79,36.11,146.41,29.3,337.87,83.73,349.14c24.72,5.12,53.67-2.68,76.91-21l-17.19,99h84l-17.35-103c23.45,19,53,30.14,78.12,24.93C342.66,337.87,417.5,259,335.86,146.41Z"/>
//                 </g>
//                 {/* <use width="428" height="428" transform="translate(699 974) rotate(180) scale(0.24)" xlinkHref={`#${symbols[this.props.card.suit]}`}/> */}
//               </g>
//             </g>
//           </g>
//         </svg>
//       </div>
//     )
//   }
// }
//
// function mapDispatchToProps(dispatch){
//   return bindActionCreators({updatePlayer: updatePlayer}, dispatch);
// }
//
// function mapStateToProps(state){
//   return {
//     player: state.player,
//     deck: state.deck
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Card)
