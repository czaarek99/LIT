import { LitElement, html, css } from "lit-element";
import "fa-icons";

export class TodoElement extends LitElement {

	static get properties() {
		return {
			todo: {
				type: Object,
				reflect: true
			},
			onCheck: {
				type: Function,
				reflect: false
			}
		}
	}

	static get styles() {
		return css`
			.todo {
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
			}

			.doneText {
				text-decoration: line-through;
			}

		`
	}

	onClick() {
		this.onCheck(this.todo.id);
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

		return html`
			<div class="todo">
				<span @click="${this.onClick}"
					class="iconContainer">

					${checkIcon}
				</span>

				<p class=${textClases}>
					${text}
				</p>
			</div>
		`
	}

}

customElements.define("todo-element", TodoElement);