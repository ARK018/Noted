import React, { useState } from "react";
import { databases } from "../lib/appwrite";
import { useAuth } from "../lib/context/AuthContext";
import { ID } from "appwrite";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { addDays, format } from "date-fns";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const AddNotes = ({ setRefresh }) => {
  const [date, setDate] = useState(null);
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState(false);
  const { user } = useAuth();

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleNoteAdd = async () => {
    try {
      if (!user) return;

      const day = date ? date.getDate() : null;
      const month = date ? date.getMonth() + 1 : null;
      const year = date ? date.getFullYear() : null;

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
      setPriority(false);
      setDate(null);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Note Add Error:", error);
    }
  };

  return (
    <div className="w-full">
      <Sheet>
        <SheetTrigger asChild>
          <div className="min-w-full  group transition-all duration-300 hover:bg-gray-50 border-2 rounded-lg border-gray-200 border-dashed p-4 mt-4 cursor-pointer">
            <div className="flex items-center justify-center space-x-2">
              <PlusCircle className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              <span className="text-gray-600 group-hover:text-gray-800 font-medium">
                Add New Task
              </span>
            </div>
          </div>
        </SheetTrigger>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold text-gray-900">
              Create Task
            </SheetTitle>
            <SheetDescription className="text-gray-500">
              Add your task details below. Set priority and due date if needed.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <Label
                htmlFor="note"
                className="text-sm font-medium text-gray-700"
              >
                Task Description
              </Label>
              <Input
                id="note"
                type="text"
                placeholder="What needs to be done?"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Due Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-gray-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="priority"
                type="checkbox"
                checked={priority}
                onChange={(e) => setPriority(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <Label
                htmlFor="priority"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Mark as Priority
              </Label>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                onClick={handleNoteAdd}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Create Task
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddNotes;
