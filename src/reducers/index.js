import {combineReducers} from 'redux';
import CurrentUserReducer from './current_user_reducer';
import InputsReducer from './inputs_reducer';
import GamesReducer from './games_reducer';
import ModalReducer from './modal_reducer';
import GameReducer from './game_reducer';
import SubscriptionsReducer from './subscriptions_reducer';
import DeckReducer from './deck_reducer';
import PlayerReducer from './player_reducer';
import PlayersReducer from './players_reducer';
import WinnersReducer from './winners_reducer';


const rootReducer = combineReducers({
  current_user: CurrentUserReducer,
  inputs: InputsReducer,
  games: GamesReducer,
  modal: ModalReducer,
  game: GameReducer,
  subscriptions: SubscriptionsReducer,
  deck: DeckReducer,
  player: PlayerReducer,
  players: PlayersReducer,
  winners: WinnersReducer
});

export default rootReducer;
