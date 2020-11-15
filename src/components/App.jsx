import React, { useEffect, useState } from 'react';
import '../styles/app.scss';

const App = () => {

    const [list, setList] = useState({ done: false, label: "" });
    const [newItem, setNewItem] = useState([]);

    useEffect(() => {
        getTasks();
    }, []);

    //API: Crear el usuario
    const createUser = () => {
        fetch("https://assets.breatheco.de/apis/fake/todos/user/bolep0496", {
            method: "POST",
            body: JSON.stringify([]),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => {
                if (resp.ok !== true) {
                    return resp.json();
                }
            })
            .then((data) => {
                console.log(data)
                getTasks();
            })
            .catch((error) => console.log(error));
    };

    //API: Obtener el objeto
    const getTasks = () => {
        fetch("https://assets.breatheco.de/apis/fake/todos/user/bolep0496", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => {
                console.log(resp);
                if (!resp.status === 404) createUser();
                return resp.json();
            })
            .then((data) => {
                console.log(data);
                setNewItem(data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    //API: Actualizar la lista
    const updateTasks = (arr) => {
        fetch("https://assets.breatheco.de/apis/fake/todos/user/bolep0496", {
            method: "PUT",
            body: JSON.stringify(arr),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                getTasks();
            })
            .catch((error) => console.log(error));
    };

    //API: Eliminar el usuario
    const deleteUser = () => {
        fetch("https://assets.breatheco.de/apis/fake/todos/user/bolep0496", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
    };

    // Capture new Task Input
    const listText = (e) => {
        setList({ ...list, label: e.target.value, done: false });
    }

    const addItem = (e) => {

        let item = list;
        let items = [...newItem, item];
        setNewItem(items);
        updateTasks(items);
        console.log(item);
        setList({ done: false, label: "" });
    }

    //Eliminar item de la lista
    const deleteItem = (i) => {
        let newAux = [...newItem];
        newAux.splice(i, 1);
        setNewItem(newAux);
        updateTasks(newAux);
    }

    const clearList = () => {
        // Limpia la lista
        let emptyArr = [];
        setNewItem(emptyArr);
        //deleteUser();
    }

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
                            name="myInput"
                            id="myInput"
                            type="text"
                            placeholder="Type any task here..."
                            autoComplete="off"
                            onChange={(e) => listText(e)}
                        />
                        <button
                            className="btn btn-info"
                            id="btn1"
                            onClick={(e) => addItem(e)}
                        >
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div>
                            {list.length === 0 && <h5 className="noTask"><b>No tasks yet.</b> Please write a task and click the <i className="fas fa-plus"></i> button.</h5>}
                            <ul>
                                {newItem.map((item, i) => {
                                    return (
                                        <li key={i}>
                                            {item.label}
                                            <button
                                                className="btn"
                                                id="btn2"
                                                onClick={() => deleteItem(item)}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn" id="btn3" onClick={(e) => clearList(e)}><b>Clear All</b></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;

/*
import React, { useEffect, useState } from 'react';
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
        //Actualiza el State
        this.setState({
            [key]: value
        });
    }

    addItem() {
        //Crea un item con un id unico
        const newItem = {
            id: 1 + Math.random(),
            value: this.state.newItem.slice()
        };
        //Copia la lista en ese momento
        const list = [...this.state.list]
        //Agrega un item nuevo a la lista
        list.push(newItem);
        //Actualiza el state con la nueva lista y resetea el input "newItem"
        this.setState({
            list,
            newItem: ""
        });
    }

    deleteItem(id) {
        //Copia la lista actual
        const list = [...this.state.list];

        //Filtra el item eliminado
        const updatedList = list.filter(item => item.id !== id);

        this.setState({ list: updatedList });
    }

    componentDidMount() {
        fetch("https://assets.breatheco.de/apis/fake/todos/user/jorgep0496")
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    render() {

        //const [taskList, setTaskList] = useState([]);
        //const [updateTask, setUpdateTask] = useState();

        const clearList = () => {
            // Limpia la lista
            return (
                console.log("test")
            )
        }

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
                                {this.state.list.length === 0 && <h5 className="noTask"><b>No tasks yet.</b> Please write a task and click the <i className="fas fa-plus"></i> button.</h5>}
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
                    <div className="row">
                        <div className="col-md-12">
                            <button className="btn" id="btn3" onClick={() => clearList()}><b>Clear All</b></button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
*/