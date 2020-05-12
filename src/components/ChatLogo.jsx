import React, { Component } from "react";

import "../styles/ChatLogo.css"

export default class ChatLogo extends Component {

  render() {
    return(
      <div class="chat-logo">
        <div class="logo-img">
          <img src="/imgs/chat-1.png" /> 
          <span>chat</span>
        </div>
        <div class="logo-text">
          sistema de bate-papo com login anônimo, onde você pode interagir
          com as pessoas, expressando suas ideias e mantendo anonimato.
        </div>
      </div>
    );
  }
}