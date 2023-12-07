import { html, css, LitElement } from 'lit';

class TodoItem extends LitElement {
  constructor() {
    super();
    this.text = '';
    this.checked = false;
    this.id = 0;
  }

  static get properties() {
    return {
      text: { type: String },
      checked: { type: Boolean },
      id: { type: Number },
    };
  }

  render() {
    return html`
      <li class="item">
        <input type="checkbox" ?checked="${this.checked}" @change="${this.toggleCompleted}" />
        <label class=${this.checked ? 'completed' : ''}>${this.text}</label>
      </li>
    `;
  }

  toggleCompleted() {
    this.dispatchEvent(new CustomEvent('onToggle', { detail: this.id }));
  }

  static styles = css`
    .completed {
      text-decoration: line-through;
    }
    li {
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
  `;
}

customElements.define('todo-item', TodoItem);
