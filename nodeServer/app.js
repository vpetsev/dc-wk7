// In this project you are responsible for creating the Web API for TODO app using Node.
// Your API will expose the following endpoints:
// - Get all TODO items(/todos) 
//     - Save a new TODO item(/todos)  
// Each TODO item consists of the title, priority, date created
// You are also responsible for creating the User Interface for your app which will consume the API.

// HARD MODE:
// - Ability to delete an existing TODO item - /todos DELETE 
//     - Ability to update an existing TOD item
//         * Creating a class for TODO list item is not mandatory but it is a good practice. 

const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

let allTodos = []

app.post('/todos', (req, res)=>{
    console.log(req.body)

    let taskTitle = req.body.title
    let taskPriority = req.body.priority
    let taskDetails = req.body.details
    let taskDate = req.body.date

    allTodos.push({title: taskTitle, priority: taskPriority, details: taskDetails, dateAdded: taskDate})

    res.json(allTodos)
})


app.get('/todos', (req, res) =>{
    res.json(allTodos)
})

console.log(allTodos)

if (require.main === module) {
    app.listen(process.env.PORT || 3000, () => console.log("TODO server started"))
}
module.exports = app
