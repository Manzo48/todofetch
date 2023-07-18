window.addEventListener('DOMContentLoaded', () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
      const ul = document.querySelector('.list');
      const spisok = document.querySelector('.spisok');
      const input = document.querySelector('#inputval');
      const button = document.querySelector('#addButton');
      const clearButton = document.querySelector('#clearButton');
      let todos = data;
      
      function func() {
        for (let i = 1; i <= 1; i++) {
          const btn = document.createElement('button');
          btn.dataset.index = i;
          btn.textContent = 'users';
          spisok.append(btn);
          btn.addEventListener('click', () => {
            render(todos); 
          });
        }
      }
      
      function render(data) {
        ul.innerHTML = '';
      
        for (let i = 0; i < data.length; i++) {
          const li = document.createElement('li');
          const del = document.createElement('button');
          const done = document.createElement('input');
          
          del.textContent = '❌'; 
          done.type = 'checkbox';
          li.textContent = data[i].title;
          li.classList.add('clas');
          
          if (data[i].completed) {
            done.checked = true;
            li.classList.add('completed');
          }
          
          del.addEventListener('click', function() {
            remove(i);
          });
          done.addEventListener('click', function() {
            patch(i, li, data[i]);
          });
      
          ul.appendChild(li);
          li.appendChild(del);
          li.appendChild(done);
        }
      }
      
      clearButton.addEventListener('click', function() {
        todos = todos.filter((task) => !task.completed); // Используем todos вместо data
        render(todos); // Используем todos
      });

      
      async function remove(index) {
        try {
          const response = await fetch(`https://reqres.in/api/users/${index}`, {
            method: 'DELETE',
          });
          
          if (response.status === 204) {
            console.log('Пользователь удален');
            todos.splice(index, 1); // Используем todos
            render(todos); // Используем todos
          } else {
            console.error('Ошибка при удалении пользователя.');
          }
        } catch (error) {
          console.error('Ошибка при выполнении запроса:', error);
        }
      }
      
      async function addTodo() {
        try {
          if (input.value !== '') {
            const newTodo = {
              title: input.value,
              completed: false
            };
            
            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
              method: 'POST',
              body: JSON.stringify(newTodo),
              headers: {
                'Content-type': 'application/json; charset=UTF-8'
              }
            });
            
            const data = await response.json();
            todos.push(data); // Добавляем новую задачу в todos
            render(todos); // Используем todos
            input.value = ''; // Очищаем поле ввода
            console.log(response)
          }
        } catch (error) {
          console.error('Ошибка при выполнении запроса:', error);
        }
      }
      
      button.addEventListener('click', addTodo);
      async function patch(index, li) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${index + 1}`, {
            method: 'PATCH',
            body: JSON.stringify({
              completed: !todos[index].completed
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          });
      
          if (response.status === 200) {
            console.log('Статус задачи изменен');
            todos[index].completed = !todos[index].completed;
            if (todos[index].completed) {
              li.classList.add('completed');
            } else {
              li.classList.remove('completed');
            }
          } else {
            console.error('Ошибка при изменении задачи.');
          }
        } catch (error) {
          console.error('Ошибка при выполнении запроса:', error);
        }
      }
      
      
      func();
    })
    .catch((error) => {
      console.error('Ошибка при выполнении запроса:', error);
    });
});
