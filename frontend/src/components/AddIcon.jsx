import React from 'react'
import {Link} from 'react-router-dom'

const AddIcon = () => {
  return (
    <div>
        <h3><Link to='/new' className='floating-button'>Add Note</Link></h3>
    </div>
  )
}

export default AddIcon