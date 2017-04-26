import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateGames } from '../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import LoadScreen from './LoadScreen';
import env from '../env';

class GameList extends Component {
  componentDidMount(){
    this.getGames();
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

  renderGames(){
    if(this.props.games.length){
      return this.props.games.map((game, i)=>{
        console.log("=====================GAME LIST", game);
        if(game.in_progress){
          return(
            <li className='in-progress game-list-item' key={i}>
              <p>{game.name}</p>
              {/* <p>{game.turn_length}</p> */}
              <p>{`${game.player_count} / ${game.min_players} - ${game.max_players}`}</p>
            </li>
          )
        }
        return(
          <Link to={`/play/${game.id}`} key={i}>
            <li className='game-list-item'>
              <p>{game.name}</p>
              {/* <p>{game.turn_length}</p> */}
              <p>{`${game.player_count} / ${game.min_players} - ${game.max_players}`}</p>
            </li>
          </Link>
        )

      })
    }
  }

  render(){
    return(
      <ul className='GameList'>
        <li className='game-list-item'>
          <p>Name</p>
          {/* <p>Turn Length</p> */}
          <p>Players</p>
        </li>
        {this.renderGames()}
      </ul>
    )
  }
}




function mapDispatchToProps(dispatch){
  return bindActionCreators({updateGames: updateGames}, dispatch);
}

function mapStateToProps(state){
  return {
    games: state.games,
    current_user: state.current_user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameList)
