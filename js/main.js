// Set main variables

let theContainer = document.querySelector(".to-do-list-container");
(theInput = document.querySelector(".add-tasks input")),
  (plusButton = document.querySelector(".add-tasks .plus")),
  (tasksContent = document.querySelector(".tasks-content")),
  (tasksCounter = document.querySelector(".tasks-counter span")),
  (tasksCompleted = document.querySelector(".tasks-completed span"));

// Focus on input felid
window.onload = function () {
  theInput.focus();
};
// DOM load event
document.addEventListener("DOMContentLoaded", getTasks);

function getTasks() {
  let tasks;
  // Check the LS
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // Remove no tasks msg
  document.querySelector(".no-tasks-msg").style.display = "none";

  // loop tasks
  tasks.forEach((task) => {
    // create main div
    let mainDiv = document.createElement("div");
    // create text span
    let mainSpan = document.createElement("span");
    //create delete button
    let deleteSpan = document.createElement("span");

    // create text to the main span
    let text = document.createTextNode(task);

    // create text to the delete span
    let deleteText = document.createTextNode("Delete");

    // Add text to the main span
    mainSpan.appendChild(text);

    // Add class to the main span
    mainDiv.className = "task-box";

    // Add text to the delete span
    deleteSpan.appendChild(deleteText);

    // Add class to the delete span
    deleteSpan.className = "delete";

    // Add the text span to the main div
    mainDiv.appendChild(mainSpan);
    // Add the delete span to the main span
    mainDiv.appendChild(deleteSpan);

    // Add the main span to the tasks content div
    tasksContent.appendChild(mainDiv);

    // Calculate function
    calculateTasks();
  });
}

// Click Button to Add Tasks
plusButton.onclick = function () {
  // Checking the input value
  if (theInput.value === "") {
    // Sweet Alert
    swal({
      title: "Oops",
      text: "You have to add task",
      buttons: {
        cancel: true,
        confirm: "Okay",
      },
    }).then((val) => {
      if (val) {
        swal({
          title: "Thanks",
          icon: "success",
          buttons: {
            confirm: "YES!!!",
          },
        });
      }
    });
  } else {
    let noTasks = document.querySelector(".no-tasks-msg");

    if (document.body.contains(document.querySelector(".no-tasks-msg"))) {
      // Remove no tasks msg
      noTasks.remove();
    }

    // create main div
    let mainDiv = document.createElement("div");
    // create text span
    let mainSpan = document.createElement("span");
    //create delete button
    let deleteSpan = document.createElement("span");

    // create text to the main span
    let text = document.createTextNode(theInput.value);

    // create text to the delete span
    let deleteText = document.createTextNode("Delete");

    // Add text to the main span
    mainSpan.appendChild(text);

    // Add class to the main span
    mainDiv.className = "task-box";

    // Add text to the delete span
    deleteSpan.appendChild(deleteText);

    // Add class to the delete span
    deleteSpan.className = "delete";

    // Add the text span to the main div
    mainDiv.appendChild(mainSpan);
    // Add the delete span to the main span
    mainDiv.appendChild(deleteSpan);

    // Add the main span to the tasks content div
    tasksContent.appendChild(mainDiv);

    // Store tasks in LS
    storeTaskInLocalStorage(theInput.value);
    console.log(theInput.value);

    // Empty the input value
    theInput.value = "";

    // Focus again
    theInput.focus();

    // Calculate function
    calculateTasks();
  }
};

document.addEventListener("click", function (e) {
  if (e.target.className === "delete") {
    // Remove the current  task
    e.target.parentNode.remove();
    console.log(e.target.parentElement);
    console.log(e.target.parentNode.firstChild);

    // Check the count of tasks
    if (tasksContent.childElementCount == 0) {
      createNoTasks();
    }
  }

  // Ad finished class
  if (e.target.classList.contains("task-box")) {
    // toggle class 'finished'
    e.target.classList.toggle("finished");
  }
  removeTaskFromLocalStorage(e.target.parentNode);

  calculateTasks();
});

// create no tasks function
function createNoTasks() {
  // create no tasks element
  let spanMsg = document.createElement("span"),
    // create text for no msg span
    spanMsgText = document.createTextNode("No tasks to show");

  // Add class to no tasks span
  spanMsg.className = "no-tasks-msg";

  //Append span text to the msg span
  spanMsg.appendChild(spanMsgText);

  // append span msg to tasks content element
  tasksContent.appendChild(spanMsg);
}

// create div contains Buttons Delete all & Finish all
let buttonsDiv = document.createElement("div"),
  // create Delete Button to delete all tasks
  deleteBtn = document.createElement("button"),
  // create Delete Button to delete all tasks
  finishBtn = document.createElement("button"),
  // Add text to deleteAll button
  deleteBtnText = document.createTextNode("Delete All"),
  // Add text to finishAll button
  finishBtnText = document.createTextNode("Finish All");

// Add class to buttons div
buttonsDiv.className = "buttons-div";

// Append deleteAllText to deleteAll button
deleteBtn.appendChild(deleteBtnText);

// Add class to deleteAll button
deleteBtn.className = "delete-all";

// Append deleteAllText to deleteAll button
finishBtn.appendChild(finishBtnText);

// Add class to deleteAll button
finishBtn.className = "finish-all";

// Append  buttons div to the container
theContainer.appendChild(buttonsDiv);

// append delete & finish buttons to their div
buttonsDiv.appendChild(deleteBtn);
buttonsDiv.appendChild(finishBtn);

// Clear LS
function clearLocalStorage() {
  localStorage.clear();
}
// Clear all tasks list
deleteBtn.onclick = function () {
  document.querySelectorAll(".task-box").forEach((task) => {
    task.remove();
    clearLocalStorage();
  });
  createNoTasks();
};

// Add class 'finished' to all tasks list
finishBtn.onclick = function () {
  document.querySelectorAll(".task-box").forEach((task) => {
    task.classList.add("finished");
  });
};

// Create calculate tasks function
function calculateTasks() {
  // Calculate all tasks
  tasksCounter.innerHTML = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;

  // Calculate complete tasks
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  // Check the LS
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  console.log(tasks);
  tasks.forEach((task, index) => {
    if (taskItem.firstChild.innerHTML === task) {
      tasks.splice(index, 1);
      // tasks.push(task);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
