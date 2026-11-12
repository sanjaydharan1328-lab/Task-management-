let tasks = [
    { name: "Design Website", status: "Completed" },
    { name: "Develop Homepage", status: "In Progress" },
    { name: "Test Application", status: "Pending" },
    { name: "Create Database", status: "In Progress" }
];

// Add Task
function addTask() {

    let name = document.getElementById("taskName").value.trim();
    let status = document.getElementById("taskStatus").value;

    if (name === "") {
        alert("Please enter a task name!");
        return;
    }

    tasks.push({
        name: name,
        status: status
    });

    document.getElementById("taskName").value = "";

    displayTasks();
}

// Display Tasks
function displayTasks(search = "") {

    let list = document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach((task, index) => {

        if (!task.name.toLowerCase().includes(search.toLowerCase())) {
            return;
        }

        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.textContent = task.name;

        let statusCell = document.createElement("td");

        let select = document.createElement("select");

        ["Pending", "In Progress", "Completed"].forEach(status => {

            let option = document.createElement("option");

            option.value = status;
            option.textContent = status;
            option.selected = task.status === status;

            select.appendChild(option);
        });

        select.addEventListener("change", function() {
            tasks[index].status = this.value;
            displayTasks(document.getElementById("searchTask").value);
        });

        statusCell.appendChild(select);

        let actionCell = document.createElement("td");

        let deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";

        deleteBtn.onclick = function() {
            tasks.splice(index, 1);
            displayTasks(document.getElementById("searchTask").value);
        };

        actionCell.appendChild(deleteBtn);

        row.append(nameCell, statusCell, actionCell);

        list.appendChild(row);
    });

    updateDashboard();
}

// Update Dashboard
function updateDashboard() {

    document.getElementById("totalTasks").textContent =
        tasks.length;

    document.getElementById("pendingTasks").textContent =
        tasks.filter(t => t.status === "Pending").length;

    document.getElementById("progressTasks").textContent =
        tasks.filter(t => t.status === "In Progress").length;

    document.getElementById("completedTasks").textContent =
        tasks.filter(t => t.status === "Completed").length;
}

// Search Tasks
document.getElementById("searchTask")
.addEventListener("input", function() {
    displayTasks(this.value);
});

// Initial Display
displayTasks();
