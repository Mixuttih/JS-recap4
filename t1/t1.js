// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];

// add your code here
const todoListElement = document.querySelector('ul');
const dialog = document.querySelector('dialog');
const addButton = document.querySelector('.add-btn');
const form = dialog.querySelector('form');
const taskInput = form.querySelector('input');

function renderTodo(todo) {
  const listItem = document.createElement('li');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const deleteButton = document.createElement('button');

  checkbox.type = 'checkbox';
  checkbox.id = `todo-${todo.id}`;
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', () => {
    todo.completed = checkbox.checked;
    console.log(todoList);
  });

  label.htmlFor = checkbox.id;
  label.textContent = todo.task;

  deleteButton.type = 'button';
  deleteButton.textContent = 'Del';
  deleteButton.addEventListener('click', () => {
    const todoIndex = todoList.findIndex(item => item.id === todo.id);
    todoList.splice(todoIndex, 1);
    todoListElement.removeChild(listItem);
    console.log(todoList);
  });

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(deleteButton);
  todoListElement.appendChild(listItem);
}

todoList.forEach(renderTodo);

addButton.addEventListener('click', () => {
  dialog.showModal();
  taskInput.focus();
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const task = taskInput.value.trim();
  if (!task) {
    return;
  }

  const newTodo = {
    id: todoList.reduce((highestId, todo) => Math.max(highestId, todo.id), 0) + 1,
    task,
    completed: false,
  };

  todoList.push(newTodo);
  renderTodo(newTodo);
  console.log(todoList);
  form.reset();
  dialog.close();
});