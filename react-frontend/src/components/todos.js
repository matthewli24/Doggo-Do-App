import React, { Component } from 'react'
import axios from 'axios'
import AddTodo from './addTodo'
import Poop from '../assets/pile-of-dung.svg'
import LazyPup from '../assets/lazypuppy.jpg'
import './iconImgFormat.css'
import './todos.css'

class Todos extends Component {

  componentDidMount(){
    if (!this.props.username && !this.props.accessToken) {
      return this.props.history.push('/')
    }
    
    this.props.getTodos()
  }

  addNewTodo = (todo) => {
    axios({
      method: 'post',
      url: '/api/additem',
      headers: {Authorization: `Bearer ${this.props.accessToken}`},
      data: {item: todo}
    })
    .then(response => {
      console.log(response)
      this.props.getTodos()
    })
    .catch(error => {console.log(error)})
  }

  handleItemUpdate = (id) => {
    // console.log(id)
    axios({
      method: 'put',
      url: '/api/updateitem',
      headers: {Authorization: `Bearer ${this.props.accessToken}`},
      data: {id: id}
    })
    .then(response => {
      // console.log(response)
      if (response.status === 200) {
        this.props.getTodos()
      }
    })
    .catch(error => {console.log(error)})
  }

  deleteItem = (id) => {
    //console.log(id)
    axios({
      method: 'delete',
      url: '/api/deleteitem',
      headers: {Authorization: `Bearer ${this.props.accessToken}`},
      data: {id: id}
    })
    .then(response => {
      //console.log(response)
      if (response.status === 200) {
        this.props.getTodos()
      }
    })
    .catch(error => {console.log(error)})
  
  }

  handleSignOut = () => {
    //console.log(this.props)
    this.props.signOut()
    this.props.history.push('/')
  }

  render() {
    const todoList = this.props.todos.length ? 
      (this.props.todos.map(todo => {
        if (todo.completed) {
          return (
            <ul className="list-group list-group-flush d-flex flex-row justify-content-between" key={todo.id}>
              <li className="striked list-group-item" onClick={() => {this.handleItemUpdate(todo.id)}} >
                {todo.item}
              </li>
              <button className="btn btn-primary mb-2" onClick={() => {this.deleteItem(todo.id)}}>Delete</button>
            </ul>
          )}
        else {
          return (
            <ul className="list-group list-group-flush d-flex flex-row justify-content-between" key={todo.id}>
              <li className="list-group-item" onClick={() => {this.handleItemUpdate(todo.id)}}>
                {todo.item}
              </li>
              <button className="btn btn-primary mb-1" onClick={() => {this.deleteItem(todo.id)}}>Delete</button>
            </ul>
          )
        }

      })) :
      <p>You Have Nothing To Do</p>
      
    return (
      <div className="d-flex flex-column">

        <div className="d-flex flex-row justify-content-end py-2 pr-5">
          <img className="iconImgFormat" src={Poop}/>
          <button className="btn btn-danger btn-lg rounded-pill" onClick={this.handleSignOut}>Sign Out</button>
        </div>

        <div className="d-flex flex-column align-items-center">
          <div className="w-75 card align-items-center">

            <img className="cardImg card-img-top" src={LazyPup}/>

            <div className="card-body">
              <h5 className="card-title">{this.props.username}'s Todo List</h5>
            </div>

            <div className="d-flex flex-column">
              {todoList}
            </div>
          
            
            <AddTodo addNewTodo={this.addNewTodo}/>
          </div>
        </div>

      </div>
    )
  }
}

export default Todos
