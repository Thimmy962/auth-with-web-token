import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/'
import AuthContext from '../utils/AuthContext'

const NoteDetail = ({match}) => {
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
        console.log(res)
    }
  return (
    <div id='detail'>
    <div id="navigator">
      <h3 id='back-arrow'>&larr;</h3>
      <button>Done</button>
    </div>
    <textarea autoFocus onChange={(e) => setNote({...note, 'body':e.target.value})} defaultValue={note?.body}></textarea>
</div>
  )
}

export default NoteDetail