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
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove Task event
    taskList.addEventListener('click', removeTask);
    //Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks)
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
    // Clear the Input
    taskInput.value = '';


    e.preventDefault();
}


// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm("Are you sure?")){
        e.target.parentElement.parentElement.remove();
        }
    }
}

// Clear Tasks 
function clearTasks() {
    //taskList.innerHTML = '';
    
    // While Loop 'Faster'
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
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
