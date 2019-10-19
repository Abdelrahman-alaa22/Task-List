// Define UI vars
const form = document.querySelector('#task-form ');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners();


// Load all event listeners
function loadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks)
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove Task event
    taskList.addEventListener('click', removeTask);
    //Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks)
}

// Get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Create Li element
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    // Create TextNode and append to LI
    li.appendChild(document.createTextNode(tasks));
    // Create new link element
    const link = document.createElement('a');
    // Add a class
    link.className = 'delete-item secondary-content';
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to LI
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    })
}

//Add task
function addTask(e) {
    if(taskInput.value === ""){
        alert('Add a Task');
    }

    // Create Li element
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    // Create TextNode and append to LI
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add a class
    link.className = 'delete-item secondary-content';
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to LI
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    //Store in localstorage
    storeTaskInLocalStorage(taskInput.value);


    // Clear the Input
    taskInput.value = '';


    e.preventDefault();
}

// Store in Local Storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks))
}




// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm("Are you sure?")){
        e.target.parentElement.parentElement.remove();
        //remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove form LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(tast, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Clear Tasks 
function clearTasks() {
    //taskList.innerHTML = '';
    
    // While Loop 'Faster'
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    //Clear from LS
    clearTasksFromLocalStorage();
}

// clear tasks from local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) !== -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}



