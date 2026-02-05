import { useState , useEffect } from 'react'
import React from 'react'
import axios from "axios"

const App = () => {
  const [notes, setNotes]=useState([])

function fetchNotes(){
  axios.get("https://backend-class-2-eiaq.onrender.com/api/notes")
.then((res)=>{
  
  setNotes(res.data.notes)
})
}

useEffect(()=>{
  fetchNotes()
},[])

  function submitHandler(e){
  e.preventDefault();
  const {title, description}= e.target.elements
  console.log(title.value, description.value)
  axios.post("https://backend-class-2-eiaq.onrender.com/api/notes", {
    title: title.value,
    description: description.value
  })
  .then((res)=>{
fetchNotes()
  })
  }

  function deleteHandler(noteId){

axios.delete("https://backend-class-2-eiaq.onrender.com/api/notes/"+noteId)
.then(()=>{
  fetchNotes()
})
}
  return (
    <div>
      <form onSubmit={(e)=>{submitHandler(e)}}>
        <input name='title' type="text" placeholder="Enter title"/>
        <input name="description" type="text" placeholder="Enter description" />
        <button>Create Note</button>
      </form>
      <div className="notes">
        {notes.map((note)=>{
          return <div className="note">
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={()=>deleteHandler(note._id)}>Delete</button>
          </div>
        })}
      </div>
    </div>
  )
}

export default App
