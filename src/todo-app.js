import { html, css, LitElement } from 'lit';
import './todo-item.js';

class TodoApp extends LitElement {
  static get properties() {
    return {
      todos: { type: Array },
      task: { type: String },
    };
  }

  constructor() {
    super();
    this.todos = [];
    this.task = '';
    this.nextId = 0;
  }

  render() {
    return html`
      <div class="wrapper">
        <h1>Todo App</h1>
        <div class="stats">
          <p>Number of todos: ${this.todos.length}</p>
          <p>Number of todos completed: ${this.todos.filter((todo) => todo.checked).length}</p>
        </div>
        <div class="container">
          <div class="addTodo">
            <input
              id="addTodoInput"
              placeholder="Add a task.."
              @change="${this.updateTask}"
              @keyup="${this.addTodo}"
            />
            <button @click="${this.addTodo}">Add</button>
          </div>
          <ul id="todos">
            ${this.todos.length > 0
              ? this.todos.map(
                  (todo) => html`
                    <todo-item
                      .text="${todo.text}"
                      .checked="${todo.checked}"
                      .id="${todo.id}"
                      @onToggle="${this.toggleTodo}"
                    ></todo-item>
                  `
                )
              : 'No tasks'}
          </ul>
        </div>
      </div>
    `;
  }

  addTodo() {
    if (this.task) {
      this.todos = [...this.todos, { text: this.task, checked: false, id: this.nextId++ }];
      this.task = '';
      this.shadowRoot.getElementById('addTodoInput').value = '';
    }
  }

  updateTask(e) {
    this.task = e.target.value;
  }

  toggleTodo(e) {
    console.log(e.currentTarget);
    this.todos = this.todos.map((todo, index) => {
      console.log(todo.id, e.detail);
      return todo.id === e.detail ? { ...todo, checked: !todo.checked } : todo;
    });
  }

  static get styles() {
    return css`
      * {
        display: block;
        font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
          'Helvetica Neue', Arial, sans-serif;
        text-align: center;
        padding: 0;
        margin: 0;
        color: white;
      }
      .wrapper {
        max-width: 600px;
        margin: 0 auto;
        border: 1px solid #ccc;
        padding: 2rem 2rem;
        min-height: 400px;
        background: #333;
        border-radius: 5px;
      }
      .container {
        width: 100%;
      }
      .addTodo {
        display: flex;
        justify-content: space-between;
        margin: 1rem 0;
      }
      .addTodo > * {
        flex-grow: 1;
      }
      .addTodo input {
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 1rem;
        color: black;
      }
      .addTodo button {
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 1rem;
        color: black;
        margin-left: 1rem;
        cursor: pointer;
        background: #ccc;
      }
      ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
      }
      .stats {
        display: flex;
        flex-direction: column;
        align-items: start;
        margin: 1rem 0;
      }
    `;
  }
}

customElements.define('todo-app', TodoApp);
