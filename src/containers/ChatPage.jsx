import React, { Component } from "react";

import axios from "axios"

export default class ChatPage extends Component {
  state = { 
    text: "",
    isOpen: false,
    file: { src: "", itself: null },
    scroll: true,
    height: 50,
    messages: [/*
      { name: "ryan", body: "hello" },
      { name: "zero", body: "logon", type: "action" },
      { name: "zero", body: "hi there ^^", me: true },
      { name: "ryan", body: "how are you ?" },
      { name: "ryan", body: ":)" },
      { name: "zero", body: "i'm fine", me: true }
    */]
  }
  
  componentDidMount() {
    
    this.interval = setInterval(() => {
      axios.get("/messages").then(({data}) => {
      
        if(data.status == "NOT LOGGED") {
          clearInterval(this.interval);
          alert("not logged")
          return this.props.history.push("/")
        }
        
        this.setState({messages: data});
        this.scroll()
      });
    }, 1000);
  }
  
  componentWillUnmount() {
    
  
    clearInterval(this.interval);
    this.setState({ interval: null });
    
  }
  
  exit = () => {
    axios.post("/exit").then(() => {
      this.props.history.push("/")
    });
  }
  
  loadFile = (e) => {/*
    const f = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      this.open(reader.result, f);
    }
    
    reader.readAsDataURL(f);*/
  }
  
  change = (e) => {
    this.setState({ text: e.target.value });
  }
  
  focus = (e) => {
    //this.setState({height: 90});
  }
  
  blur = (e) => {
    //this.setState({height: 50});
  }
  
  open = (src, f) => {
    //this.setState({file: { src: src, itself: f }, isOpen: true});
  }
  
  close = () => {
    //this.setState({isOpen: false});
  }
  
  send = () => {
    /*alert("send");
    const fd = new FormData();
    fd.append("image", this.state.file.itself);
    
    axios.post("/image", fd, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(
     ({data}) => { alert(data);  },
     (error)  => { alert(error); }
    );*/
  }
  
  scroll = () => {
    this.myContent.scrollTop = this.myContent.scrollHeight;
  }
  
  post = () => {
    if(this.state.text.length < 1) return false;
    
    this.setState({
      text: ""
    });
    
    this.scroll();
    
    
    axios.post("/post", {
      body: this.state.text
    }).then(({data}) => {
      this.setState({text: ""});
    });
  }
  
  render() {
    return(
      <div class="chat-page">
        {/* <div class="users-holder col-12 col-md-5"></div> */}
        
        
        <div class="chat-box-header">
          <p>WebChat</p>
          <button onClick={this.exit} class="btn exit-btn btn-danger">
            <span class="fa fa-power-off" />
          </button>
        </div>
            
      
        <div ref={ref => this.myContent=ref} class="chat-holder">
          <div class="chat-box">   
              { 
                this.state.messages.map((data) => {
                  return(
                    <div class={
                    data.type == "action" ? "chat-box-action" :
                    (data.me ? "chat-box-active" : "chat-box-message")}>
                      <div class="message-header">
                        <span class="header-user">{ data.name }</span>
                      </div>
                      <div class="message-body">
                        { data.body }
                      </div>
                    </div>
                  );
                })
              }
          </div>
        </div>
        
        <div class="chat-box-input input-group">
          <textarea 
            value={this.state.text} onChange={this.change} 
            class="form-control" />
          <div class="input-group-append">
            <button onClick={this.post} class="btn btn-success">
              <span class="fa fa-paper-plane" />
            </button>
          </div>
        </div>
        
      </div>
    );
  }
}  





