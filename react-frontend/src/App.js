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

  componentDidMount() {
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
              />}
          />
          <Route exact path='/signup'
            render={() =>
              <SignUp
                username={this.state.username}
                handleChangeForUsername={this.handleChangeForUsername}
                resetUsername={this.resetUsername}
                handleAuth={this.handleAuth}
              />
            }
          />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
