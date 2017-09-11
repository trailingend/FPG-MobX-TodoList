import { computed, observable } from "mobx"

class Todo {
    @observable value;
    @observable id;
    @observable complete;
    @observable important;

    constructor(value) {
        this.value = value;
        this.id = Date.now();
        this.complete = false;
        this.important = false;
    }
}

export class TodoStore {
    backgroundClassList = ['red-yellow', 'burgendy-purple', 'blue-green'];
    @observable backgroundClassIndex = 0;
    @observable todos = [];
    @observable filter = "";
    @observable numUncompleted = 0;
    @observable animateHappy = false;
    @observable animateSad = false;
    @computed get filteredTodos() {
        var matchesFilter = new RegExp(this.filter, "i");
        return this.todos.filter( todo => !this.filter || matchesFilter.test(todo.value));
    }
    createTodo(value) {
        if (value != "") {
            this.todos.push(new Todo(value));
            if (this.backgroundClassIndex < 2) {
                this.backgroundClassIndex++;
            } else {
                this.backgroundClassIndex = 0;
            }
            this.calcUncomplete();
        }
    }
    calcUncomplete() {
        this.numUncompleted = this.todos.filter( todo => !todo.complete).length;
        return this.numUncompleted;
    }
    clearComplete = () => {
        const incompleteTodos = this.todos.filter(todo => !todo.complete);
        this.todos.replace(incompleteTodos);
        this.calcUncomplete();
    }
}

export default new TodoStore;
