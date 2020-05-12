import React, { Component } from "react";

import axios from "axios"

import { Link } from "react-router-dom";

import ChatLogo      from "../components/ChatLogo.jsx"
import InputText     from "../components/InputText.jsx"
import InputPassword from "../components/InputPassword.jsx"

export default class SignInPage extends Component {

  state = {
    isOpen: false
  }
  
  componentWillMount() {
    axios.post("/login", {}).then(({data}) => {
      if(data.status == "logged") {
        this.props.history.push("/chat");
        return false;
      }
    });
  }
  
  change = (obj) => {
    var foo = {};
    foo[obj.key] = obj.value
    
    this.setState(foo);
  }
  
  submit = (e) => {
    e.preventDefault();
    
    axios.post("/login", {
      name: this.state.nickname,
      pass: this.state.password
    }).then(({data}) => {
      if(data.status == "logged") {
        alert("LOGGED")
        this.props.history.push("/chat");
      } else {
        alert(JSON.stringify(data));
        this.openAlert();
      } 
    });
  }
  
  closeAlert = () => {
    this.setState({isOpen: false});
  }
  
  openAlert = () => {
    this.setState({isOpen: true});
  }

  render() {
    return(
      <div class="login-holder container">
      <div class="row">
      
        {/*
        <div class="alert alert-danger">
        { isOpen={this.state.isOpen} toggle={this.closeAlert} 
          Conta inexistente!
        </div>
        */}
        
        <div class="col-12 col-md-5">
          <ChatLogo />
        </div>
        
        <form class="form col-12 col-md-7" onSubmit={this.submit}>
        
          <InputText label="nickname" placeholder="fulano neh" 
            onChange={this.change} />
            
          <InputPassword label="password"
            onChange={this.change} />
          
          <div class="form-group row">
            <div class="col-12">
              <button type="submit" class="coz-btn btn-lg btn btn-primary">
                sign in
              </button>
            </div>
            <div class="col-6">
              <Link to="/register">
              <button class="coz-btn btn" type="button">sign up</button> 
              </Link>
            </div>
            <div class="col-6">
              <button class="coz-btn btn btn-primary">recovery</button>
            </div>
          </div>
        </form>
        </div>
      </div>
    );
  }
}






