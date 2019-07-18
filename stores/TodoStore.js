import { observable, action, computed } from "mobx";

class TodoStore {
    @observable todoContainer = [];

    @action addTodo = todo => {
        this.todoContainer.push(todo);
    }

    @action deleteTodo = id => {
        this.todoContainer.splice(id,1);
    }

    @action updateTodo = (id, text) => {
        this.todoContainer[id]=text;
    }

    @computed get todoList(){
        return this.todoContainer;
    }
}

const todoStore = new TodoStore();

export default todoStore;