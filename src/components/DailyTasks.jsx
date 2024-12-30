import React, { useEffect, useState } from "react";
import { databases } from "../lib/appwrite";
import { useAuth } from "../lib/context/AuthContext";
import { ID, Query } from "appwrite";

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

  const handleNoteDelete = async (noteId) => {
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
              className="flex items-center justify-between p-3 my-2 rounded-md border border-gray-200"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  {/* Custom checkbox */}
                  <div
                    onClick={() => toggleCompletion(note.$id)}
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
                    className={`mt-[2px] ${
                      completedNotes[note.$id]
                        ? "line-through text-gray-500"
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
                  <div
                    onClick={() => {
                      handleNoteDelete(note.$id);
                    }}
                    className=""
                  >
                    {/* Delete button */}
                    <svg
                      width="19"
                      height="24"
                      viewBox="0 0 44 54"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer"
                    >
                      <path
                        d="M41.2266 7.08598H30.1016C29.7501 3.59768 26.7969 0.859375 23.2149 0.859375H20.7891C17.211 0.859375 14.2539 3.59378 13.9024 7.08598H2.77341C1.34761 7.08598 0.195312 8.24618 0.195312 9.66408V11.1094C0.195312 12.5352 1.35551 13.6875 2.77341 13.6875L3.30075 13.6914L6.17575 48.1054C6.28903 49.4843 6.957 50.7656 8.04685 51.6992C9.12105 52.625 10.5235 53.1328 11.9805 53.1328H32.0275C33.4884 53.1328 34.8869 52.6211 35.9611 51.6992C37.0509 50.7656 37.715 49.4844 37.8322 48.1054L40.7072 13.6914H41.2306C42.6564 13.6914 43.8087 12.5312 43.8087 11.1133V9.66798C43.8048 8.23828 42.6484 7.08598 41.2266 7.08598ZM20.7856 2.25397H23.2114C26.02 2.25397 28.352 4.36338 28.6958 7.08208L15.3048 7.08598C15.6486 4.36328 17.977 2.25397 20.7856 2.25397ZM36.4336 47.988C36.2578 50.0935 34.3203 51.7419 32.0195 51.7419L11.9765 51.7458C9.67571 51.7458 7.73821 50.0974 7.56241 47.9919L4.69911 13.6909H39.3011L36.4336 47.988ZM42.4141 11.109C42.4141 11.7652 41.8789 12.3004 41.2227 12.3004H2.77771C2.12146 12.3004 1.58631 11.7652 1.58631 11.109V9.66368C1.58631 9.00743 2.12147 8.47227 2.77771 8.47227H41.2267C41.883 8.47227 42.4181 9.00744 42.4181 9.66368L42.4141 11.109Z"
                        fill="black"
                      />
                      <path
                        d="M12.2894 45.441C12.3207 45.8043 12.6254 46.0816 12.9847 46.0816H13.0394C13.4261 46.0504 13.7113 45.7183 13.6801 45.3316L11.6059 19.4606C11.5746 19.0739 11.2426 18.7887 10.8559 18.82C10.4691 18.8512 10.184 19.1832 10.2152 19.57L12.2894 45.441Z"
                        fill="black"
                      />
                      <path
                        d="M30.9613 46.074H31.016C31.3754 46.074 31.6801 45.8006 31.7113 45.4334L33.7855 19.5624C33.8168 19.1757 33.5316 18.8436 33.1449 18.8124C32.7582 18.7811 32.4262 19.0663 32.3949 19.453L30.3207 45.324C30.2895 45.7107 30.5746 46.0467 30.9613 46.074Z"
                        fill="black"
                      />
                      <path
                        d="M22 46.0781C22.3867 46.0781 22.6953 45.7695 22.6953 45.3827V19.5157C22.6953 19.129 22.3867 18.8204 22 18.8204C21.6133 18.8204 21.3047 19.129 21.3047 19.5157V45.3867C21.3047 45.7696 21.6133 46.0781 22 46.0781Z"
                        fill="black"
                      />
                    </svg>
                  </div>
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
