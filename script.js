const API_URL = "http://127.0.0.1:5000/tasks";


// Get tasks
async function loadTasks() {

    const response = await fetch(API_URL);

    const tasks = await response.json();

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>
                ${task.completed ? "✅" : "⬜"}
                ${task.title}
            </span>

            <div>
                <button onclick="completeTask(${task.id})">
                    Complete
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}


// Add task
async function addTask() {

    const input = document.getElementById("taskInput");

    const title = input.value.trim();

    if (title === "") {
        alert("Please enter a task");
        return;
    }

    await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: title
        })
    });

    input.value = "";

    loadTasks();
}


// Complete task
async function completeTask(id) {

    await fetch(`${API_URL}/${id}`, {
        method: "PUT"
    });

    loadTasks();
}


// Delete task
async function deleteTask(id) {

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}


loadTasks();