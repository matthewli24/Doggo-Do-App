import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import axios from 'axios'
import Jumbotron from './components/jumbotron'
import Todos from './components/todos'
import SignUp from './components/signup'
import Login from './components/login'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      todos: [],
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

  handleSignOut = () => {
    this.setState({
      username: "",
      items: [],
      accessToken: "",
      refreshToken: ""
    })
  }

  getTodos = () => {
    if (this.state.accessToken && this.state.username) {
      axios({
        method: 'get',
        url: '/api/todolist',
        headers: {Authorization: `Bearer ${this.state.accessToken}`}
      })
        .then(response => {
          //console.log(response.data['items'])
          this.setState({todos:response.data['items']})
        })
        .catch(error => console.log(error))
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Jumbotron 
            username={this.state.username} 
            accessToken={this.state.accessToken}
          />
          <Switch>
            <Route exact path='/'
              render={(props) =>
                <Login {...props}
                  handleChangeForUsername={this.handleChangeForUsername}
                  resetUsername={this.resetUsername}
                  handleAuth={this.handleAuth}
                  username={this.state.username}
                  accessToken={this.state.accessToken}
                />}
            />
            <Route path='/signup'
              render={(props) =>
                <SignUp {...props}
                  username={this.state.username}
                  handleChangeForUsername={this.handleChangeForUsername}
                  resetUsername={this.resetUsername}
                  handleAuth={this.handleAuth}
                />}
            />
            <Route path='/todos' 
              render={(props) => 
                <Todos {...props}
                  username={this.state.username}
                  todos={this.state.todos}
                  accessToken={this.state.accessToken}
                  getTodos={this.getTodos}
                  signOut={this.handleSignOut}
                />}
            />
            <Redirect to='/' />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
