import React, { Component, Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";



class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoTitle: "",
      editMode: false,
      updatedTodoValue: null,
      editedTodoId: null
    };
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  addTodo() {
    let { todoTitle } = this.state;
    if (todoTitle.trim()) {
      this.props.addTodo(todoTitle);
      this.setState({ todoTitle: "" });
    }
  }

  onKeyBoardPress(e){
    if(e.key==="Enter"){
      this.addTodo();
    }
  }

  renderTodoList() {
    let list;
    let { todoList } = this.props;
    if (todoList && todoList.length > 0) {
      list = this.props.todoList.map((item, index) => {
        return (
          <li
            key={index}
            className="list-group-item list-group-item-primary"
            style={{ margin: "2px" }}
          >
            <strong>{`${index + 1}`}</strong>. {item}
            <i
              className="fas fa-edit float-right"
              style={{ margin: "0px 20px" }}
              onClick={event => this.editTodo(event, index)}
            />
            <i
              className="fas fa-trash float-right"
              onClick={event => this.deleteTodo(event, index)}
              style={{ color: "red" }}
            />
          </li>
        );
      });
      return list;
    } else {
      return (
        <li
          className="list-group-item list-group-item-danger text-center"
          style={{ margin: "2px" }}
        >
          {<h3>Sorry You have no todo yet</h3>}
        </li>
      );
    }
  }

  editTodo(event, id) {
    event.preventDefault();
    let value = this.props.todoList[id];
    this.setState({
      editMode: true,
      updatedTodoValue: value,
      editedTodoId: id
    });
  }

  showEditModal() {
    let { updatedTodoValue, editMode } = this.state;
    return editMode ? (
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows="3"
              onChange={e =>
                this.setState({ updatedTodoValue: e.target.value })
              }
              value={updatedTodoValue}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={event => this.closeButtonPress(event)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={event => this.updateTodo(event)}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    ) : (
      <Fragment />
    );
  }

  closeModal() {
    this.setState({ editMode: false });
  }

  closeButtonPress(event) {
    event.preventDefault();
    this.closeModal();
  }

  updateTodo(event) {
    event.preventDefault();
    let { updatedTodoValue, editedTodoId } = this.state;
    if (updatedTodoValue) {
      this.props.updateTodo(editedTodoId, updatedTodoValue);
    }
    this.closeModal();
  }

  deleteTodo(event, id) {
    event.preventDefault();
    this.props.deleteTodo(id);
  }

  render() {
    return (
      <Fragment>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="write a todo here"
            value={this.state.todoTitle}
            onChange={e => {
              this.setState({ todoTitle: e.target.value });
            }}
            onKeyPress={e => this.onKeyBoardPress(e)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={this.addTodo}
            >
              <i className="fas fa-plus fa-lg" style={{ color: "green" }} />
            </button>
          </div>
        </div>
        <ul className="list-group">{this.renderTodoList()}</ul>
        {this.showEditModal()}
      </Fragment>
    );
  }
}

export default TodoForm;
