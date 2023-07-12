"use client";

import React, { useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";


const Note = ({note}) => {
  const router = useRouter();
  const [visibility, setVisibility] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState(note);


  const editForm = () => {
    setVisibility(visibility => !visibility)
  
   
  }
  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`/api/post/${note.id}`, noteToEdit)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        router.refresh();
      });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNoteToEdit((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDeleteNote = (id) => {
    axios
    .delete(`/api/post/${id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      router.refresh();
    });
  }

  return (
    <div>
          <li className="p-3 my-5 bg-slate-200" key={note.id}>
      <h1 className="text-2xl font-bold">{note.title}</h1>
      <p>{note.description}</p>

      <div className="pt-5">
        <button
          className="text-blue-700 mr-3"
          onClick={(e)=>editForm()}
        >
          Edit
        </button>
        <button onClick={() => handleDeleteNote(note.id)} className="text-red-700 mr-3">Delete</button>
     
        {visibility && <div>
            <h2 className="text-center">Update Note</h2>
            <form 
            onSubmit={handleEditSubmit}
            className="p-4 bg-neutral-950 mt-1 mb-4 rounded-md flex-col">
              <div>
                <input 
                 value={noteToEdit.title || ""}
                 onChange={handleChange}
                className="bg-neutral-900 p-4 w-full" type="text" id="title"  />
              </div>
              <div>
                <input 
                  value={noteToEdit.description || ""}
                  onChange={handleChange}
                  name="description"
                className="bg-neutral-900 p-4 w-full mt-3" type="text" id="description"  />
              </div>
              <button type="submit" className="mr-3 bg-lime-700 mt-2 p-2 rounded-md">Update</button>
              <button onClick={() => setVisibility(visibility => !visibility)} className="mr-3 bg-rose-600 mt-2 p-2 rounded-md">Cancel</button>
            </form>
          </div>

          }        
      </div>
    </li>
    </div>
  )
}

export default Note