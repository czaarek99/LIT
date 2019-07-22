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
				font-size: 25px;
			}
		`
	}

	onClick() {
		this.onCheck(this.todo);
	}

	render() {
		let checkIcon;

		const {
			text,
			done
		} = this.todo;

		if(done) {
			checkIcon = html`
				<fa-icon class="fas fa-check-circle"
					path-prefix="../node_modules/" />
			`;
		} else {
			checkIcon = html`
				<fa-icon class="far fa-circle"
					path-prefix="../node_modules/" />
			`;
		}


		return html`
			<div class="todo">
				<span @click="${this.onClick}">
					${checkIcon}
				</span>

				<p class="text">
					${text}
				</p>
			</div>
		`
	}

}

customElements.define("todo-element", TodoElement);