import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../helpers/Auth';
import { connect } from 'react-redux';
import { setUser,
        updateGame,
        addSubscription,
        removeSubscriptions,
        updatePlayer,
        updateDeck,
        updateWinners,
        updatePlayers } from '../actions';
import { bindActionCreators } from 'redux';
import ActionCable from 'actioncable';
import LoadScreen from './LoadScreen';
import ReadyScreen from './ReadyScreen';
import Logout from './Logout';
import Game from './Game';


const App = ActionCable.createConsumer("ws://damp-garden-94448.herokuapp.com/cable");

class Play extends Component {
  componentDidMount(){
    const self = this;
    Auth
      .validateToken()
      .then((user)=>{
        this.props.setUser(user);
        this.props.addSubscription('user', App.subscriptions.create(
          {channel: 'GameChannel', room: user.id, type: 'user'},
          {
            received(data){
              if (data.player && data.deck){
                self.props.updatePlayer(data.player, data.deck);
                self.props.updateDeck(data.deck)
              }
              const methods = {
                'disconnect': (error)=>{
                  console.log('DISCONNECT');
                  this.props.history.push('/');
                },
                'game': (game)=>{
                  self.props.updateGame(game)
                },
                'players':(players)=>{
                  self.props.updatePlayers(players)
                },
                'winners':(winners)=>{
                  self.props.updateWinners(winners)
                }
              }
              console.log(data);

              Object.keys(data).forEach(action => {
                if(methods[action]){
                  console.log(methods[action]);
                  methods[action](data[action]);
                }
              })
            }
        }))
      })
      .fail(()=> {
        this.props.history.push('/login');
      });

    this.props.addSubscription('game', App.subscriptions.create(
      {channel: 'GameChannel', room: this.props.match.params.id, type:'game'},
      {
        received(data){
          const methods = {
            'game': (game)=>{
              self.props.updateGame(game)
            },
            'players': (players)=>{
              self.props.updatePlayers(players)
            },
            'disconnect': (error)=>{
              console.log('DISCONNECT');
              this.props.history.push('/games');
            },
            'winners':(winners)=>{
              self.props.updateWinners(winners)
            }

          }
          console.log(data);
          Object.keys(data).forEach(action => {
            console.log(action);
            console.log(methods[action])
            if (methods[action]){
              methods[action](data[action]);
            }
          })
        }
    }))
  }

  componentWillUnmount(){
    App.subscriptions['subscriptions'].forEach(subscription => {
      App.subscriptions.remove(subscription);
    })
    this.props.removeSubscriptions();
  }

  render(){
    if(this.props.game){
      return(
        <div className='Play'>
          <Logout history={this.props.history} />
          <h2>{this.props.game.name}</h2>
          <ReadyScreen />
          <Game history={this.props.history} />
        </div>
      )
    }
    setTimeout(()=>{
      if (!this.props.game){
        this.props.history.push('/games')
      }
    }, 10000)
    return(
      <div>
        <LoadScreen />
      </div>
    )
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({setUser: setUser,
    updateGame: updateGame,
    addSubscription: addSubscription,
    removeSubscriptions: removeSubscriptions,
    updatePlayers: updatePlayers,
    updatePlayer: updatePlayer,
    updateDeck: updateDeck,
    updateWinners: updateWinners}, dispatch);
}

function mapStateToProps(state){
  return {
    current_user: state.current_user,
    game: state.game,
    subscriptions: state.subscriptions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play)
