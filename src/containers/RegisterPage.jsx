import React, { Component } from "react";

import axios         from "axios"
import ChatLogo      from "../components/ChatLogo"
import InputText     from "../components/InputText"
import InputPassword from "../components/InputPassword"

export default class RegisterPage extends Component {
  
  state = {
    name:     "",
    password: "",
    birthday: "",
    country:  "",
    sex:      "male"
  }
  
  change = (obj) => {
    this.state[obj.key] = obj.value;
  }
  
  cancel = (e) => {
    this.props.history.push("/")
  }
  
  submit = (e) => {
    
    var obj = Object.assign({
      pass: this.state.password
    }, this.state);
    
    alert(JSON.stringify(obj));
    
    axios.post("/register", obj).then(({data}) => {
      alert(JSON.stringify(data));
      this.props.history.push("/")
    });
  }

  render() {
    return(
      <div class="register-holder container">
      <div class="row">
        
        <div class="col-12 col-md-5">
          <ChatLogo />
        </div>
        
        <div class="col-12 col-md-7">
          <form class="container form" onSubmit={ this.submit }>
            <h2 class="tag">Register</h2>
      
            <div class="form-group">
              <InputText label="name" placeholder="fulano de talz" 
                onChange={this.change} />
            </div>
      
            <div class="form-group">
              <InputPassword label="password" 
                onChange={this.change} />
 
              <InputPassword label="confirm password"
                onChange={this.change} />
            </div>
        
            <div class="form-group">
              <InputText label="birthday" placeholder="yyyy-mm-dd" 
                onChange={this.change} />
            </div>
       
            <div class="form-group row">
      
              <div class="col-6">
                <InputText label="country" placeholder="Brazil"
                onChange={this.change} />
              </div>
        
              <div class="col-6">
                <label for="sex">sex</label>
                <select class="form-control coz-input">
                  <option>male</option>
                  <option>female</option>
                </select>
              </div>
        
            </div>
      
            <div class="form-group">
              <button class="coz-btn btn btn-primary btn-lg" type="submit">
                save
              </button>
        
              <button class="coz-btn btn btn-lg" type="button" 
                onClick={this.cancel}> 
                cancel :(
              </button> 
            </div>
      
          </form>
        </div>
        
      </div>
      </div>
    );
  }
  
}




