import { FiCpu, FiCalendar, FiSmile } from "react-icons/fi";

const Benefits = () => {
  const benefitList = [
    {
      icon: <FiCpu className="text-xl" />,
      title: "Smart AV Amenities",
      description: "State-of-the-art visual screens, interactive whiteboard monitors, and premium fiber networks in every room.",
      colorClass: "text-indigo-600 bg-indigo-50",
    },
    {
      icon: <FiCalendar className="text-xl" />,
      title: "Zero-Clash Scheduling",
      description: "Find available rooms by specific dates and time slots instantly. Seamless booking and automated confirmations.",
      colorClass: "text-emerald-600 bg-emerald-50",
    },
    {
      icon: <FiSmile className="text-xl" />,
      title: "Premium Corporate Comfort",
      description: "Soundproof spaces, modern ergonomic seating, and professional presentation boards for maximum efficiency.",
      colorClass: "text-violet-600 bg-violet-50",
    },
  ];

  return (
    <section className="bg-slate-50 py-20 px-6 border-t border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Our Advantages
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose Our Spaces
          </h2>
          <p className="text-base text-slate-500 font-medium leading-relaxed">
            We focus on creating seamless environments that enhance teamwork, boost productivity, and look professional.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefitList.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 shrink-0 ${benefit.colorClass}`}>
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">{benefit.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
