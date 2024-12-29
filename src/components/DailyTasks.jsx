import React, { useEffect, useState } from "react";
import { databases } from "../lib/appwrite";
import { useAuth } from "../lib/context/AuthContext";
import { ID, Query } from "appwrite";
import { Check } from "lucide-react";

const priorityStyles = {
  high: "bg-red-300",
  medium: "bg-yellow-200",
  low: "bg-green-300",
};

const DailyTasks = () => {
  const [isChecked, setIsChecked] = useState({});
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState(
    new Date().getDate().toString().padStart(2, "0")
  );
  const [month, setMonth] = useState(
    (new Date().getMonth() + 1).toString().padStart(2, "0")
  );
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      init();
    }
  }, [user]);

  const init = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_NOTES,
        [
          Query.equal("userId", user.$id),
          Query.and([
            Query.equal("day", `${day}`),
            Query.equal("month", `${month}`),
            Query.equal("year", `${year}`),
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

  const handleToggle = (id) => {
    setIsChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="pt-9">
      <p className="mb-2">Today's Tasks</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        notes.map((note) => (
          <div
            key={note.$id}
            className="flex items-center justify-between w-full bg-white rounded-md p-4 mb-3"
          >
            <div className="flex items-center space-x-3 ">
              <button
                onClick={() => handleToggle(note.$id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c4e456] ${
                  isChecked[note.$id]
                    ? "bg-[#c4e456] border-[#c4e456]"
                    : "bg-white border-gray-300"
                }`}
                aria-checked={isChecked[note.$id] || false}
                role="checkbox"
              >
                {isChecked[note.$id] && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </button>
              <span className="relative">
                <span
                  className={`text-gray-700 ${
                    isChecked[note.$id] ? "text-gray-400" : ""
                  }`}
                >
                  {note.body}
                </span>
                {isChecked[note.$id] && (
                  <span
                    className="absolute left-0 top-1/2 w-full border-t border-gray-700"
                    aria-hidden="true"
                  ></span>
                )}
              </span>
            </div>
            <div
              className={`px-4 py-2 rounded-lg  ${
                priorityStyles[note.priority.toLowerCase()]
              } capitalize`}
              role="status"
              aria-label={`Priority: ${note.priority}`}
            >
              {note.priority}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DailyTasks;
