import React, { Component } from "react";

import "../styles/InputText.css"
import "../styles/InputPassword.css"

export default class InputPassword extends Component {

  change = (e) => {
    this.props.onChange({
      key: this.props.label,
      value: e.target.value
    })
  }

  state = {
    show: false
  }
  
  toggle = () => {
    this.setState({show: !this.state.show});
  }

  render() {
  
    const bool = this.state.show;
  
    return(
      <React.Fragment>
        <label for={ this.props.label }>{ this.props.label }</label>
        
        <div class="input-group show-pass">     
          <input class="form-control coz-input" value={ this.props.value }
            type={ bool ? "text" : "password"}  
            onChange={ this.change } />       
          <div class="input-group-append" onClick={this.toggle}>
            <span class={`fa fa-${ bool ? "eye-slash" : "eye" }`} />
          </div>
          
        </div>
      </React.Fragment>
    );
  }
}