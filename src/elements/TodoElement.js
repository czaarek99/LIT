import { LitElement, html, css } from "lit-element";

export class TodoElement extends LitElement {

	static get styles() {
		return css`

		`
	}

	render() {
		return html`
			<link rel="stylesheet" href="styles/all.css">
			<div>
				Hello
				<i class="fas fa-camera"></i>
			</div>
		`
	}

}

customElements.define("todo-element", TodoElement);