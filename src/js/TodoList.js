import React from "react";
import { observer } from "mobx-react";
import classnames from 'classnames';
import happySrc from '../images/happy.png';
import sadSrc from '../images/sad.png';


@observer
export default class TodoList extends React.Component {
    filter(e) {
        this.props.store.filter = e.target.value;
    }
    createNew(e) {
        if (e.which === 13) {
            this.props.store.createTodo(e.target.value);
            e.target.value = "";
        }
    }
    deleteOne(todo) {
        this.props.store.deleteTodo(todo);
    }
    toggleComplete(todo) {
        todo.complete = !todo.complete;
        this.props.store.calcUncomplete();
        this.animateEmoji(todo.complete);
    }
    toggleImportant(todo) {
        todo.important = !todo.important;
        this.props.store.swapFeatured();
    }
    animateEmoji(isHappy) {
        if (isHappy) {
            this.props.store.animateHappy = true;
            this.props.store.animateSad = false;
        } else {
            this.props.store.animateSad = true;
            this.props.store.animateHappy = false;
        }
        // setTimeout(() => {
        //     this.props.store.animateSad = false;
        //     this.props.store.animateHappy = false;
        // }, 2000);
    }
    render() {
        const {
            backgroundClassList,
            backgroundClassIndex,
            clearComplete,
            numUncompleted,
            filter,
            filteredTodos,
            animateHappy,
            animateSad,
            todos } = this.props.store;
        const todoitems = filteredTodos.map( todo => (
            <li key={todo.id}>
                <div className="input-ctnr">
                    <input className="check-input" type="checkbox" value={todo.complete} defaultChecked={todo.complete} onChange={this.toggleComplete.bind(this, todo)}/>
                    <input className="mark-input" type="checkbox" value={todo.important} defaultChecked={todo.important} onChange={this.toggleImportant.bind(this, todo)}/>
                    <input className="cross-input" type="checkbox" value="" defaultChecked="false" onClick={this.deleteOne.bind(this, todo)} />
                </div>
                <span className="text-value">{ todo.value }</span>
            </li>
        ));

        return <div className={classnames("main-background",backgroundClassList[backgroundClassIndex])}>
            <div className="main-text-ctnr">
                <h1>TODO List</h1>
                <div className="filter-text-ctnr">
                    <span className="text-prompt">Filter Tasks Here -> </span>
                    <input className="filter-input text-input" value={filter} onChange={this.filter.bind(this)} />
                </div>
                <div className="create-text-ctnr">
                    <span className="text-prompt">Add A New Task Here -> </span>
                    <input className="create-input text-input" onKeyPress={this.createNew.bind(this)} />
                </div>
                <ul>{todoitems}</ul>
                <div className="clear-text-ctnr">
                    <p>
                        <span className="clear-text text-prompt">Total uncomplete -> </span>
                        <span className="clear-text text-result">{numUncompleted}</span>
                    </p>
                    <button className={classnames(backgroundClassList[backgroundClassIndex], "clear-input")} onClick={clearComplete}>Clear Complete</button>
                </div>
            </div>
            {/* <div className="emoji-ctnr"> */}
                <img className={classnames("emoji-img", "emoji-happy", {'emoji-animation': this.props.store.animateHappy})} src={happySrc} />
                <img className={classnames("emoji-img", "emoji-happy", {'emoji-animation': this.props.store.animateSad})} src={sadSrc} />
            {/* </div> */}
        </div>
    }
}
