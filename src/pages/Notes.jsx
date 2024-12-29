import React, { useEffect, useState } from "react";
import { databases } from "../lib/appwrite";
import { useAuth } from "../lib/context/AuthContext";
import { ID, Query } from "appwrite";
import Loader from "../components/Loader";
import DailyTasks from "../components/DailyTasks";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      init();
    }
  }, [user]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getFormattedDate = () => {
    const date = new Date();
    console.log(date);
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
      setNotes(response.documents);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNoteAdd = async () => {
    if (!user) return;

    try {
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_NOTES,
        ID.unique(),
        {
          body: text,
          userId: user.$id,
        }
      );
      init();
    } catch (error) {
      console.error("Note Add Error:", error);
    }
  };

  if (!user) {
    return <Loader />;
  }

  return (
    // <div>
    //   <div className="flex justify-center items-center w-[200px]">
    //     <input
    //       type="text"
    //       placeholder="Add a note"
    //       className="rounded-lg border-2 px-2 py-2"
    //       onChange={(e) => setText(e.target.value)}
    //     />
    //     <button onClick={handleNoteAdd}>Add</button>
    //   </div>
    //   <h1>
    //     {notes.map((note) => (
    //       <div className="text-base" key={note.$id}>
    //         {note.body}
    //       </div>
    //     ))}
    //   </h1>
    //   <p>{user.$id}</p>
    // </div>
    <div className="flex w-full h-screen">
      <div className="px-12 pt-6 w-3/4 h-screen">
        <div className="flex flex-col gap-2 justify-start">
          <h1 className="text-3xl">
            {getGreeting()}, {user.name}
          </h1>
          <p className="text-md text-gray-500">Its {getFormattedDate()}</p>
        </div>

        <DailyTasks />

        <div className="text-md pt-6">
          <div className="flex justify-center items-center border-2 rounded-md border-gray-300 border-dashed py-2 mt-6 w-full">
            New Task
          </div>
        </div>
      </div>

      {/* ChatBot */}
      <div className="bg-white w-1/4 h-screen"></div>
    </div>
  );
};

export default Notes;
