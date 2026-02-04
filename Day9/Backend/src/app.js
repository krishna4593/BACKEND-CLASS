// server create aur config 

const express = require("express")
const cors = require("cors")
const app = express()
const path = require("path")
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))

const noteModel = require("./modules/note.model")

app.post("/api/notes",async (req,res)=>{
    const {title, description}= req.body
  const note = await noteModel.create({
        title, description
    })
    res.status(201).json({
        message:"notes created sucessfully",
        note
    })
})

app.get("/api/notes",async (req,res)=>{
    
  const note = await noteModel.find()
    res.status(200).json({
        message:"notes fetched sucessfully",
        note
    })
})

app.delete("/api/notes/:id",async (req,res)=>{
    const id = req.params.id
   await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"notes deleted sucessfully",
        
    })
})

app.patch("/api/notes/:id",async (req,res)=>{
    const id = req.params.id
    const {description}=req.body
   await noteModel.findByIdAndUpdate(id, {description})
    res.status(200).json({
        message:"notes updated sucessfully",
        
    })
})

app.use("*name", (req,res)=>{
    res.sendFile(path.join(__dirname,"..","public/index.html"))
})


module.exports= app