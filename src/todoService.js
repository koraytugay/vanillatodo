import todoItemsStorageService from './todoItemsStorageService.js';

export default (function() {
  function Todo(text) {
    this.text = text;
    this.id = `todo-item-${todoItemsStorageService.getNextTodoItemId()}`;
    this.completed = false;

    todoItemsStorageService.setTodoItems([...todoItemsStorageService.getTodoItems(), this]);
  }

  function toggleTodoItemCompletedStatus(id) {
    const todoItems = todoItemsStorageService.getTodoItems();
    const todoItem = todoItems.filter(todoItem => todoItem.id === id)[0];
    todoItem.completed = !todoItem.completed;
    todoItemsStorageService.setTodoItems(todoItems);
  }

  const getTodoItems = () => todoItemsStorageService.getTodoItems();
  const deleteTodoItem = (id) => todoItemsStorageService.deleteTodoItem(id);
  const deleteTodoItems = () => todoItemsStorageService.deleteTodoItems();

  return {
    Todo,
    getTodoItems,
    toggleTodoItemCompletedStatus,
    deleteTodoItem,
    deleteTodoItems
  };
}());
