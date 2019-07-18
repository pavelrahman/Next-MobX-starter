import React, { Component } from "react";
import Layout from "../components/Layout";
import TodoForm from "../components/TodoForm";
import {inject, observer } from 'mobx-react';
import { toJS } from 'mobx'

@inject('TodoStore')
@observer
class Home extends Component {
  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }
  addTodo(todoTitle){
    const {TodoStore} = this.props;
    TodoStore.addTodo(todoTitle);
  }

  deleteTodo(id){
    const {TodoStore} = this.props;
    TodoStore.deleteTodo(id);
  }

  updateTodo(id, value){
    const {TodoStore} = this.props;
    TodoStore.updateTodo(id, value);
  }

  render() {
    const {todoList} = this.props.TodoStore;
    console.log(toJS(this.props.TodoStore.todoContainer));
    let list = todoList.length>0?todoList:[];
    return (
      <Layout title="home">
        <div className={"container"}>
          <div className="row">
            <div className="col-md-12">
              <h1 className={"text-center"} style={{ margin: "50px 0px" }}>
                Welcome To Todo
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <TodoForm addTodo={this.addTodo} todoList={list} deleteTodo={this.deleteTodo} updateTodo={this.updateTodo}/>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;
