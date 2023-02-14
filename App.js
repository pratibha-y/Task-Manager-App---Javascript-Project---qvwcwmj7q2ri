const addTask = document.querySelectorAll(".add-task");
const all_status = document.querySelectorAll(".open-box");
let dragMe = null;
let data = []
addTask.forEach((ele) => {
  ele.addEventListener("dragstart", dragStart);
  ele.addEventListener("dragend", dragEnd);
});
function dragStart() {
    dragMe = this;
  setTimeout(() => {
    this.style.display = "none";
  },0);
}
function dragEnd() {
    dragMe = null;
  setTimeout(() => {
    this.style.display = "block";
  }, 0);
}
all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
}

function dragEnter() {
  this.style.border = "2px solid #fff";
}

function dragLeave() {
  this.style.border = "none";
}

function dragDrop() {
  this.style.border = "none";
  this.appendChild(dragMe);
}
/* -----------Add new Task--------------------*/
document.querySelector('#add-task').addEventListener("click", createTask);  
function createTask(){
  let title = document.getElementById("inpuText").value.trim();
  if(title === "")  return;
  /* -----New Div----- */
  let div=document.createElement("div");
  let uniqueId = randomId()
  div.dataset.id= uniqueId;
  div.classList.add("add-task");
  div.setAttribute("draggable","true");
  div.setAttribute("id", "drag-item-list");
  div.addEventListener('click', (e) => {
    showWithDetails(e.target)
  });
  /*------New Hr Line------ */
  let hr=document.createElement("hr");
  hr.setAttribute("id","hr-line");
  div.appendChild(hr);
  /*----------New P Tag------------- */
  let p=document.createElement("p");
  p.setAttribute("id","drag-item");
  p.textContent = title;
  div.appendChild(p);
  
  /*----------Add Circle Icon-------------- */
  let icon = document.createElement("i");
  icon.classList.add('fa-circle');
  icon.classList.add('fa-regular');
  div.appendChild(icon);
  icon.id = `icon-${uniqueId}`
  let icon1=document.createElement("i");
  icon1.classList.add('fa-solid');
  icon1.classList.add('fa-check');
  div.appendChild(icon1);
  const contianer = document.querySelector('#no_status');
  contianer.appendChild(div);
  div.addEventListener("dragstart", dragStart);
  div.addEventListener("dragend", dragEnd); 
  div.addEventListener("onclick",displayfun);
  let form = document.getElementById("form");
  form.dataset.taskId = uniqueId;
  window["task-name"].value =title;
  window["task-title"].value ="";
  window["task-date"].value ="";
  window["task-description"].value ="";
  window["task-priority"].value ="";
  show();
  enable()
 }
/*------------------Form------------------------ */
function show(){
  let form = document.getElementById("form");
  form.classList.remove('hide-form')
}
function showWithDetails(element){
  const id = element.dataset.id;
  const task = data.find(item => item.id === id);
  console.log(task);
  console.log(window["task-name"])
  window["form"].dataset.taskId = id;
  window["task-name"].value = task.name;
  window["task-title"].value = task.title;
  window["task-date"].value = task.date;
  window["task-description"].value = task.description;
  window["task-priority"].value = task.taskPriority;
  show();
  displayfun();
}
window["save-task-data"].addEventListener('click', (e) => {
  e.preventDefault();
  let id = e.target.parentNode.parentNode.parentNode.dataset.taskId;
  let name = window["inpuText"].value.trim();
  let title = window["task-title"].value.trim();
  let date = window["task-date"].value.trim();
  let description = window["task-description"].value.trim();
  let taskPriority = window["task-priority"].value.trim();
  const dataExists = data.find(item => item.id === id); 
  if(dataExists){
    const newData = data.filter(item => item.id !== id);
    data = [{
      id,
      name,
      title,
      date,
      description,
      taskPriority
    },...newData]; 
  }else{
    data.push(
      {
        id,
        name,
        title,
        date,
        description,
        taskPriority
      }
    )
  }
  let form = document.getElementById("form");
  form.classList.add('hide-form');
})
/*-------------------Input Box Disabled------------------------ */
 let temp=document.querySelectorAll(".input-disable");
function displayfun(){
   temp.forEach((e)=>{
     e.disabled = true;
   })
   }
 function enable(){
   temp.forEach((e)=>{
     e.disabled = false;
   }) 
 }
function randomId(){
  let id = "";
  for(let i=0;i<9;i++){
    id += Math.floor(Math.random() * 9);
  }
  return id;
}

