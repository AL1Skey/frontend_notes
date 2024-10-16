"use client"

import React, { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { CalendarIcon, ArrowLeftIcon } from "lucide-react"

export default function NotesDetail() {
  const [entry, setEntry] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEntry = async () => {
      const response = await fetch(`${process.env.API_URL}/notes/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization"),
        },
      })
      const data = await response.json()
      if (data.error) {
        alert(data.error)
        navigate("/")
      } else {
        setEntry(data.note)
      }
    }

    fetchEntry()
  }, [id, navigate])

  if (!entry) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
        <div className="bg-primary p-6">
          <h2 className="text-3xl font-bold text-white mb-2">{entry.title}</h2>
          <div className="flex items-center text-primary-foreground">
            <CalendarIcon className="w-5 h-5 mr-2" />
            <p>{new Date(entry.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="p-6 text-gray-300">
          <div className="prose prose-invert max-w-none">
            {entry?.content?.split("\n").map((line, index) => (
              <p key={index} className="mb-4">
                {line}
              </p>
            ))}
          </div>
        </div>
        <div className="bg-gray-900 px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Entries
          </Link>
        </div>
      </div>
    </div>
  )
}