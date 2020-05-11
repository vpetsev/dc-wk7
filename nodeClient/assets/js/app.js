const currentTasks = document.getElementById("current-tasks")
const txtBoxTitle = document.getElementById("txtBoxTitle")
const txtBoxPriority = document.getElementById("txtBoxPriority")
const detailedInfo = document.getElementById("detailedInfo")
const txtBoxDate = document.getElementById("txtBoxDate")
const submitBtn = document.getElementById("submitBtn")

// add new todo task
submitBtn.addEventListener("click", ()=>{
    fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            'title': txtBoxTitle.value,
            'details': detailedInfo.value,
            'date': txtBoxDate.value,
            'priority': txtBoxPriority.value,
        }),
    })
    .then((response) => response.json())
    .then((res) => {
        console.log(res)
        res.map(obj => {
            const taskText = `
            <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${obj.title}</h5>
                    <small class="text-muted">${obj.dateAdded}</small>
                </div>
                <p class="mb-1">${obj.details}</p> <small class="text-muted">Task priority: ${obj.priority}</small>
            </a>`
            currentTasks.insertAdjacentHTML("afterbegin", taskText)
        })
    })
})

// print old tasks to screen
function oldTasks(){
    fetch('http://localhost:3000/todos')
        .then(response => response.json())
        .then(json => {
            json.forEach(obj => {
                const taskText = `
            <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${obj.title}</h5>
                    <small class="text-muted">${obj.dateAdded}</small>
                </div>
                <p class="mb-1">${obj.details}</p> <small class="text-muted">Task priority: ${obj.priority}</small>
            </a>`
                currentTasks.insertAdjacentHTML("afterbegin", taskText)
            })
        })
}
oldTasks()


