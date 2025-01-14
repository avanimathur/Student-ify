const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const tasks = {}; // Data structure to store tasks

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
};
renderCalendar();

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});

// Function to display tasks in a modal
function showTasksModal(tasksForDate) {
  const modal = document.getElementById("tasksModal");
  const modalContent = modal.querySelector(".modal-content");
  modalContent.innerHTML = "";

  // Create a heading for the modal
  const heading = document.createElement("h2");
  heading.textContent = "Tasks for Selected Date";
  modalContent.appendChild(heading);

  // Create a list to display tasks
  const tasksList = document.createElement("ul");
  tasksForDate.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.textContent = task;
    tasksList.appendChild(taskItem);
  });
  modalContent.appendChild(tasksList);

  // Add input field and button for adding tasks
  const taskInput = document.createElement("input");
  taskInput.setAttribute("type", "text");
  taskInput.setAttribute("placeholder", "Enter task");
  modalContent.appendChild(taskInput);

  const addButton = document.createElement("button");
  addButton.textContent = "Add Task";
  addButton.addEventListener("click", () => {
    const newTask = taskInput.value.trim();
    if (newTask !== "") {
      const clickedDate = new Date(currYear, currMonth, parseInt(day.textContent));
      if (!tasks[clickedDate]) {
        tasks[clickedDate] = [];
      }
      tasks[clickedDate].push(newTask);
      // Update the tasks list
      const taskItem = document.createElement("li");
      taskItem.textContent = newTask;
      tasksList.appendChild(taskItem);
      // Clear input field after adding task
      taskInput.value = "";
    }
  });
  modalContent.appendChild(addButton);

  // Display the modal
  modal.style.display = "block";
}

// Event listener for viewing tasks
document.querySelectorAll(".days li").forEach((day) => {
  day.addEventListener("click", () => {
    const clickedDate = new Date(currYear, currMonth, parseInt(day.textContent));
    if (tasks[clickedDate] && tasks[clickedDate].length > 0) {
      showTasksModal(tasks[clickedDate]);
    } else {
      // If no tasks added, prompt the user to add tasks
      const addTask = confirm("No tasks added for this date. Do you want to add tasks?");
      if (addTask) {
        showTasksModal([]);
      }
    }
  });
});

// Close the modal when the close button is clicked
document.getElementById("closeModal").addEventListener("click", () => {
  const modal = document.getElementById("tasksModal");
  modal.style.display = "none";
});

// Close the modal when the user clicks anywhere outside of it
window.addEventListener("click", (event) => {
  const modal = document.getElementById("tasksModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
