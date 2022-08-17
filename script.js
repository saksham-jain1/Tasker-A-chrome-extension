let taskArr = JSON.parse(localStorage.getItem("Tasker")) || [];

const addTask = document.getElementById("addTask");
const task = document.getElementById("task");
const list = document.getElementById("list");
const progress = document.getElementById("progress");
const progressTxt = document.getElementById("progressTxt");

setTimeout(() => {
  display();
}, Math.trunc(Math.random() * 500));

const display = () => {
  let completedTask = 0;
  let child = list.lastChild;
  while (child) {
    list.removeChild(child);
    child = list.lastChild;
  }
  if (taskArr.length) {
    taskArr.map((curr, id) => {
      const newTask = document.createElement("li");
      newTask.setAttribute("id", id + "task");

      if (curr.completed) {
        completedTask++;
        newTask.setAttribute("class", "done");
      } else {
        newTask.setAttribute("class", "pending");
      }

      const span = document.createElement("span");
      span.innerHTML = curr.task;
      span.setAttribute("id", id + "task");
      newTask.setAttribute("id", id);
      newTask.innerHTML = id + 1 + ".&nbsp;";
      newTask.addEventListener("dblclick", (event) =>
        changeStatus(event.target.id)
      );

      newTask.appendChild(span);

      const edit = document.createElement("button");
      edit.innerHTML = `<img src="edit.jpg" height="20px" width="20px" id="${id}edit1" />`;
      edit.setAttribute("id", id + "edit");
      edit.setAttribute("class", "edit");
      edit.addEventListener("click", (event) => editTask(event.target.id));

      const taskDelete = document.createElement("button");
      taskDelete.innerHTML = "x";
      taskDelete.setAttribute("id", id + "delete");
      taskDelete.setAttribute("class", "delete");
      taskDelete.addEventListener("click", (event) =>
        deleteTask(event.target.id)
      );

      newTask.appendChild(edit);
      newTask.appendChild(taskDelete);

      list.appendChild(newTask);

      progress.setAttribute("value", completedTask);
      progress.setAttribute("max", taskArr.length);
      progressTxt.innerText = `${completedTask}/${taskArr.length}`;
    });
  } else {
    list.innerHTML = "<p><center><i>No Tasks</i></center></p>";
  }
};

document
  .getElementById("addTask")
  .addEventListener("click", (event) => addNewTask(event.target.id));

const editTask = (id) => {
  const taskIndex = parseInt(id[0]);
  if (document.getElementById(taskIndex + "edit1").getAttribute('src')=='edit.jpg') {
    const editableTask = document.getElementById(taskIndex + "task");
    editableTask.contentEditable = true;
    editableTask.focus();
    document.getElementById(taskIndex + "edit1").src = "logo.png";
  } else {
    const editableTask = document.getElementById(taskIndex + "task");
    taskArr[taskIndex].task=editableTask.innerHTML;
    editableTask.contentEditable = false;
    document.getElementById(taskIndex + "edit1").src = "edit.jpg";
    display();
  }
};

const deleteTask = (id) => {
  const taskIndex = parseInt(id[0]);
  taskArr.splice(taskIndex, 1);
  localStorage.setItem("Tasker", JSON.stringify(taskArr));
  display();
};

const addNewTask = (id) => {
  if (task.value === null || task.value.trim() === "") return;
  taskArr.push({ task: task.value, completed: false });
  localStorage.setItem("savedTasks", JSON.stringify(taskArr));
  display();
  task.value = "";
};

const changeStatus = (id) => {
  const taskIndex = parseInt(id[0]);
  taskArr[taskIndex].completed = !taskArr[taskIndex].completed;
  localStorage.setItem("Tasker", JSON.stringify(taskArr));
  display();
};

// const editTask = (id) => {
//   const taskIndex = parseInt(id[0]);
//   const taskText = taskArr[taskIndex].task;
//   taskArr.splice(taskIndex, 1);
//   localStorage.setItem("savedTasks", JSON.stringify(taskArr));
//   updateView();
//   const taskInput = document.getElementById("task-input");
//   taskInput.value = taskText;
// };
