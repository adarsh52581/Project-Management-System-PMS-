const mongoose = require("mongoose")

const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
  
const url = "mongodb+srv://Atul:12345abc@cluster0.ofsz1c6.mongodb.net/?retryWrites=true&w=majority"
  
mongoose.connect(url).then((ans) => {
  console.log("Connected successfully")
}).catch((err) => {
  console.log("Error in the Connection")
})
  
const Schema = mongoose.Schema;
  
const collection_structure = new Schema({
  taskname: {
    type: String,
    require: true
  }
  ,
  complete: {
    type: Boolean,
    default: false
  },
  taskid: {
    type: Number,
    require: true
  }
})

const collections = mongoose.model("tasks", collection_structure)

//list all tasks
app.get('/task', async (req, res) => {
    collections.find().then((ans) => {
        res.json(ans)
    })
})

//create new task
app.post('/new', async (req, res) => {
    const tn = req.body.taskname
    const tid = req.body.taskid
    collections.create({
        taskname: tn,
        taskid: tid
    }).then((ans) => {
        res.json(ans)
    })
})

//complete a task
app.post('/complete/:taskid', async (req, res) => {
    const tid = req.params.taskid
    collections.updateOne({taskid:tid}, {$set: {complete: true}}).then((ans) => res.json(ans))
})

//list all incomplete tasks
app.get('/incomplete', async(req, res) => {
    collections.find({complete: false}).then((ans) => res.json(ans))
})

//list all completed tasks
app.get('/completed', async(req, res) => {
    collections.find({complete: true}).then((ans) => res.json(ans))
})

//get progress of project
app.get('/progress', async (req, res) => {
    const tnum = await collections.count().catch(console.error)
    const cnum = await collections.count({complete: true}).catch(console.error)
    const per = (cnum/tnum)*100
    res.json(per)
})

app.listen(3000, () => console.log("Server started..."));