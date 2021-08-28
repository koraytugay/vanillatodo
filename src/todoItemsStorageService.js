export default (function() {
  const todoItems = 'todo-items';
  const idCounter = 'id-counter';

  function getTodoItems() {
    if (localStorage.getItem(todoItems) === null) {
      localStorage.setItem(todoItems, JSON.stringify([]));
      localStorage.setItem(idCounter, '1');
    }
    return JSON.parse(localStorage.getItem(todoItems));
  }

  function getNextTodoItemId() {
    const nextTodoItemId = parseInt(localStorage.getItem(idCounter));
    localStorage.setItem(idCounter, '' + (nextTodoItemId + 1));
    return nextTodoItemId;
  }

  function setTodoItems(items) {
    localStorage.setItem(todoItems, JSON.stringify(items));
  }

  function deleteTodoItem(id) {
    setTodoItems(getTodoItems().filter(todoItem => todoItem.id !== id));
  }

  function deleteTodoItems() {
    setTodoItems([]);
  }

  return {
    getNextTodoItemId,
    getTodoItems,
    setTodoItems,
    deleteTodoItem,
    deleteTodoItems
  }
}());
