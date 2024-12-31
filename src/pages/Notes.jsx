import React, { useEffect, useState } from "react";
import { databases } from "../lib/appwrite";
import { useAuth } from "../lib/context/AuthContext";
import { Query } from "appwrite";

import Loader from "../components/Loader";
import DailyTasks from "../components/DailyTasks";
import AddNotes from "@/components/AddNotes";
import { TrashIcon } from "lucide-react";
import Add from "@/components/AddNotes";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [completedNotes, setCompletedNotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [day] = useState(new Date().getDate());
  const [month] = useState(new Date().getMonth() + 1);
  const [year] = useState(new Date().getFullYear());
  const [refresh, setRefresh] = useState(false); // Add refresh state

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      init();
    }
  }, [user, refresh]); // Replace AddNotes with refresh

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getFormattedDate = () => {
    const date = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const init = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_NOTES,
        [Query.equal("userId", user.$id)]
      );
      // Filter notes based on the condition
      const filteredNotes = response.documents.filter(
        (note) => note.day !== day || note.month !== month || note.year !== year
      );

      // Sort notes by updatedAt timestamp in descending order
      const sortedNotes = filteredNotes.sort(
        (a, b) => new Date(b.$updatedAt) - new Date(a.$updatedAt)
      );

      setNotes(sortedNotes);

      // Initialize completedNotes state
      const completedNotesState = {};
      sortedNotes.forEach((note) => {
        if (note.completed) {
          completedNotesState[note.$id] = true;
        }
      });
      setCompletedNotes(completedNotesState);

      console.log(sortedNotes);
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

  const handleComplete = async (noteId) => {
    try {
      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_NOTES,
        noteId,
        {
          completed: true,
        }
      );
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Note Complete Error:", error);
    }
  };

  const handleUncomplete = async (noteId) => {
    try {
      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_NOTES,
        noteId,
        {
          completed: false,
        }
      );
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Note Uncomplete Error:", error);
    }
  };

  const toggleCompletion = (noteId) => {
    setCompletedNotes((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
    }));
    if (!completedNotes[noteId]) {
      handleComplete(noteId);
    } else {
      handleUncomplete(noteId);
    }
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center w-full border-r border-black">
      {/* Main Area */}
      <div className="px-12 py-6 w-full max-w-[1020px]">
        <div className="flex flex-col gap-1 justify-start">
          <h1 className="text-3xl">
            {getGreeting()}, {user.name}
          </h1>
          <p className="text-sm text-gray-500">It's {getFormattedDate()}</p>
          <DailyTasks refresh={refresh} setRefresh={setRefresh} />
        </div>

        {/*ALL Notes */}
        <div className="text-md pt-6 ">
          <p className="">All Tasks</p>
          <div className="">
            <AddNotes setRefresh={(val) => setRefresh(val)} />{" "}
            {/* Pass setRefresh to AddNotes component */}
            <div className="font-overpass">
              {loading ? (
                <div className="text-center py-4">Loading tasks...</div>
              ) : notes.length > 0 ? (
                notes
                  .filter((note) => !note.completed)
                  .map((note) => (
                    <div
                      key={note.$id}
                      className="group flex items-center justify-between p-3 my-2 rounded-md border border-gray-200 w-full cursor-pointer"
                      onClick={() => toggleCompletion(note.$id)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2 w-full cursor-pointer">
                          {/* Custom checkbox */}
                          <div
                            className={`flex justify-center items-center border-2 rounded-full w-5 h-5 ${
                              completedNotes[note.$id]
                                ? "border-[#c4e456]"
                                : "border-gray-300"
                            }`}
                          >
                            <div
                              className={`w-3 h-3 rounded-full ${
                                completedNotes[note.$id]
                                  ? "bg-[#c4e456]"
                                  : "border-none"
                              }`}
                            ></div>
                          </div>
                          {/* Note content with conditional strikethrough */}
                          <p
                            className={`mt-[2px] relative ${
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
                <div className="w-full mt-6 flex justify-center">
                  Add some tasks
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Completed Notes */}
        {notes.filter((note) => note.completed).length > 0 ? (
          <div className="text-md pt-6 ">
            <p className="">Completed</p>
            <div className="">
              <div className="font-overpass">
                {loading ? (
                  <div className="text-center py-4">Loading tasks...</div>
                ) : notes.length > 0 ? (
                  notes
                    .filter((note) => note.completed)
                    .map((note) => (
                      <div
                        key={note.$id}
                        className="group flex items-center justify-between p-3 my-2 rounded-md border border-gray-200 w-full cursor-pointer"
                        onClick={() => toggleCompletion(note.$id)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center space-x-2 w-full cursor-pointer">
                            {/* Custom checkbox */}
                            <div
                              className={`flex justify-center items-center border-2 rounded-full w-5 h-5 ${
                                completedNotes[note.$id]
                                  ? "border-[#c4e456]"
                                  : "border-gray-300"
                              }`}
                            >
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  completedNotes[note.$id]
                                    ? "bg-[#c4e456]"
                                    : "border-none"
                                }`}
                              ></div>
                            </div>
                            {/* Note content with conditional strikethrough */}
                            <p
                              className={`mt-[2px] relative ${
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
                  <div className="w-full mt-6 flex justify-center">
                    No tasks Completed
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Notes;
