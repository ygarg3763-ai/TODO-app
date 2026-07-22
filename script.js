const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

renderTodo();

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keypress", function(e){
    if(e.key==="Enter"){
        addTodo();
    }

});

function addTodo(){
    const task = todoInput.value.trim();
    if(task===""){
        alert("Please enter a task");
        return;
    }
    const todo = {

        text:task,
        completed:false

    };

    todos.push(todo);
    saveTodos();
    renderTodo();
    todoInput.value="";
}

function renderTodo(){
    todoList.innerHTML="";
    todos.forEach((todo,index)=>{
        createTodoItem(todo,index);
    });

}

function createTodoItem(todo,index){
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type="checkbox";
    checkbox.checked=todo.completed;
    checkbox.addEventListener("change",function(){
        todo.completed=checkbox.checked;
        saveTodos();
        renderTodo();
    });

    const span = document.createElement("span");
    span.className="task";
    span.innerText=todo.text;
    if(todo.completed){
        span.classList.add("completed");
    }

    const btnDiv = document.createElement("div");
    btnDiv.className="buttons";
    const editBtn=document.createElement("button");
    editBtn.innerText="Edit";
    editBtn.className="edit";
    editBtn.addEventListener("click",function(){
        editTodo(index);
    });
    const deleteBtn=document.createElement("button");
    deleteBtn.innerText="Delete";
    deleteBtn.className="delete";
    deleteBtn.addEventListener("click",function(){
        deleteTodo(index);
    });
    btnDiv.append(editBtn);
    btnDiv.append(deleteBtn);
    li.append(checkbox);
    li.append(span);
    li.append(btnDiv);
    todoList.append(li);
}

function deleteTodo(index){
    todos.splice(index,1);
    saveTodos();
    renderTodo();
}
function editTodo(index){
    const updatedTask=prompt("Edit Task",todos[index].text);
    if(updatedTask===null){
        return;
    }
    if(updatedTask.trim()===""){
        alert("Task cannot be empty");
        return;
    }
    todos[index].text=updatedTask.trim();
    saveTodos();
    renderTodo();

}

function saveTodos(){

    localStorage.setItem("todos",JSON.stringify(todos));

}
