import React, { Component } from 'react';
import {connect} from 'react-redux';
import { updateInputs, closeModal, updateGames } from '../actions';
import { bindActionCreators } from 'redux';
import '../css/App.css';
import InputHelper from '../helpers/inputs';
import env from '../env';
import axios from 'axios';
import LoadScreen from './LoadScreen';


class NewGame extends Component {
  componentDidMount(){
    InputHelper.initInputs(this, {name: '', min_players: 3, max_players: 6, turn_length: 30 })
    console.log(this.props);
  }

  newGame(e){
    if(e){
      e.preventDefault();
    }
    const inputs = InputHelper.requestInputs(this);
    inputs.user_id = this.props.current_user.id;
    axios
      .post(`${env.SERVER_URL}/games`, {game: inputs})
      .then(data => {
        console.log(data);
        this.props.closeModal();
        this.getGames();
      })
  }

  getGames(){
    axios
      .get(`${env.SERVER_URL}/games`)
      .then(data=>{
        this.props.updateGames(data.data);
      })
      .catch(err=>{
        console.log(err)
      })
  }

  render(){
    if(this.props.inputs){
      return(
        <form className='NewGame' onSubmit={(e)=>{this.newGame(e)}}>
          <h2>New Game</h2>

          <label htmlFor='name'>Game Name<span className='input-validations'></span></label>
          <input id='name' value={this.props.inputs.name.value} onChange={(e)=>{InputHelper.changeInput(this, 'name', e)}} />
          <ul className='input-errors'>{InputHelper.renderInputErrors(this, 'name')}</ul>
          <div className='form-section'>
            <div className='form-input'>
              <label htmlFor='name'>Min Players<span className='input-validations'></span></label>
              <input id='min_players' type='number' min='3' value={this.props.inputs.min_players.value} onChange={(e)=>{InputHelper.changeInput(this, 'min_players', e)}} />
              <ul className='input-errors'>{InputHelper.renderInputErrors(this, 'min_players')}</ul>
            </div>
            <div className='form-input'>
              <label htmlFor='max_players'>Max Players<span className='input-validations'></span></label>
              <input id='max_players' type='number' value={this.props.inputs.max_players.value} onChange={(e)=>{InputHelper.changeInput(this, 'max_players', e)}} />
              <ul className='input-errors'>{InputHelper.renderInputErrors(this, 'max_players')}</ul>
            </div>

          </div>


          <button className='submit-button' onClick={(e) => {this.newGame(e)}}>Create Game</button>
        </form>
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
  return bindActionCreators({updateInputs: updateInputs, closeModal: closeModal, updateGames: updateGames}, dispatch);
}

function mapStateToProps(state){
  return {
    inputs: state.inputs,
    current_user: state.current_user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGame)
