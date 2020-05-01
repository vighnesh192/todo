import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button, FormGroup, Form, Input } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import TodoItem from "./TodoItem";
import axios from "axios";

class TodoList extends Component {
	state = {
		todos: [],
		title: ''
	};

	componentDidMount() {
		axios.get("/api/todos")
			.then(res => this.setState({ todos: res.data }))
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	//ADD TODO
	addTodo = (e) => {
		axios.post('/api/todos', {
			name: this.state.title
		})
			.then(res => this.setState({todos: [...this.state.todos, res.data]}))
		
		this.setState({ title: '' })
	}

	//DEL TODO
	delTodo(item) {
		axios.delete(`/api/todos/${item._id}`)
			.then(res => this.setState((state) => ({
				todos: [...state.todos.filter(
					(todo) => todo._id !== item._id
				)]
			})))

		
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
							<CSSTransition key={item._id} timeout={500} classNames="fade">
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