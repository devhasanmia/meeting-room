import FeaturedRooms from "../components/Sections/FeaturedRooms";

const MeetingRooms = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-28 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Available Spaces
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Meeting Rooms
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Explore our state-of-the-art conference rooms, collaboration hubs, and lecture spaces tailored to your needs.
          </p>
        </div>

        {/* Featured Rooms Grid */}
        <FeaturedRooms />
      </div>
    </div>
  );
};

export default MeetingRooms;
