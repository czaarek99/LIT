import {
	LitElement, html, css
} from "lit-element";

let todoId = 0;

export class AppElement extends LitElement {

	static get properties() {
		return {
			todos: {
				type: Array,
			},
			newTodoText: {
				type: String,
			}
		}
	}

	static get styles() {
		return css`
			:host {
				height: 100%;
				--border-color: grey;
			}

			h1 {
				text-align: center;
				font-size: 40px;
				color: var(--text-color);
			}

			main {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
			}

			.newTodoContainer {
				display: flex;
				align-items: center;
				background-color: #202121;
				border-top: 1px solid var(--border-color);
				transition: 509ms background-color;
			}

			.newTodoContainer:hover {
				background-color: #282929;
			}

			.addButton {
				cursor: pointer;
			}

			input {
				font-size: 20px;
				height: 40px;
				width: 100%;
				outline: none;
				border: none;
				padding: 10px;
				color: var(--text-color);
				background-color: inherit;
				font-family: var(--font-family);
			}

			.list {
				width: 500px;
				border: 1px solid var(--border-color);
				border-radius: 3px;
			}

			.iconContainer {
				cursor: pointer;
				padding: 0 10px;
			}

			.statusText {
				margin: 0;
				color: var(--text-color);
				border-top: 1px solid var(--border-color);
				padding: 5px;
				font-size: 18px;
				text-align: right;
			}
		`
	}

	constructor() {
		super();

		this.onTodoClick = this.onTodoClick.bind(this);
		this.onAddClick = this.onAddClick.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onRename = this.onRename.bind(this);

		this.newTodoText = "";
		this.todos = [];
	}

	onDelete(id) {
		const copy = [];

		for(const todo of this.todos) {
			if(todo.id !== id) {
				copy.push(todo);
			}
		}

		this.todos = copy;
	}

	onTodoClick(id) {
		const copy = [...this.todos];

		for(let i = 0; i < copy.length; i++) {
			const todo = copy[i];

			if(todo.id === id) {
				copy[i] = Object.assign({}, todo, {
					done: !todo.done
				})
			}
		}

		this.todos = copy;
	}

	onAddClick() {
		if(this.newTodoText) {
			const newTodo = {
				id: todoId++,
				text: this.newTodoText,
				done: false
			};

			this.todos = [...this.todos, newTodo];
			this.newTodoText = "";
		}
	}

	onChange(event) {
		this.newTodoText = event.target.value;
	}

	onRename(id, newText) {
		const copy = [...this.todos];

		for(let i = 0; i < copy.length; i++) {
			const todo = copy[i];

			if(todo.id === id) {
				copy[i] = Object.assign({}, todo, {
					text: newText
				})
			}
		}

		this.todos = copy;
	}

	render() {
		const todos = this.todos.map((todo) => {
			return html`
				<todo-element .todo="${todo}"
					.onDelete="${this.onDelete}"
					.onRename="${this.onRename}"
					.onCheck="${this.onTodoClick}" />
			`
		});

		let finishedTodos = 0;
		let activeTodos = 0;

		for(const todo of this.todos) {
			if(todo.done) {
				finishedTodos++;
			} else {
				activeTodos++;
			}
		}

		return html`
			<main>
				<div class="list">
					<h1>
						My todos
					</h1>

					<div class="newTodoContainer">
						<input .value="${this.newTodoText}"
							@change="${this.onChange}"
							placeholder="Enter a new todo....">

						<span class="iconContainer"
							@click="${this.onAddClick}">

							<fa-icon class="fas fa-plus"
								color="#ffffff"
								class="addButton"
								path-prefix="../node_modules/" >
							</fa-icon>
						</span>
					</div>

					<div>
						${todos}
					</div>

					<p class="statusText"">
						finished: ${finishedTodos} active: ${activeTodos}
					</p>
				</div>
			</main>
		`;
	}

}

customElements.define("app-element", AppElement);