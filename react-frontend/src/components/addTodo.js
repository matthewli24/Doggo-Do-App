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
    this.setState({todoItem: ""})
  }

  render() {
    return (
      <div className="card-body">

        <form onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <input className="form-control" type="text" onChange={this.handleChange} placeholder="Add To Do Item" value={this.state.todoItem}/>
          
            <div className="input-group-append">
              <button className="btn btn-primary mb-2" type="submit">Add</button>
            </div>
        </div>
        </form>

      </div>
    )
  }
}

export default AddTodo;
