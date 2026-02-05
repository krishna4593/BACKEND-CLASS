const express = require("express")
const cors = require("cors")
const path = require("path")
const noteModel= require("./modules/note.model")
const app= express()
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))

app.post("/api/notes",async (req, res)=>{
    const {title, description}= req.body

   const notes = await noteModel.create({
        title,description
    })
    res.status(201).json({
        message:"notes created sucessfully", 
        notes
    })
})

app.get("/api/notes",async (req, res)=>{
    

   const notes = await noteModel.find()
    res.status(200).json({
        message:"notes fetched sucessfully", 
        notes
    })
})

app.delete("/api/notes/:id",async (req, res)=>{
    
   const id = req.params.id
   await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"notes deleted sucessfully", 

    })
})

app.delete("/api/notes/:id",async (req, res)=>{
    
   const id = req.params.id
   const {description}= req.body
   await noteModel.findByIdAndUpdate(id, {description})
    res.status(200).json({
        message:"notes updated sucessfully", 
      
    })
})

app.use("*name", (req,res)=>{
    res.sendFile(path.join(__dirname,"..","public/index.html"))
})


module.exports = app