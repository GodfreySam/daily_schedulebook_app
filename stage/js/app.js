// Todo Class: Represent Todo Item
class Todo {
  constructor(item, start, stop) {
    this.item = item;
    this.start = start;
    this.stop = stop;
  }
}

// UI Class: Handles UI Tasks
class UI {
  static displayTodos() {
    const todos = Store.getTodos();

    todos.forEach((todo)=> UI.addTodoToList(todo));
  }

  static addTodoToList(todo) {
    const list = document.querySelector('#todo-list');
    const row = document.createElement('tr');
    
    row.innerHTML = `                 
      <td id="items">${todo.item}</td>
        <label id="begin" class="inner-td">Start:</label><input type="time" id="startTime" class="inner-td todo-start" value="${todo.start}"> 
        <label id="end" class="inner-td">Finish:</label><input type="time" id="stopTime" class="inner-td" value="${todo.stop}">
      <td class="delete-control">
        <i class="fas fa-trash-alt delete btn btn-sm btn-outline-danger border-0"></i>
      </td>
    `;
     list.appendChild(row);
  }

  static deleteTodoItem(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.mx-auto');
    const table = document.querySelector('#todo-table');
    container.insertBefore(div, table);

    // Make vanish in 3 seconds
    setTimeout(()=> 
    document.querySelector('.alert').remove(), 3000);
  }  

  static clearFields() {
    document.querySelector('#event').value = '';
    document.querySelector('#start').value = '';
    document.querySelector('#stop').value = '';
}

}
 // store Class: Handles storage
 class Store {
   static getTodos() {
     let todos;
     if(localStorage.getItem('todos') === null) {
       todos = [];
     } else {
       todos = JSON.parse(localStorage.getItem('todos'));
     }
     return todos
   }

   static addTodos(todo) {
     const todos = Store.getTodos();
     todos.push(todo);
     localStorage.setItem('todos', JSON.stringify(todos));
   }
   static removeTodos(stop) {
     const todos = Store.getTodos();
     todos.forEach((todo, index) => {
       if(todo.stop === stop) {
         todos.splice(index, 1);
       }
     });

     localStorage.setItem('todos', JSON.stringify(todos));
   }
 }

  // Event: Display Todos
  document.addEventListener('DOMContentLoaded', UI.displayTodos);

  // Event: Add a Todo
  document.querySelector('#todo-form').addEventListener('submit', (e)=> {

     // Prevent actual submit
     e.preventDefault();

     // Get form values
     const item = document.querySelector('#event').value;
     const start = document.querySelector('#start').value;
     const stop = document.querySelector('#stop').value;

     // Validate
     if(item === '' || start === '' || stop === '') {
       UI.showAlert('Please fill in all fields', 'danger');
     } else {
        
      // Instantiate Todo
      const todo = new Todo(item, start, stop);

      // Add Todo to UI
      UI.addTodoToList(todo);
    
      // Add Todo to store
      Store.addTodos(todo);

      // Show success message
      UI.showAlert('Todo item Added', 'success');

      // Clear fields
      UI.clearFields();

     }
  });

   // Event: Remove an Item
   document.querySelector('#todo-list').addEventListener('click', (e) => {
     // Remove todo from UI
     UI.deleteTodoItem(e.target);

     // Remove todo from store
     Store.removeTodos(e.target.parentElement.previousElementSibling.value);

     // Show success message
     UI.showAlert('Todo item Removed', 'success');

   });

   // Register Our Service Worker 
   if ("serviceWorker" in navigator) {
     window.addEventListener("load", function() {
       navigator.serviceWorker
       .register("/serviceWorker.js")
       .then(res => this.console.log("service worker registered"))
       .catch(err => this.console.log("service worker not registered", err))
     })
   }

 
   