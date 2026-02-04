import React, { useEffect, useState } from 'react'
import axios from "axios"

const App = () => {
  const [notes, setNotes]= useState([])

function fetchNotes(){
  axios.get("http://localhost:3000/api/notes")
.then((res)=>{
  
  setNotes(res.data.note)
})
}

useEffect(()=>{
  fetchNotes()
},[])

function submitHandler(e){
e.preventDefault()
const {title , description} = e.target.elements
console.log(title , description)
axios.post("http://localhost:3000/api/notes", {
  title:title.value,
  description:description.value
})
.then((res)=>{
  console.log(res.data)

  fetchNotes()
})

}

function deleteHandler(noteId){

axios.delete("http://localhost:3000/api/notes/"+noteId)
.then(()=>{
  fetchNotes()
})
}

  return (
    <div>
     <div className='form'>
      <form onSubmit={submitHandler}>
      <input className='input' name='title' type="text" placeholder='Enter Title' />
      <input className='input' name='description' type="text" placeholder='Enter Description' />
      <button className='btn' >Submit</button>

     </form>
     </div>

      <div className="notes">
        {
          notes.map((note)=>{
            return <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button className="btn" onClick={()=>{deleteHandler(note._id)}}>Delete</button>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default App
