import React, { Component } from 'react'

class Todos extends Component {
  componentDidMount(){
    console.log(this.props.accessToken)
    this.props.getItems()
  }
  render() {
    
    return (
      <div className="todosContainer">
      TODOS LIST HERE FOR {this.props.username}
      </div>
    )
  }
}

export default Todos
