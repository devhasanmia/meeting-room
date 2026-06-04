import { FiClock } from "react-icons/fi";
import { FaStore } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
import { TbPhoneCall } from "react-icons/tb";

const Advertisement = () => {
  const services = [
    {
      icon: <FiClock className="text-2xl" />,
      title: "Real-Time Availability",
      description: "Always know when rooms are available with real-time updates and instant calendar status.",
      colorClass: "text-indigo-600 bg-indigo-50",
    },
    {
      icon: <FaStore className="text-2xl" />,
      title: "Instant Confirmation",
      description: "Book your workspace with confidence and receive confirmation receipts in seconds.",
      colorClass: "text-emerald-600 bg-emerald-50",
    },
    {
      icon: <AiOutlineSchedule className="text-2xl" />,
      title: "Flexible Scheduling",
      description: "Easily book multiple slots, extend times, or adjust your schedules on the go.",
      colorClass: "text-violet-600 bg-violet-50",
    },
    {
      icon: <TbPhoneCall className="text-2xl" />,
      title: "24/7 Expert Support",
      description: "Have questions? Our support team is always available to help keep meetings smooth.",
      colorClass: "text-amber-600 bg-amber-50",
    },
  ];

  return (
    <section className="bg-slate-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Premium Features
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight">
            Our Services
          </h2>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            Explore our wide range of premium services crafted to make your meeting space booking experience entirely seamless.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-slate-100 hover:border-indigo-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5"
            >
              <div className={`flex justify-center items-center rounded-xl w-14 h-14 mb-6 transition-transform duration-300 group-hover:scale-110 ${service.colorClass}`}>
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advertisement;
