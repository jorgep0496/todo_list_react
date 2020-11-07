import React from 'react';
import '../styles/app.scss';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newItem: "",
            list: []
        }
    }

    updateInput(key, value) {
        //update react state
        this.setState({
            [key]: value
        });
    }
    addItem() {
        //create item with unique id
        const newItem = {
            id: 1 + Math.random(),
            value: this.state.newItem.slice()
        };
        //copy the current list of items
        const list = [...this.state.list]
        //add new item to the list
        list.push(newItem);
        //update state with new list and reset newItem input
        this.setState({
            list,
            newItem: ""
        });
    }

    deleteItem(id) {
        //copy current list of items
        const list = [...this.state.list];

        //filter out item being deleted
        const updatedList = list.filter(item => item.id !== id);

        this.setState({ list: updatedList });
    }
    render() {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title"><b>Todo List</b></span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <input
                                id="myInput"
                                type="text"
                                placeholder="Type any task here..."
                                value={this.state.newItem}
                                onChange={e => this.updateInput("newItem", e.target.value)}
                            />
                            <button
                                className="btn btn-info"
                                id="btn1"
                                onClick={() => this.addItem()}
                            >
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div>
                                {this.state.list.length === 0 && <h5 className="noTask"><b>No tasks yet.</b> Please write a task and press the <i className="fas fa-plus"></i> button</h5>}
                                <ul>
                                    {this.state.list.map(item => {
                                        return (
                                            <li key={item.id}>
                                                {item.value}
                                                <button
                                                    className="btn"
                                                    id="btn2"
                                                    onClick={() => this.deleteItem(item.id)}
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}