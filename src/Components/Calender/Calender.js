import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const Calendar = () => {
  // State to keep track of the current month and year
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

 
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

 
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month - 1, 1).getDay();
  };

 
  const getMonthName = (month) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[month - 1];
  };

 
  const getCurrentDate = () => {
    const date = new Date();
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };
  };

 
 
  

  const [selectedDay, setSelectedDay] = useState(null);
  const [eventName, setEventName] = useState(""); 
  const [submittedData, setSubmittedData] = useState([]); 

  const handleDelete = (index) => {
    setSubmittedData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };
  
  const renderCalendar = () => {
    const numDays = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const currentDate = getCurrentDate();
    const calendar = [];

   
    for (let i = 0; i < firstDay; i++) {
      calendar.push(<div key={`empty-${i}`} className="calendar-cell"></div>);
    }


  
  const handleInputChange = (event) => {
        setEventName(event.target.value); // Update state with input value
    };
    


    const handleOptionSelect = (day) => {
        console.log(`Option selected for day ${day}:`);
        setSelectedDay(day);

      };

    const handleSubmit = (event) => {
       const month =  getMonthName(currentMonth)
     event.preventDefault(); 
    setSubmittedData([...submittedData, { eventName,selectedDay,month }]);
    console.log("Form submitted. Event Name:", eventName);
    setEventName(""); // Clear the input field after submission
    setSelectedDay('');
      };


 


 

  
    for (let day = 1; day <= numDays; day++) {
      const isCurrentDay = currentDate.day === day && currentDate.month === currentMonth && currentDate.year === currentYear;
      calendar.push(
        <div key={day} className={`calendar-cell ${isCurrentDay ? ' text-red-500 ' : ''}`}>
          <div className="relative p-1">
            <button
              className="w-full h-full bg-transparent hover:bg-gray-300 rounded-md p-2 font-bold border-2"
              onClick={() => handleOptionSelect(day)}
            >
              {day}
            </button>
            {/* Dropdown menu for selecting options */}
            {selectedDay == day && (
            <div className="absolute mt-4 bg-white border border-gray-900 rounded-md shadow-lg z-10 p-5">
            <div className="py-1">
              <h1 className="text-center mb-4 font-bold">Create an event</h1>

              <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event name..."
        value={eventName}
        onChange={handleInputChange}
        className="p-1 text-center border-2"
      />
      <button
        type="submit"
        className="block w-full px-2 mt-4 py-2 text-white hover:bg-gray-500 bg-black"
      >
        Save
      </button>
    </form>
            </div>
          </div>

            )}
          </div>
        </div>
      );
    }

    return calendar;
  };

  return (
    <div className="container mx-auto p-16 ">
      <div className="flex justify-between items-center mb-4">
        <button className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded" onClick={() => setCurrentMonth(currentMonth - 1)}>Previous</button>
        <h2 className="text-xl text-red-500 font-bold border-2 p-2  rounded  ">{getMonthName(currentMonth)} {currentYear}</h2>
        <button className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded" onClick={() => setCurrentMonth(currentMonth + 1)}>Next</button>
      </div>
      <div className="grid grid-cols-7 gap-1 border-2 p-2 rounded pb-5">
        <div className="text-center text-sm font-semibold py-2">Sun</div>
        <div className="text-center text-sm font-semibold py-2">Mon</div>
        <div className="text-center text-sm font-semibold py-2">Tue</div>
        <div className="text-center text-sm font-semibold py-2">Wed</div>
        <div className="text-center text-sm font-semibold py-2">Thu</div>
        <div className="text-center text-sm font-semibold py-2">Fri</div>
        <div className="text-center text-sm font-semibold py-2">Sat</div>
        {renderCalendar()}
      </div>
      
        <div className="text-center mt-5 border-2 p-4 rounded">
      {submittedData.length > 0 && (
        <div>
          <h2 className="text-white font-bold bg-black p-1 rounded">Scheduled Events</h2>
          <ul className="mt-4 ">
            {submittedData.map((data, index) => (
              <li className="border-2 border-blue-100 p-3 h- m-3 rounded"  key={index}><span className=" font-bold">Event Name:</span> <span className="text-red-500 font-bold">{data.eventName}</span> <span className=" font-bold">  Date :</span>  <span className="text-red-500 font-bold"> {data.selectedDay } - {data.month} </span> <span className="float-right mt-1 hover:text-red-500" onClick={() => handleDelete(index)}>  <FaTrash /></span></li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
};

export default Calendar;
