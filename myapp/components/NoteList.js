import React from 'react'
import Note from './Note'

const NoteList = ({notes}) => {
  return (
    <ul className='flex flex-wrap gap-4 mt-8 justify-center'>
    {
        notes.map(note => (
            <Note key={note.id} note={note} />
        ))
    }
</ul>
  )
}

export default NoteList