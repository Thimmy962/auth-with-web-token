import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const Notes = ({notes}) => {
  return (
    <div id='note'>
        {notes.map(note=>(
            <Link to={`/detail/${note.id}`} key={note.id}>
              <div className='note'>{note.body.slice(0,)+ '...'}</div>    
            </Link>
        ))}
    </div>
  )
}

export default Notes