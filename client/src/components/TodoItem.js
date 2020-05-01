import React, { Component } from 'react'

class TodoItem extends Component {
  render() {
    return (
      <span>
        {this.props.todo.name}
      </span>
    )
  }
}

export default TodoItem;
