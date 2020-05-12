import React, { Component } from "react";

import "../styles/InputText.css"

export default class InputText extends Component {

  change = (e) => {
    this.props.onChange({
      key: this.props.label,
      value: e.target.value
    })
  }

  render() {
    return(
      <React.Fragment>
        <label for={ this.props.label }>
          { this.props.label }
        </label>
        
        <input class="form-control coz-input" type={ this.props.type | "text" }
          placeholder={this.props.placeholder } value={ this.props.value }
          onChange={this.change} />
          
      </React.Fragment>
    );
  }
}