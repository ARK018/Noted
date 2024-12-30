import React, { useEffect, useState } from "react";
import { databases } from "../lib/appwrite";
import { useAuth } from "../lib/context/AuthContext";
import { ID, Query } from "appwrite";

import { TrashIcon } from "lucide-react";

const DailyTasks = ({ refresh, setRefresh }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedNotes, setCompletedNotes] = useState({});
  const [day] = useState(new Date().getDate());
  const [month] = useState(new Date().getMonth() + 1);
  const [year] = useState(new Date().getFullYear());

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      init();
    }
  }, [user, refresh]);

  const init = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_NOTES,
        [
          Query.equal("userId", user.$id),
          Query.and([
            Query.equal("day", day),
            Query.equal("month", month),
            Query.equal("year", year),
          ]),
        ]
      );
      setNotes(response.documents);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      await databases.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_NOTES,
        noteId
      );
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Note Delete Error:", error);
    }
  };

  const toggleCompletion = (noteId) => {
    setCompletedNotes((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
    }));
  };

  return (
    <div className="pt-9">
      <p className="mb-2">Today's Tasks</p>
      <div className="font-overpass">
        {loading ? (
          <div className="text-center py-4">Loading tasks...</div>
        ) : notes.length ? (
          notes.map((note) => (
            <div
              key={note.$id}
              className="group flex items-center justify-between p-3 my-2 rounded-md border border-gray-200"
            >
              <div className="flex items-center justify-between w-full">
                <div
                  onClick={() => toggleCompletion(note.$id)}
                  className="flex items-center space-x-2 w-full cursor-pointer"
                >
                  {/* Custom checkbox */}
                  <div
                    className={`flex justify-center items-center border-2 rounded-full w-5 h-5 ${
                      completedNotes[note.$id]
                        ? "border-green-700"
                        : "border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        completedNotes[note.$id]
                          ? "bg-green-700"
                          : "border-2 border-gray-300"
                      }`}
                    ></div>
                  </div>
                  {/* Note content with conditional strikethrough */}
                  <p
                    className={` relative ${
                      completedNotes[note.$id]
                        ? "line-through-animated text-gray-500"
                        : ""
                    }`}
                  >
                    {note.body}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-6">
                  {note.priority ? (
                    <div className="bg-red-600 rounded-full text-xs px-[14px] py-1 text-white">
                      <p className="mt-[2px]">high</p>
                    </div>
                  ) : null}
                  <button
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={() => handleDelete(note.$id)}
                  >
                    <TrashIcon className="h-5 w-5 text-red-500 hover:text-red-700" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No tasks for today</div>
        )}
      </div>
    </div>
  );
};

export default DailyTasks;
