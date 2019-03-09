import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import axios from 'axios'
import Navbar from './components/navbar'
import Todos from './components/todos'
import AddTodo from './components/addTodo'
import SignUp from './components/signup'
import Login from './components/login'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      items: [],
      accessToken: '',
      refreshToken: ''
    }
  }



  resetUsername = () => {
    this.setState({
      username: ""
    })
  }

  handleChangeForUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handleAuth = (accessToken, refreshToken) => {
    this.setState({
      accessToken: accessToken,
      refreshToken: refreshToken,
    })
  }

  getItems = () => {
    if (this.state.accessToken && this.state.username) {
      axios({
        method: 'get',
        url: '/api/todolist',
        headers: {Authorization: `Bearer ${this.state.accessToken}`}
      })
        .then(response => {console.log(response)})
        .catch(error => console.log(error))
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1>Welcome {this.state.username}</h1>
          <Navbar username={this.state.username} />
          <Route exact path='/'
            render={() =>
              <Login
                handleChangeForUsername={this.handleChangeForUsername}
                username={this.state.username}
                resetUsername={this.resetUsername}
                handleAuth={this.handleAuth}
                accessToken={this.state.accessToken}
              />}
          />
          <Route exact path='/signup'
            render={() =>
              <SignUp
                username={this.state.username}
                handleChangeForUsername={this.handleChangeForUsername}
                resetUsername={this.resetUsername}
                handleAuth={this.handleAuth}
              />}
          />
          <Route exact path='/todos' 
            render={() => 
              <Todos 
                username={this.state.username}
                getItems={this.getItems}
                accessToken={this.state.accessToken}
              />}
          />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
