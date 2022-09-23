let todoTitle = document.getElementById("todoTitle")
let todoDescription = document.getElementById("todoDescription");


export function addTaskToApi(url) {
    // e.preventDefault();

    if (todoDescription !== '' && todoTitle !== '') {
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
            task = [...task, data]
            todoTitle.value = ""
            todoDescription.value = ""
            printTask(task)
        })
    } else {
        alert("All fields Mandatory")
    }
}