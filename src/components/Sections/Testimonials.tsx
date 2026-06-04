import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Operations Lead, TechCorp",
      review: "Booking room spaces has never been this simple. We reserved a board room for 15 people in seconds, and the AV smart board screen was completely set up and ready for us.",
      avatar: "S",
      colorClass: "bg-indigo-50 text-indigo-600",
    },
    {
      name: "David Khan",
      role: "Founder, ScaleUp Studio",
      review: "The flexible time slots and instant payment verification fits our workshop schedules perfectly. These rooms are modern, comfortable, and very professional.",
      avatar: "D",
      colorClass: "bg-emerald-50 text-emerald-600",
    },
    {
      name: "Amanda Gomez",
      role: "Corporate Event Planner",
      review: "Excellent space booking experience. Clean interiors, supportive customer team, and premium amenities. Our enterprise clients were thoroughly impressed.",
      avatar: "A",
      colorClass: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <section className="bg-slate-50 py-20 px-6 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Client Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our Users Say
          </h2>
          <p className="text-base text-slate-500 font-medium">
            Hear from startup founders, event coordinators, and operations managers who rely on our spaces.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex space-x-1 text-amber-400">
                  <FaStar size={14} />
                  <FaStar size={14} />
                  <FaStar size={14} />
                  <FaStar size={14} />
                  <FaStar size={14} />
                </div>
                <p className="text-slate-600 text-sm font-medium italic leading-relaxed">
                  "{rev.review}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-3 mt-8 pt-6 border-t border-slate-100">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-inner ${rev.colorClass}`}>
                  {rev.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 leading-none">{rev.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
