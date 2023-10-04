import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const Notes = ({notes}) => {
  return (
    <div id='note'>
        {notes.map(note=>(
            <Link to={`/detail/${note.id}`} key={note.id}>
              {/* 
                if the body`s length is > 20 display the first 20 
                char with 3 dots representing the remaining char else display all char 
              */}
              <div className='note'>{note.body.length > 20 ? note.body.slice(0,20)+ '...' : note.body}</div>    
            </Link>
        ))}
    </div>
  )
}

export default Notes