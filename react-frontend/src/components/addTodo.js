import React, { Component } from 'react'

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItem: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      todoItem: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addNewTodo(this.state.todoItem)
  }

  render() {
    return (
      <div className="addTodoContainer">
        <form onSubmit={this.handleSubmit}>
          <label>Add new todo:</label>
          <input type="text" onChange={this.handleChange} value={this.state.todoItem}/>
          <button type="submit">Add</button>
        </form>

      </div>
    )
  }
}

export default AddTodo;
