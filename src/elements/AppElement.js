import {
	LitElement, html, css
} from "lit-element";

export class AppElement extends LitElement {

	static get properties() {
		return {
			test: {
				type: String,
				reflect: true
			},
			todos: {
				type: Array,
				reflect: true
			}
		}
	}

	static get styles() {
		return css`
			:host {
				height: 100%;
			}

			h1 {
				text-align: center;
			}

			main {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
			}

			.list {
				width: 500px;
				border: 1px solid grey;
				border-radius: 3px;
			}
		`
	}

	constructor() {
		super();

		this.onClick = this.onClick.bind(this);

		this.todos = [
			{
				id: 0,
				text: "test todo",
				done: true
			}
		]

	}

	onClick(todo) {
		const copy = [...this.todos];
		todo.done = !todo.done;

		this.setAttribute("todos", copy);
	}

	render() {
		const todos = this.todos.map((todo) => {
			return html`
				<todo-element .todo="${todo}" .onCheck="${this.onClick}"></todo-element>
			`
		});

		return html`
			<main>
				<div class="list">
					<h1>
						My todos
					</h1>
					<div>
						${todos}
					</div>
				</div>
			</main>
		`;
	}

}

customElements.define("app-element", AppElement);