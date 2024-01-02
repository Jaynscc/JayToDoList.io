document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    checkLocalStorage();
});

//add new task object
function addTask() {
    const taskInput = document.getElementById('newTask');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const tasks = getTasksFromStorage();
        const taskObject = {
            text: taskText,
            completed: false,
            date: null
        };
        tasks.push(taskObject);
        saveTasksToStorage(tasks);
        taskInput.value = '';
        loadTasks();
        checkLocalStorage();
    }
}

//Load the tasks from the localstorage data
function loadTasks() {
    const tasks = getTasksFromStorage();
    const tasksContainer = document.getElementById('tasks-container');
    tasksContainer.innerHTML = '';

    tasks.forEach(function (task, index) {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';

        const checkbox = document.createElement('input');
        checkbox.id= 'inputCheckBox';
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function () {
            toggleTaskCompletion(index);
        });

        const taskText = document.createElement('span');
        taskText.id = 'taskTest'
        taskText.textContent = task.text;
        taskText.style.textDecoration = task.completed ? 'line-through' : 'none';

        const dateElement = document.createElement('span');
        dateElement.id = 'dateItem';
        dateElement.textContent = task.completed && task.date ? ' @Done:  ' + formatDateTime(task.date) : '';

        const deleteButton = document.createElement('button');
        deleteButton.id = 'deleteBtn';
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', function () {
            deleteTask(index);
        });

        taskElement.appendChild(checkbox);
        taskElement.appendChild(taskText);
        taskElement.appendChild(dateElement);
        taskElement.appendChild(deleteButton);

        tasksContainer.appendChild(taskElement);
    });
}


function toggleTaskCompletion(index) {
    const tasks = getTasksFromStorage();
    tasks[index].completed = !tasks[index].completed;

    if (tasks[index].completed) {
        tasks[index].date = getCurrentDateTime();
    } else {
        tasks[index].date = null;
    }

    saveTasksToStorage(tasks);
    loadTasks();
}

function deleteTask(index) {
    const tasks = getTasksFromStorage();
    tasks.splice(index, 1);
    saveTasksToStorage(tasks);
    loadTasks();
    checkLocalStorage();
}

function getTasksFromStorage() {
    const tasksString = localStorage.getItem('tasks');
    return tasksString ? JSON.parse(tasksString) : [];
}

function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getCurrentDateTime() {
    const now = new Date();
    return now.toISOString(); // This returns the current date and time in ISO format
}

function formatDateTime(dateTimeString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString('en-US', options);
}

function cleanTask() {
    localStorage.clear();
    loadTasks();
    checkLocalStorage();
}

function handleKeyPress(event){
    if(event.key ==='Enter'){
        addTask();
    }
}

function checkLocalStorage() {
    const tasks = getTasksFromStorage();
    const cleanBtn = document.getElementById('cleanBtn');

    if (tasks.length > 0) {
        cleanBtn.style.display = 'block';
    } else {
        cleanBtn.style.display = 'none';
    }
}

const taskInput = document.getElementById('newTask');
taskInput.addEventListener('keypress',handleKeyPress);