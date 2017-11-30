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
        updatePlayers,
        setMessages,
        addMessage,
        updateModalContents,
        updateCable,
        openChat
      } from '../actions';
import { bindActionCreators } from 'redux';
import ActionCable from 'actioncable';
import LoadScreen from './LoadScreen';
import ReadyScreen from './ReadyScreen';
import Logout from './Logout';
import Game from './Game';
import Chat from './Chat';


class Play extends Component {
  componentDidMount(){
    const self = this;
    this.props.updateModalContents(<div></div>);
    const Cable = ActionCable.createConsumer("ws://localhost:8080/cable?id=" + this.props.current_user.id);
    // const Cable = ActionCable.createConsumer("wss://damp-garden-94448.herokuapp.com/cable?id=" + this.props.current_user.id);
    this.props.updateCable(Cable);
    Auth
      .validateToken()
      .then((user)=>{
        this.props.setUser(user);
        if (!this.props.subscriptions.user && this.props.current_user){
          this.props.addSubscription('user', Cable.subscriptions.create(
            {channel: 'GameChannel', room: user.id, type: 'user', uid: self.props.current_user.uid},
            {
              received(data){
                if (data.player && data.deck){
                  self.props.updatePlayer(data.player, data.deck);
                  self.props.updateDeck(data.deck)
                }
                const methods = {
                  'disconnect': (error)=>{
                    console.log('DISCONNECT');
                    location.href = '/games';
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

                Object.keys(data).forEach(action => {
                  if(methods[action]){
                    console.log(methods[action]);
                    methods[action](data[action]);
                  }
                })
              }
          }))
        }
      })
      .fail(()=> {
        this.props.history.push('/login');
      });
      console.log(this.props.match.params);
    if (!this.props.subscriptions.game && (!this.props.game || !this.props.game.id === this.props.match.params['id'])){
      console.log(Cable.subscriptions['subscriptions']);
      this.props.addSubscription('game', Cable.subscriptions.create(
        {channel: 'GameChannel', room: this.props.match.params.id, type:'game', uid: self.props.current_user.uid},
        {
          received(data){
            const methods = {
              'game': (game)=>{
                self.props.updateGame(game);
              },
              'players': (players)=>{
                self.props.updatePlayers(players);
              },
              'disconnect': (error)=>{
                console.log('DISCONNECT');
                location.href = '/games';
              },
              'winners': (winners)=>{
                self.props.updateWinners(winners);
              },
              'messages': (messages)=>{
                self.props.setMessages(messages);
              },
              'message': (message)=>{
                if(!self.props.chat.messages.find(msg=>{
                  return msg.id === message.id
                })){
                  self.props.addMessage(message);
                }
              }
            }
            Object.keys(data).forEach(action => {
              console.log(action);
              console.log(methods[action])
              if (methods[action]){
                methods[action](data[action]);
              }
            })
          }
      }));
    }
  }

  componentWillUnmount(){
    this.props.cable.subscriptions['subscriptions'].forEach(subscription => {
      this.props.cable.subscriptions.remove(subscription);
    })
    this.props.removeSubscriptions();
  }

  render(){
    if(this.props.game){
      return(
        <div className='Play'>
          <Logout history={this.props.history} />
          <h2>{this.props.game.name}</h2>
          <button onClick={()=>{this.props.openChat()}} className={this.props.chat.read ? "chat-button" : "chat-button unread"}>Chat</button>
          <Chat />
          <ReadyScreen />
          <Game history={this.props.history} />
        </div>
      )
    }
    setTimeout(()=>{
      if (!this.props.game){
        location.href = '/games'
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
    updateWinners: updateWinners,
    setMessages: setMessages,
    addMessage: addMessage,
    updateModalContents: updateModalContents,
    updateCable: updateCable,
    openChat: openChat
  }, dispatch);
}

function mapStateToProps(state){
  return {
    current_user: state.current_user,
    game: state.game,
    subscriptions: state.subscriptions,
    cable: state.cable,
    chat: state.chat
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play)
