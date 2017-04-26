import React from 'react';
import _ from 'lodash';

export default {
  renderInputErrors(self, input){
    if(self.props.inputs[input].errors.length){
      return _.map(self.props.inputs[input].errors, (error, i)=>{
        return(
          <li key={i}>{error}</li>
        );
      })
    }
  },

  changeInput(self, type, e){
    const inputs = {...self.props.inputs};
    inputs[type].value = e.target.value;
    self.props.updateInputs(inputs);
  },

  initInputs(self, args){
    const inputs = _.reduce(Object.keys(args), (blding, input)=>{
      console.log(args[input]);
      blding[input] = {
        value: args[input],
        errors: []
      }
      return blding
    }, {})
    self.props.updateInputs(inputs);
  },

  requestInputs(self){
    return _.reduce(Object.keys(self.props.inputs), (blding, inputType) => {
      blding[inputType] = self.props.inputs[inputType].value;
      return blding;
    }, {})
  }
}
