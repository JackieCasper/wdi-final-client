import React, { Component } from 'react';
import {connect} from 'react-redux';
import { updateInputs, closeChat } from '../actions';
import { bindActionCreators } from 'redux';
import '../css/App.css';
import InputHelper from '../helpers/inputs';
import env from '../env';
import LoadScreen from './LoadScreen';


class Chat extends Component {
  componentDidMount(){
    InputHelper.initInputs(this, {content: ''})
  }

  sendChat(e){
    e.preventDefault();
    this.props.subscriptions.game.perform('message', { content: this.props.inputs.content.value });
    this.props.updateInputs({
      content: {
        value: '',
        errors: []
      }
    });
  }

  renderMessages(){
    return this.props.chat.messages.map((message, i)=>{
      return (
        <li className='message' key={i}>
          <p className='message-user'>{message.username}</p>
          <p className='message-content'>{message.content}</p>
        </li>
      )
    })
  }

  render(){
    if(this.props.inputs && this.props.inputs.content){
      return(
        <div className={this.props.chat.open ? "Chat" : "Chat hidden"}>
          <button className='close-modal-button' onClick={()=>{this.props.closeChat()}}>X</button>
          <ul className='messages'>
            {this.renderMessages()}
          </ul>
          <form className='chat-form' onSubmit={(e)=>{this.sendChat(e)}}>
            <input id='content' value={this.props.inputs.content.value} onChange={(e)=>{InputHelper.changeInput(this, 'content', e)}} />
            <button className='submit-button' onClick={(e) => {this.sendChat(e)}}>Send</button>
          </form>
        </div>
      )
    }
    return(
      <div>
        <LoadScreen />
      </div>
    )

  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({updateInputs: updateInputs, closeChat: closeChat }, dispatch);
}

function mapStateToProps(state){
  return {
    inputs: state.inputs,
    chat: state.chat,
    subscriptions: state.subscriptions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
