import { LitElement, html, css } from "lit-element";
import "fa-icons";

export class TodoElement extends LitElement {

	static get properties() {
		return {
			todo: {
				type: Object,
			},
			onCheck: {
				type: Function,
			},
			onRename: {
				type: Function,
			},
			onDelete: {
				type: Function
			},
			isEditing: {
				type: Boolean,
			},
			editInputValue: {
				type: String,
			}
		}
	}

	static get styles() {
		return css`
			.todo {
				height: 40px;
				padding: 10;
				display: flex;
				align-items: center;
				border-width: 1px 0 0 0;
				border-color: grey;
				border-style: solid;
			}

			.text {
				margin: 0 0 0 10px;
				font-size: 30px;
				color: var(--text-color);
				flex-grow: 2;
			}

			.doneText {
				text-decoration: line-through;
			}

			input {
				height: 35px;
				width: 100%;
				font-size: 30px;
				outline: none;
				border: none;
				padding: 10px;
				color: var(--text-color);
				background-color: inherit;
				font-family: var(--font-family);
			}

			.actionIcon {
				cursor: pointer;
			}

		`
	}

	onKeyDown(event) {
		if(event.key === "Enter") {
			this.onRename(this.todo.id, this.editInputValue);
			this.isEditing = false;
		}
	}

	onClick() {
		this.onCheck(this.todo.id);
	}

	onChange(event) {
		this.editInputValue = event.target.value;
	}

	_onDelete() {
		this.onDelete(this.todo.id)
	}

	onDoubleClick() {
		this.isEditing = true;
		this.editInputValue = this.todo.text;
	}

	render() {
		let checkIcon;

		const {
			text,
			done
		} = this.todo;

		let textClases = "text";

		if(done) {
			textClases += " doneText";

			checkIcon = html`
				<fa-icon class="fas fa-check-circle"
					color="#ffffff"
					path-prefix="../node_modules/" >
				</fa-icon>
			`;
		} else {
			checkIcon = html`
				<fa-icon class="far fa-circle"
					color="#ffffff"
					path-prefix="../node_modules/">
				</fa-icon>
			`;
		}

		let content;

		if(this.isEditing) {
			content = html`
				<input .value="${this.editInputValue}"
					@input="${this.onChange}">
			`;
		} else {
			content = html`
				<p class=${textClases}>
					${text}
				</p>
			`;
		}

		return html`
			<div class="todo"
				@keydown="${this.onKeyDown}"
				@dblclick="${this.onDoubleClick}">

				<span @click="${this.onClick}"
					class="actionIcon">

					${checkIcon}
				</span>

				${content}

				<span class="actionIcon"
					@click="${this._onDelete}">

					<fa-icon class="fa fa-trash"
						color="#ffffff"
						path-prefix="../node_modules/">
					</fa-icon>
				</span>
			</div>
		`;
	}

}

customElements.define("todo-element", TodoElement);