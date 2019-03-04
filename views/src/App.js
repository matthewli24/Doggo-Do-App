import React, {Component} from 'react';
import axios from 'axios'
import Navbar from './components/navbar'

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

  handleChangeForUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handleLogin = (e) => {
    e.preventDefault();
    axios.post('/login', {username: this.state.username})
      .then(response => {
        console.log(response.data)
        this.setState({
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token
        })
      })

      .catch(error => {
        console.log(error)
      })
  }

  handleSignUp = (e) => {
    e.preventDefault();

    axios({
      method: 'get',
      url: '/secret',
      headers: {'Authorization': 'Bearer ' + this.state.accessToken}
    })
      .then(response => {
        console.log(response)
      })

      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className = "App">
        <h1>Welcome {this.state.username}</h1>
        <Navbar handleChangeForUsername={this.handleChangeForUsername}
                handleLogin={this.handleLogin}
                handleSignUp={this.handleSignUp}/>
      </div>
    );
  }
}

export default App;
