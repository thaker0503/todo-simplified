// import { addTaskToApi } from "./addTask.js";
// import { printTask } from "./printTask.js"
const url = "https://internapp.vercel.app/yatharth/todos/";
// const url = "http://localhost:3001/api/";
const showTodo = document.getElementById('showTodo');
const showTodoCompleted = document.getElementById('showTodoCompleted');
// const addTaskBtn = document.getElementById('addTask');
let todoTitle = document.getElementById("todoTitle")
let todoDescription = document.getElementById("todoDescription");

let task = [];

fetch(url).then(res => res.json()).then(data => {
    task = data;
    isTaskEmpty()
})

function isTaskEmpty() {
    if (task != "") {
        printTask(task)
    } else {
        showTodo.innerHTML = "No Tasks"
        showTodoCompleted.innerHTML = "No Tasks"
    }
}

// addTaskBtn.addEventListener("click", function (e) {
//     addTaskToApi(url,e)
// })

function addTaskToApi(e) {
    e.preventDefault();


    if (todoTitle.value === "" || todoDescription.value === "" ) {
        alert("All fields Mandatory")
    } else {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: todoTitle.value,
                description: todoDescription.value,
                completed: false
            })
        }).then(res => res.json()).then(data => {
            task = [...task,data]
            // task = data
            // console.log(task)
            todoTitle.value = ""
            todoDescription.value = ""
            todoTitle.focus();
            printTask(task)
        })
    }
}


function checkFalse(id) {
    // console.log("Checking False")
    let index = task.findIndex(item => item.id === id)

    fetch(url+id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: task[index].title,
            description: task[index].description,
            completed: false
        })
    }).then(res => res.json()).then(data => {
        let index = task.findIndex(item => item.id === data.id)
        task.splice(index,1)
        task = [...task, data]
        // console.log(task)
        printTask(task)
    })
}

function checkTrue(id) {
    // console.log("Checking true")
    let index = task.findIndex(item => item.id == id)
    // console.log(index)
    fetch(url+id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: task[index].title,
            description: task[index].description,
            completed: true
        })
    }).then(res => res.json()).then(data => {
        let index = task.findIndex(item => item.id === data.id)
        task.splice(index, 1)
        task = [...task, data]
        // console.log(task)
        printTask(task)
    })
}

function delTask(id) {
    let index = task.findIndex(item => item.id == id)
    fetch(url + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json()).then(data => {
            // let index = task.findIndex(item => item.id === data.id)
            // console.log(index)
            // console.log(data)
            task.splice(index, 1)
            // task = data
            // console.log(task)
            printTask(task)
            isTaskEmpty()
        })
}

function printTask(task) {
    // console.log("Printing Task")
    // console.log(task)

    showTodo.innerHTML = ""
    showTodoCompleted.innerHTML = ""
    // addAnimation();  
    task.forEach(data => {
        var title = changeHTML(data.title);
        var description = changeHTML(data.description);
        // console.log(typeof(title))
        // console.log(data.title)
        // console.log(data.description)
        let listElement = `<li class="list" data-tooltip="Mark as completed"  >
                        <input type='checkbox' id="${data.id}" data-completed="${data.completed}"/>
                        <div>
                            <h3> ${title}</h3>
                            <p> ${description} </p>
                        </div>
                        </li>`
        let listElement2 = `<li class="list" data-tooltip="Mark as not completed" >
                        <input type='checkbox'  id="${data.id}" data-completed="${data.completed}"  checked/>
                        <div>
                            <h3> ${title} </h3>
                            <p> ${description} </p>
                        </div>
                        </li>`
        if (!data.completed) {
            showTodo.innerHTML += listElement;
        } else {
            showTodoCompleted.innerHTML += listElement2;
        }
    });
    const list = document.querySelectorAll(".list");
    // const checkbox = document.querySelectorAll("input[type='checkbox']");
    // for (let i = 0; i < checkbox.length; i++) {
    //     checkbox[i].addEventListener("click", function () {
    // this
    //     }) 
    // }
    for (let i = 0; i < list.length; i++) {
        list[i].addEventListener("click", function () {
            this.children[0].getAttribute('data-completed') === 'true'
                ? checkFalse(this.children[0].id)
                : checkTrue(this.children[0].id)
        })
        list[i].addEventListener("contextmenu", function (e) {
            e.preventDefault();
            delTask(this.children[0].id)
        })
    }
}

function changeHTML(html) {
    return html
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function addAnimation() {
    var index = task.findIndex(item => item.id == task[task.length - 1].id)
    console.log(document.getElementById(`'${task[index].id}'`))
    // imp.classList.add("animation")
    // console.log(imp)
}


// function printNewTask(data) {

//     // let listElement = "<li><h3>"+task.title+"</h3><p>"+task.description+"</p></li>"
//     // showTodo.innerHTML += listElement  
//     let listElement = `<li><input type='checkbox' id=${data.id}  data-completed="${data.completed}"/><span> ${data.title}</span><p> ${data.description} </p></li>`
//     let listElement2 = `<li><input type='checkbox' id=${data.id}  data-completed="${data.completed}"  checked/><span> ${data.title} </span><p> ${data.description} </p></li>`
//     if (!data.completed) {
//         showTodo.innerHTML += listElement
//     } else {
//         showTodoCompleted.innerHTML += listElement2
//     }
// }

// function printTask() {
//     showTodo.innerHTML = ""
//     task.forEach(item => {
//         let listElement = "<li><h3>" + item.title + "</h3><p>" + item.description + "</p></li>"
//         showTodo.innerHTML += listElement

//     })
// }
