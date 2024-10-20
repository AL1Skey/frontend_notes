import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function Home({isPublic=false}) {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      let response;
      console.log(isPublic);
      if(!isPublic){
      response = await fetch(`${process.env.API_URL}/notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization"),
        },
      });
    }else{
      response = await fetch(`${process.env.API_URL}/public/notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization"),
        },
      });
    }
      const data = await response.json();
      console.log(data);
      if (data.error) {
        alert(data.error);
      } else {
        setEntries(data.notes);
      }
      setLoading(false);
      console.log(data);
    };
    fetchEntries();
  }, []);

  const deleteEntry = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(id,"IDIIDIDIDIIDI");
        const response = await fetch(`${process.env.API_URL}/notes/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("Authorization"),
          },
        });
        const data = await response.json();
        if (data.error) {
          alert(data.error);
        } else {
          const updatedEntries = entries.filter((entry) => entry._id !== _id);
          setEntries(updatedEntries);
        }
      }
    });
  };
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="container mx-auto p-4 max-w-3xl flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center">My Diary</h1>
        <Link
          to={"/add"}
          className="mb-6 w-[10rem] text-center bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
        >
          Add New Entry
        </Link>
      </div>

      <div className="space-y-4">
        {entries?.length === 0 ? (
          <p className="text-center text-gray-500">
            No entries yet. Start writing your diary!
          </p>
        ) : (
          entries?.map((entry) => (
            <div
              key={entry.id}
              className="bg-white p-4 rounded shadow relative"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-700">{entry.title}</h2>
                <span className="text-sm text-gray-500">{entry.date}</span>
              </div>
              <p className="text-gray-700 mb-4">
                {entry.content.length > 100
                  ? `${entry.content.substring(0, 100)}...`
                  : entry.content}
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  onClick={() => {
                    navigate(isPublic ?`/detail/${entry.userId}-${entry._id}` :`/notes/${entry._id}`);
                  }
                  }
                >
                  Details
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  onClick={() => {
                    setId(entry._id)
                    deleteEntry()
                  }
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
