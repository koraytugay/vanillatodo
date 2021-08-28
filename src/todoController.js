import todoService from './todoService.js';

(function() {
  const findById = id => document.querySelector(`#${id}`);
  const createElement = (tag, options) => document.createElement(tag, options);

  window.addEventListener('load', function() {
    refreshUi();
  });

  findById('new-todo-input').addEventListener('keydown', e => {
    if ('Enter' === e.key && e.target.value) {
      new todoService.Todo(e.target.value);
      e.target.value = '';
      refreshUi();
    }
  });

  findById('delete-all-todo-items').addEventListener('click', e => {
    todoService.deleteTodoItems();
    refreshUi();
  });

  function toggleTodoCompleteStatus(id) {
    todoService.toggleTodoItemCompletedStatus(id);
    refreshUi();
  }

  function deleteTodoItem(id) {
    todoService.deleteTodoItem(id);
    refreshUi();
  }

  function createTodoDiv(todoItem) {
    const todoDiv = createElement('div');
    todoDiv.id = todoItem.id;

    const markAsDoneCheckbox = createElement('input');
    markAsDoneCheckbox.setAttribute('type', 'checkbox');
    markAsDoneCheckbox.addEventListener('click', () => toggleTodoCompleteStatus(todoItem.id));

    const todoSpan = createElement('span');
    todoSpan.innerText = todoItem.text;

    const deleteTodoItemLink = createElement('a');
    deleteTodoItemLink.setAttribute('href', '#');
    deleteTodoItemLink.addEventListener('click', () => deleteTodoItem(todoItem.id));
    deleteTodoItemLink.innerText = '❌';

    if (todoItem.completed) {
      todoSpan.classList.add('done');
      markAsDoneCheckbox.setAttribute('checked', 'checked');
    }

    todoDiv.appendChild(markAsDoneCheckbox);
    todoDiv.appendChild(todoSpan);
    todoDiv.appendChild(deleteTodoItemLink);

    return todoDiv;
  }

  function refreshUi() {
    const todoItemsDiv = findById('todo-items');
    todoItemsDiv.innerHTML = '';
    todoService.getTodoItems().forEach(todoItem => todoItemsDiv.appendChild(createTodoDiv(todoItem)));
  }
})();
