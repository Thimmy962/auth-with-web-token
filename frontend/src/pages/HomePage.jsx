import AddIcon from '../components/AddIcon'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../utils/AuthContext'
import Notes from '../components/Notes'

const HomePage = () => {
  const [notes, setNotes] = useState()
  let {tokens, logout} = useContext(AuthContext)
  let [loading, setLoading] = useState(true)
  let [available, setAvailable] = useState(false)

  useEffect(()=>{
    getNotes()
  }, [])

  const getNotes=async()=>{
    let res = await fetch('http://localhost:8000/notes/',{
      method:'GET',
      headers:{"Content-Type":"application/json",
                "Authorization":"Bearer " + String(tokens.access)
    }
    })
    let data  = await res.json()
    if(res.status === 200){
      // if the return data is empty i.e user has no note
      if(data == ''){
        setAvailable(false)
        setNotes(null)
        // finished loading no notes found
        setLoading(false)
      }
      else
       {
        // if note is not empty, loading is false, available is true, then set the data
        setLoading(false)
        setAvailable(true)
        setNotes(data)
      }
    }
    else if(res.statusText === 'Unauthorized'){
      logout()
    }
    else{alert("Something went wrong")}

  }
  return (
    <div id='homepage'>
      {loading && <h5>Loading...</h5>}
      {/* if available is true*/}
      {available ? <Notes notes={notes} /> :(
        <h4 id='notavailable'>You have no notes yet</h4>
      )}
      <AddIcon />
    </div>
  )
}

export default HomePage