import React, { Component } from 'react'
import axios from 'axios'
import AddTodo from './addTodo'
import './todos.css'

class Todos extends Component {
  componentDidMount(){
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
    console.log(id)
    axios({
      method: 'delete',
      url: '/api/deleteitem',
      headers: {Authorization: `Bearer ${this.props.accessToken}`},
      data: {id: id}
    })
    .then(response => {
      console.log(response)
      if (response.status === 200) {
        this.props.getTodos()
      }
    })
    .catch(error => {console.log(error)})
  
  }


  render() {
    const todoList = this.props.todos.length ? 
      (this.props.todos.map(todo => {
        if (todo.completed) {
          return (
            <div key={todo.id}>
              <div className="striked" onClick={() => {this.handleItemUpdate(todo.id)}} >
                {todo.item}
              </div>
              <button onClick={() => {this.deleteItem(todo.id)}}>Delete</button>
            </div>
          )}
        else {
          return (
            <div key={todo.id}>
              <div onClick={() => {this.handleItemUpdate(todo.id)}}>
                {todo.item}
              </div>
              <button onClick={() => {this.deleteItem(todo.id)}}>Delete</button>
            </div>
          )
        }

      })) :
      <p>You Have Nothing To Do</p>
    return (
      <div className="todosContainer">
        
        TODOS LIST HERE FOR {this.props.username}
        {todoList}
        
        <AddTodo addNewTodo={this.addNewTodo}/>
      </div>
    )
  }
}

export default Todos
