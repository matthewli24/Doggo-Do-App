import React, { Component } from 'react';
import axios from 'axios';


class SignUp extends Component {
  state = {
    showError: false,
  }
 
  handleSubmit = (e) => {
    e.preventDefault();
    
    axios({
      method: 'post',
      url: '/api/registration',
      data: {
        username: this.props.username
      }
    })
      .then(response => {
        //console.log(response.data)
        this.props.handleAuth(response.data['access_token'],response.data['refresh_token'])
        this.props.history.push('/todos')
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
      <div className="addTodoContainer">
        {errorBar}
        <form onSubmit={this.handleSubmit}>
          <label>Enter New Username:</label>
          <input type="text" onChange={this.props.handleChangeForUsername} value={this.props.username}/>
          <button type="submit">Sign Up</button>
        </form>

      </div>
    )
  }
}

export default SignUp;
