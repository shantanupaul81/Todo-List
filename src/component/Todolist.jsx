import React, { Component } from 'react'

import deleteIcon from "../assets/ic_round-delete.png";
import editIcon from '../assets/material-stmbols_edit.png';

export default class Todolist extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      value: "",
      editing: false,
      currentid: "",
      currentValue: ""
    };
  }
  onChange = (e) => {
    this.setState({ value: e.target.value });
  };
  onAddTask = (e) => {
    e.preventDefault();
    const obj = {
      name: this.state.value,
      id: Date.now()
    };
    if (this.state.value !== "") {
      this.setState({ todos: this.state.todos.concat(obj) });
      this.setState({ value: "" });
    }
  };

  onDeleteTask = (itemId) => {
    this.setState({
      todos: [...this.state.todos].filter((id) => id.id !== itemId)
    });
  };

  onEditTodo = (id, newValue) => {
    this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.name = newValue;
      }
    });
  };

  onSubmitEditTodo = (e) => {
    e.preventDefault();

    this.onEditTodo(this.state.currentid, this.state.currentValue);
    this.setState({ editing: false });
  };

  onToggleEdit = (todo) => {
    this.setState({ editing: true });
    this.setState({ currentid: todo.id });
    this.setState({ currentValue: todo.name });
  };

  onEditInputChange = (e) => {
    this.setState({ currentValue: e.target.value });
  };

  render() {
    const mylist = this.state.todos.map((todo, id) => (
      <li className="todo_item" key={id}>
        

        <p>{todo.name}</p>
        <div>
          <button className="btn" onClick={() => this.onToggleEdit(todo)}>
            <img src={editIcon} alt=" " />
          </button>
          <button className="btn" onClick={() => this.onDeleteTask(todo.id)}>
            <img src={deleteIcon} alt="" />
          </button>
        </div>

      </li>
    ));

    return (
      <div>
        {this.state.editing === false ? (
          <form onSubmit={this.onAddTask}>
            <input
              placeholder="Type your task"
              value={this.state.value}
              onChange={this.onChange}
              className="todo-input"


            />
            <button onClick={this.onAddTask}>+Add task</button>
          </form>
        ) : (
          <form onSubmit={this.onSubmitEditTodo}>
            <input
              placeholder="edit your task"
              value={this.state.currentValue}
              name={this.state.currentValue}
              onChange={this.onEditInputChange}
            />
            <button onClick={this.onSubmitEditTodo}> update</button>
          </form>
        )}

        
        <ul className="todo_wrapper">{mylist}</ul>
      </div>
    );
  }
}
