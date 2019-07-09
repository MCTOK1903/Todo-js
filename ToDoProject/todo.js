
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const cardBody1 = document.querySelectorAll(".card-body")[0];
const cardBody2 = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListener();

function eventListener(){ 
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosUI);
    cardBody2.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",deleteAllTodos);
}

function deleteAllTodos(){
   if(confirm("Tümünü silmek istediğinizden emin misiniz?")){
        while(todoList.firstElementChildChild != null){
            todoInput.remove(todoList.firstElementChildChild);
        }
   }
   localStorage.removeItem("todos");
   location.reload(true);
}


function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLocaleLowerCase();
        if(text.indexOf(filterValue)===-1){
            //Bulamadı
            listItem.setAttribute("style","display : none !important");
        }else{
            listItem.setAttribute("style","display : block !important");
        }
    });

}


function deleteTodo(e){
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorege(e.target.parentElement.parentElement.textContent);
        showAlert("danger","Todo Silindi",cardBody2);
    }

}


function deleteTodoFromStorege(deleteTodo){

    let todos = getTodoStorege();
    todos.forEach(function(todo,index){
        if(todo===deleteTodo){
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}



function loadAllTodosUI(){

    let todos = getTodoStorege();

    todos.forEach(function(todo){
        addTodoUI(todo);
    })

}


function addTodo(e){
    const newTodo = todoInput.value.trim();

    if(newTodo ===""){
        showAlert("danger","Lütfen Todo Giriniz",cardBody1);
    }else{
        addTodoUI(newTodo);
        addTodoStoroge(newTodo);
        showAlert("success","Başarıyla Eklendi",cardBody1);
    }
    e.preventDefault();
}



function addTodoStoroge(newTodo){
    
    let todos = getTodoStorege();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));

}

function getTodoStorege(){

    let todos;

    if(localStorage.getItem("todos")==null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

function showAlert(type,message,cardBody){ 

    const dangerAlert = document.createElement("div");
    dangerAlert.className=`salert alert-${type}`;
    dangerAlert.textContent=message;
    addAlertUI(dangerAlert,cardBody);
}

function addAlertUI(alert,cardBody){
    cardBody.appendChild(alert);
    setTimeout(function(){
        alert.remove();    
    },1500)

}

function addTodoUI(newTodo){

    const listItem = document.createElement("li");
    const link = document.createElement("a");

    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class = 'fa fa-remove'></i>"
    
    listItem.className="list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    cardBody2.appendChild(listItem);

    todoInput.value="";
}
