import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

class Login extends Component {
  state = {
    showError: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', {username: this.props.username})
      .then(response => {
        console.log(response.data)
        this.props.handleAuth(response.data['access_token'],response.data['refresh_token'])
      })

      .catch(error => {
        this.setState({
          showError: true
        })
        this.props.resetUsername()
        setTimeout( () => {
          this.setState({
            showError: false
          })
        }, 3000)
        console.log(error)
      })
  }
  render() {
    let errorBar = this.state.showError ? <div>Please Enter Another Username</div> : null
    return (
      <div>
        {errorBar}
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.props.handleChangeForUsername} value={this.props.username}/>
          <button>Log In</button>
        </form>

        
        <div><Link to="/signup">Sign Up</Link></div>
        
        
      </div>
    )
  }
}


export default Login;