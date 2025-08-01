const todoList01 = [];
const todoList02 = [];
const todoList03 = [];

function addTodo01() {
  const inputElement = document.querySelector('.js-name-input-01');
  const name = inputElement.value;

  todoList01.push(name);
  console.log(todoList01);

  inputElement.value = '';
}

function addTodo02() {
  const inputElement = document.querySelector('.js-name-input-02');
  const name = inputElement.value;
  todoList02.push(name);

  let todoListHTML = '';
  for (let i = 0; i < todoList02.length; i++) {
    todoListHTML += `<p>${todoList02[i]}</p>`;
  }
  document.querySelector('.todo-list-container-02')
    .innerHTML = todoListHTML;

  inputElement.value = '';
}

function addTodo03() {
  const inputNameElement = document.querySelector('.js-name-input-03');
  const inputDateElement = document.querySelector('.js-date-input-03');
  const name = inputNameElement.value;
  const date = inputDateElement.value;

  todoList03.push({ name, date });

  renderTodoList03();

  inputNameElement.value = '';
  inputDateElement.value = '';
}

function renderTodoList03() {
  let todoListHTML = '';
  todoList03.forEach((todoObject, index) => {
    const { name, date } = todoObject;
    todoListHTML +=`
      <div>${name}</div>
      <div>${date}</div>
      <button onclick="
        todoList03.splice(${index},1);
        renderTodoList03();
      ">Delete
      </button>
    `;
  })
  document.querySelector('.todo-list-container-03')
    .innerHTML = todoListHTML;
}