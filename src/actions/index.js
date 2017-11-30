import _ from 'lodash';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';

export function setUser(user){
  console.log(user);
  return {
    type: UPDATE_CURRENT_USER,
    payload: user
  }
}

export const UPDATE_INPUTS = 'UPDATE_INPUTS';

export function updateInputs(inputs){
  return{
    type: UPDATE_INPUTS,
    payload: inputs
  }
}

export const UPDATE_GAMES = 'UPDATE_GAMES';

export function updateGames(games){
  return{
    type: UPDATE_GAMES,
    payload: games
  }
}

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const UPDATE_MODAL_CONTENTS = 'UPDATE_MODAL_CONTENTS';


export function openModal(){
  return{
    type: OPEN_MODAL,
    payload: true
  }
}

export function closeModal(){
  return{
    type: CLOSE_MODAL,
    payload: false
  }
}

export function updateModalContents(content){
  return{
    type: UPDATE_MODAL_CONTENTS,
    payload: content
  }
}

export const UPDATE_GAME = 'UPDATE_GAME';

export function updateGame(game){
  return{
    type: UPDATE_GAME,
    payload: game
  }
}

export const ADD_SUBSCRIPTION = 'ADD_SUBSCRIPTION'

export function addSubscription(name, subscription){
  return{
    type: ADD_SUBSCRIPTION,
    payload: {name: name, subscription: subscription}
  }
}

export const REMOVE_SUBSCRIPTIONS = 'REMOVE_SUBSCRIPTIONS'
export function removeSubscriptions(){
  return{
    type: REMOVE_SUBSCRIPTIONS,
    payload: {}
  }
}

export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const UPDATE_HAND = 'UPDATE_HAND'

export function updatePlayer(player, deck){
  let { hand, is_turn, buildingTurn } = player;

  let playableHand;
  if(is_turn){
    console.log('it is the players turn');
    if(deck.comparer === 'first'){
      console.log('first turn');
      playableHand = _.map(hand, (card)=>{
        card.playable = card.value === 3;
        return card
      })
    } else if (deck.cards.length > 1 && !buildingTurn.length){
      const grouped_values = _.groupBy(player.hand, (card)=>{
        return card.value
      })
        playableHand = _.map(player.hand, (card)=>{
          const group_total = _.reduce(grouped_values[card.value], (sum, card)=>{
            return sum + card.comparer
          }, 0);
          card.playable = (grouped_values[card.value].length >= deck.cards.length &&
            group_total > deck.comparer &&
            card.value > deck.cards[0].value) ||
            card.value === 2
            || (card.value === deck.cards[0].value && grouped_values[card.value].length + deck.cards.length === 4)
          return card;
        })

    } else if(buildingTurn.length){
      console.log('something has been chosen');
      const playedValue = buildingTurn[0].value;
      playableHand = _.map(player.hand, (card)=>{
        card.playable = card.value === playedValue;
        return card;
      })
    } else if(!deck.comparer){
      console.log('deck was cleared');
      playableHand = _.map(player.hand, (card)=>{
        card.playable = true;
        return card
      })
    } else {
      console.log('default')
      // const totals = _.reduce(player.hand, (blding, card)=>{
      //   blding[card.value] = blding[card.value] ? blding[card.value] + card.comparer : card.comparer;
      //   return blding
      // })
      console.log('HAND-------', hand);
      console.log('PLAYER HAND---------', player.hand);
      playableHand = _.map(player.hand, (card)=>{
        card.playable = card.value > deck.cards[0].value || card.value === 2
        return card;
      })
    }
  } else {
    console.log('not the players turn')
    if(deck.comparer === 'first' || !deck.comparer){
      console.log('first turn or deck cleared')
      playableHand = _.map(hand, (card)=>{
        card.playable = false;
        return card;
      })
    } else {
      console.log('everything else')
      const matching = _.filter(hand, (card)=>{
        return card.value === deck.cards[0].value
      }).length + deck.cards.length === 4;
      playableHand = _.map(hand, (card)=>{
        card.playable = card.value === 2 || (card.value === deck.cards[0].value && matching)
        return card

      })
    }
}
  playableHand.sort((a,b)=>{
    return(b.comparer - a.comparer);
  });

  const orderedHand = _.reduce(playableHand, (blding, card)=>{
    console.log(playableHand);
    const playable = card.playable ? 1 : 0;
    console.log(playable);
    blding[playable].push(card);
    return blding;
  }, [[],[]]);

  const finalHand = orderedHand[0].concat(orderedHand[1]);

  player.hand = finalHand
  player.buildingTurn = buildingTurn

  return{
    type: UPDATE_PLAYER,
    payload: player
  }
}


export const UPDATE_PLAYERS = 'UPDATE_PLAYERS';
export function updatePlayers(players){
  return{
    type: UPDATE_PLAYERS,
    payload: players
  }
}

export const UPDATE_DECK = 'UPDATE_DECK';
export function updateDeck(deck){
  return{
    type: UPDATE_DECK,
    payload: deck
  }
}

export const UPDATE_WINNERS = 'UPDATE_WINNERS';
export function updateWinners(winners){
  return{
    type: UPDATE_WINNERS,
    payload: winners
  }
}

export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export function setMessages(messages){
  console.log(messages);
  return{
    type: UPDATE_MESSAGES,
    payload: messages
  }
}

export const ADD_MESSAGE = 'ADD_MESSAGE'
export function addMessage(message){
  return{
    type: ADD_MESSAGE,
    payload: message
  }
}

export const UPDATE_CHAT_OPEN  = 'UPDATE_CHAT_OPEN'
export function openChat(){
  return{
    type: UPDATE_CHAT_OPEN,
    payload: true
  }
}
export function closeChat(){
  return{
    type: UPDATE_CHAT_OPEN,
    payload: false
  }
}

export const UPDATE_CABLE = 'UPDATE_CABLE';
export function updateCable(cable){
  return{
    type: UPDATE_CABLE,
    payload: cable
  }
}
