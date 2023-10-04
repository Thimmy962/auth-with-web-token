import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/'
import AuthContext from '../utils/AuthContext'

const NoteDetail = ({match, history}) => {
    const id = match.params.id
    const {tokens} = useContext(AuthContext)
    const [note, setNote] = useState()


    useEffect(()=>{
        getNote()
      }, [id])
    
    const getNote = async()=>{
        let res = await fetch(`http://localhost:8000/getnote/${id}`,{
            method: "GET",
            headers:{"Content-Type": "application/json", "Authorization":"Bearer " + String(tokens.access)}
        })
        let data = await res.json()
        setNote(data)
    }


    let updateNote = async () =>{
          let res = await fetch(`http://localhost:8000/getnote/${id}`,{
            method: "PUT",
            headers:{"Content-Type": "application/json", "Authorization":"Bearer " + String(tokens.access)},
            body:JSON.stringify(note)
        })
        if(res.status === 202)
        {
          history.push('/')
        }
    }

    const handleSubmit=()=>{
      console.log(note.body.length)
      if(note.body.length === 0){
          deleteNote()
      }
      else{updateNote();}
    }

    let deleteNote = async () =>{
      let res = await fetch(`http://localhost:8000/getnote/${id}`,{
            method: "DELETE",
            headers:{"Content-Type": "application/json", "Authorization":"Bearer " + String(tokens.access)},
            body:JSON.stringify(note)
        })
        if(res.status === 204)
        {
          history.push('/')
        }
    }
  return(
    <div id='detail'>
    <div id="navigator">
      <h3 id='back-arrow' onClick={handleSubmit}>&larr;</h3>
      <button onClick={deleteNote}>Delete</button>
    </div>
    <textarea autoFocus  onChange={(e) => setNote({...note, 'body':e.target.value})} defaultValue={note?.body}></textarea>
</div>
  )
}

export default NoteDetail