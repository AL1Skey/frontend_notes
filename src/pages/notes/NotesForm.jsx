import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export default function NotesForm() {
  const [entries, setEntries] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const id = useParams()?.id ? useParams()?.id : null;
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchData = async() => {
      if(id && id !== 'add') {
        const response = await fetch(`${process.env.API_URL}/notes/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization')
          }
        })
        const data = await response.json()
        if (data.error) {
          alert(data.error)
        } else {
          setTitle(data.title);
          setContent(data.content);
        }
      }
    }
    fetchData()
  }, [])

  const addEntry = async(e) => {
    e.preventDefault()
    const url = id && id !== 'add' ? `${process.env.API_URL}/notes/${id}` : `${process.env.API_URL}/notes`;
    const method = id && id !== 'add' ? 'PUT' : 'POST';
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization')
      },
      body: JSON.stringify({ title, content })
    })

    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">My Diary</h1>
      <form onSubmit={addEntry} className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Write your diary entry here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
          rows={4}
        />
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add Entry
        </button>
      </form>
      
    </div>
  )
}