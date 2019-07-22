import {
	LitElement, html, customElement, property
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

	constructor() {
		super();
		this.test = "hi";

		setInterval(() => {
			this.setAttribute("test", new Date().toString());
		}, 1000);
	}

	render() {
		return html`
			<p>
				${this.test}
			</p>
		`;
	}

}

customElements.define("app-element", AppElement);