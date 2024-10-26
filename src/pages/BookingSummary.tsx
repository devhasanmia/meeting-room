const demoData = {
  date: "2024-06-20",
  slots: [
    {
      _id: "671c26bdfd9aa974299e12f5",
      room: "671c1229fd9aa974299e1051",
      date: "2024-09-02",
      startTime: "12:04",
      endTime: "15:00",
      isBooked: true,
    },
  ],
  room: {
    _id: "67199548a4a3c388d1bfdf1d",
    name: "Conference Room",
    roomNo: 201,
    floorNo: 1,
    capacity: 20,
    pricePerSlot: 100,
    amenities: ["Projector", "Whiteboard"],
  },
  user: {
    _id: "6719947ea4a3c388d1bfdf15",
    name: "MD. HASAN MIA",
    email: "hasan@gmail.com",
  },
  totalAmount: 293.33,
  isConfirmed: "unconfirmed",
};
const BookingSummary = () => {
  const { date, slots, room, user, totalAmount, isConfirmed } = demoData;

  const { startTime, endTime } = slots[0];

  return (
    <div className="p-6 border rounded-lg shadow-md mb-6 bg-white max-w-lg mx-auto sm:p-8 md:max-w-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Booking Summary
      </h2>
      <div className="space-y-4 text-gray-700">
        <div className="flex flex-col sm:flex-row justify-between">
          <strong className="w-32">Room Name:</strong>
          <span>{room.name}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <strong className="w-32">Room No:</strong>
          <span>{room.roomNo}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <strong className="w-32">Floor No:</strong>
          <span>{room.floorNo}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <strong className="w-32">Date:</strong>
          <span>{date}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <strong className="w-32">Time:</strong>
          <span>
            {startTime} - {endTime}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <strong className="w-32">Cost:</strong>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <strong className="w-32">User:</strong>
          <span>{user.name}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <strong className="w-32">User Email:</strong>
          <span>{user.email}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <strong className="w-32">Status:</strong>
          <span
            className={`${
              isConfirmed === "confirmed" ? "text-green-600" : "text-red-600"
            }`}
          >
            {isConfirmed.charAt(0).toUpperCase() + isConfirmed.slice(1)}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <strong className="w-32">Payment</strong>
          <button className="p-3 bg-green-400 rounded-md text-white">Payment And Confirm Booking</button>
        </div>
       
      </div>
    </div>
  );
};

export default BookingSummary;
