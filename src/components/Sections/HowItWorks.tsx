import { FiSearch, FiCalendar, FiCheckCircle, FiActivity } from "react-icons/fi";

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      title: "Browse Available Rooms",
      description: "View a list of meeting rooms with real-time availability, capacities, and premium amenities.",
      icon: <FiSearch className="text-2xl" />,
      colorClass: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      id: "02",
      title: "Select Date & Time",
      description: "Choose your desired date and time slots using our simple and intuitive calendar interface.",
      icon: <FiCalendar className="text-2xl" />,
      colorClass: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      id: "03",
      title: "Confirm Your Booking",
      description: "Reserve your selected room instantly and finalize payment to secure your space.",
      icon: <FiCheckCircle className="text-2xl" />,
      colorClass: "text-violet-600 bg-violet-50 border-violet-100",
    },
    {
      id: "04",
      title: "Manage Your Schedule",
      description: "Easily view, modify, or cancel bookings directly from your personal user dashboard.",
      icon: <FiActivity className="text-2xl" />,
      colorClass: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-base text-slate-500 font-medium">
            Follow these four simple steps to reserve and manage your productive meeting spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative group bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-100 hover:border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Step number badge */}
              <div className="absolute top-6 right-6 text-2xl font-black text-slate-200/80 group-hover:text-indigo-100 transition-colors select-none">
                {step.id}
              </div>

              {/* Icon */}
              <div className={`flex items-center justify-center w-14 h-14 rounded-xl mb-6 shadow-sm border ${step.colorClass}`}>
                {step.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;