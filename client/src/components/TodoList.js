import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {v4 as uuid} from "uuid";

class TodoList extends Component {
    state = {
        todos: [
            {id: uuid(), name: "Code"},
            {id: uuid(), name: "Eat"},
            {id: uuid(), name: "Sleep"},
            {id: uuid(), name: "Repeat"},
        ]
    }

    render() {
        const { todos } = this.state;
        return(
            <Container>
                <Button 
                    color="dark"
                    style={{ marginBottom: '2rem' }}
                    onClick={() => {
                        const name = prompt("Enter Todo");
                        if (name) {
                            this.setState(state => ({
                                todos: [...state.todos, { id: uuid(), name }]
                            }))
                        }
                    }}>
                    Add ToDo
                </Button>

                <ListGroup>
                    <TransitionGroup className="todo-list">
                        {todos.map(({ id, name }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button 
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={() => {
                                            this.setState(state => ({
                                                todos: state.todos.filter(todo => todo.id !== id)
                                            }))
                                        }}>&times;</Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

export default TodoList;