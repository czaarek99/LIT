import {
	LitElement, html, css
} from "lit-element";

export class AppElement extends LitElement {

	static get properties() {
		return {
			test: {
				type: String,
				reflect: true
			}
		}
	}

	static get styles() {
		return css`
			:host {
				height: 100%;
			}

			main {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
			}
		`
	}

	constructor() {
		super();
		this.test = "hi";

		setInterval(() => {
			this.setAttribute("test", new Date().toString());
		}, 1000);
	}

	render() {
		return html`
			<main>
				<div>
					<h1>
						My todos
					</h1>
					<todo-element></todo-element>
				</div>
			</main>
		`;
	}

}

customElements.define("app-element", AppElement);