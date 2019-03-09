import React, { Component } from 'react'
import axios from 'axios'
import AddTodo from './addTodo'


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
    .then(response => {console.log(response)})
    .catch(error => {console.log(error)})
  }

  render() {
    const todoList = this.props.todos.length ? 
      (this.props.todos.map(todo => {
        return (
          <div key={todo.id}>
            <div>{todo.item}</div>
          </div>
        )
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
