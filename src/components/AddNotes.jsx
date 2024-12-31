import React, { useState, useRef } from "react";
import { databases } from "../lib/appwrite";
import { useAuth } from "../lib/context/AuthContext";
import { ID } from "appwrite";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { CircleArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const AddNotes = ({ setRefresh }) => {
  const [body, setBody] = useState("");
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { user } = useAuth();
  const inputRef = useRef(null); // Create a ref for the input

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setIsCalendarOpen(false); // Close the popover when a date is selected
  };

  const handlePopoverClose = (isOpen) => {
    setIsCalendarOpen(isOpen);
  };

  const handleNoteAdd = async () => {
    try {
      if (!user) return;

      if (!body.trim() || !date) {
        alert("Please fill out both the task and date.");
        return;
      }

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_NOTES,
        ID.unique(),
        {
          userId: user.$id,
          day,
          month,
          year,
          body,
          priority,
        }
      );
      setBody("");
      setDate(null);
      setPriority(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Note Add Error:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleNoteAdd();
    }
  };

  return (
    <div className="flex justify-between items-center w-full bg-[#f8f8ec] p-[13px] rounded-lg">
      <div className="flex items-center space-x-2 w-full">
        {/* Custom checkbox */}
        <div className="flex justify-center items-center border-2 rounded-full w-5 h-5 border-gray-300"></div>

        {/* Task Text */}
        <input
          id="note"
          type="text"
          placeholder="Create a new task!"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={handleKeyDown} // Listen for Enter key
          className="font-overpass w-full mt-[2px] border-none bg-transparent shadow-none outline-none focus:border-none focus:ring-0"
        />
      </div>

      {/* Priority and Date */}
      <div className="flex items-center space-x-2">
        <Popover open={isCalendarOpen} onOpenChange={handlePopoverClose}>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={() => {
                setPriority(!priority);
                setIsClicked(!isClicked);
              }}
              asChild
            >
              <div
                className={`flex justify-center items-center rounded-lg p-[4px] ${
                  isClicked ? "bg-gray-100" : "bg-white"
                } border shadow cursor-pointer hover:scale-95`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M144,200a16,16,0,1,1-16-16A16,16,0,0,1,144,200Zm-16-40a8,8,0,0,0,8-8V48a8,8,0,0,0-16,0V152A8,8,0,0,0,128,160Z"></path>
                </svg>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Make it a priority</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="bg-white border shadow flex justify-center items-center rounded-lg cursor-pointer p-[5px] hover:bg-gray-100 hover:scale-95">
          <CircleArrowRight
            onClick={handleNoteAdd}
            className="text-black/60 "
          />
        </div>
      </div>
    </div>
  );
};

export default AddNotes;
