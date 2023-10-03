import React, {useContext, useState} from 'react'
import AuthContext from '../utils/AuthContext'

const AddNote = ({history}) => {
    const [note, setNote] = useState('Add new Note')
    const {tokens} = useContext(AuthContext)

    let createNote = async (e) =>
    {
      e.preventDefault()
        let res = await fetch(`http://localhost:8000/notes/`, {
        method: 'POST',
        headers: {"Content-Type":"application/json",
                "Authorization":"Bearer " + String(tokens.access)
                },
        body:JSON.stringify({"body": note})
      })
      let data = res.json()
      if(res.status === 201)
      {
        console.log("successful")
      }
      history.push('/notes')
    }


  return (
    <div id='addNotes'>
        <div id="navigator">
          <h3 id='back-arrow'>&larr;</h3>
          <button onClick={createNote}>Done</button>
        </div>
        <textarea autoFocus onChange={(e) => setNote({...note, 'body':e.target.value})} defaultValue={note?.body}></textarea>
    </div>
  )
}

export default AddNote