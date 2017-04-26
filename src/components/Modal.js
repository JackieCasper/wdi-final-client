import React, { Component } from 'react';
import '../css/App.css';
import { connect } from 'react-redux';
import { closeModal } from '../actions';
import { bindActionCreators } from 'redux';
import NewGame from './NewGame';

class Modal extends Component {
  render(){
    const hidden = this.props.modal.open ? '' : ' hidden';
    return (
      <div className={`modal${hidden}`}>
        <div className='modal_content'>
          <button className='close-modal-button' onClick={()=>{this.props.closeModal()}}>X</button>
          <NewGame />
        </div>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({closeModal: closeModal}, dispatch);
}

function mapStateToProps(state){
  return {
    modal: state.modal
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
