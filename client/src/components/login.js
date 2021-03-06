import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import PawPrint from '../assets/paw-print.svg'
import DogBone from '../assets/dog-bone.svg'
import './iconImgFormat.css'

class Login extends Component {
  state = {
    showError: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('/api/login', {username: this.props.username})
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
    let errorBar = this.state.showError ? 
      <div className="p-3 mb-2 bg-danger text-white text-center">Please Enter Another Username</div> 
      : null

    return (
      <div className="d-flex flex-column justify-content-around align-items-center" >
        <div className="d-flex flex-column">
          {errorBar}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group d-flex flex-row justify-content-center">
              <label className="px-3">Username:</label>
              <input className="pl-2 rounded-pill" type="text" onChange={this.props.handleChangeForUsername} placeholder="Enter Username" value={this.props.username}/>
            </div>

            <div className="d-flex flex-row justify-content-center" >
              <img className="iconImgFormat" src={PawPrint}/>
              <button className="btn btn-danger btn-lg rounded-pill">Log In</button>
            </div>
          </form>
        </div>

        <div className="d-flex flex-row justify-content-center py-5" >
          <img className="iconImgFormat" src={DogBone}/>
          <Link to="/signup">
          <button className="btn btn-danger btn-lg rounded-pill">Sign Up</button>
          </Link>
        </div>
 
      </div>
    )
  }
}


export default Login;