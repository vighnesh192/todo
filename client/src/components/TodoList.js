import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button, FormGroup, Form, Input } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {v4 as uuid} from "uuid";
import TodoItem from "./TodoItem";

class TodoList extends Component {
	state = {
		todos: [],
		title: ''
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	//ADD TODO
	addTodo = (e) => {
		this.setState({todos: [...this.state.todos, {id: uuid() ,name: this.state.title}]})
		this.setState({ title: '' })
	}

	//DEL TODO
	delTodo(item) {
		this.setState((state) => ({
			todos: state.todos.filter(
				(todo) => todo.id !== item.id
			),
		}));
	}

	render() {
		const { todos } = this.state;
		return (
			<Container>
				<Form inline>
					<FormGroup>
						<Input type="text" name="title" placeholder="Add Todo..." value={this.state.title} onChange={this.onChange}/>
					</FormGroup>
					<Button
							color="dark"
							style={{ marginLeft: "1rem" }}
							onClick={this.addTodo}
						>
							Submit
					</Button>
      	</Form>
				<hr />
				<ListGroup className="ListGroup">
					<TransitionGroup className="todo-list">
						{todos.map((item) => (
							<CSSTransition key={item.id} timeout={500} classNames="fade">
								<ListGroupItem>

								<Button
										className="remove-btn"
										color="danger"
										size="sm"
										onClick={this.delTodo.bind(this, item)}
									>
										&times;
									</Button>

									<TodoItem todo={item} />
								
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