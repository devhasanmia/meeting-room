import { NavLink } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import { FiCheckCircle } from "react-icons/fi";

const HeroSection = () => {
  return (
    <section className="relative mt-20 bg-slate-50 overflow-hidden py-16 md:py-24 px-6 md:px-12">
      {/* Subtle Mesh Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-200/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Content Column */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8 relative z-10 text-left">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
            Smart Scheduling Platform
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] md:leading-none">
            Find and Book the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Perfect Meeting Room
            </span>{" "}
            Instantly
          </h1>

          <p className="text-base md:text-lg text-slate-500 font-medium max-w-xl leading-relaxed">
            Supercharge your team's collaboration. Reserve high-tech conference spaces, creative design hubs, and quiet executive boardrooms with zero friction.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <NavLink to="/meeting-rooms">
              <button className="w-full sm:w-auto px-8 py-4 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg hover:shadow-indigo-500/25 hover:shadow-xl transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2">
                <span>Explore Rooms</span>
                <HiOutlineArrowRight className="text-base" />
              </button>
            </NavLink>
            <NavLink to="/about-us">
              <button className="w-full sm:w-auto px-8 py-4 text-sm font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl transition duration-300">
                Learn More
              </button>
            </NavLink>
          </div>

          <div className="h-[1px] bg-slate-200 w-full max-w-xl"></div>

          {/* Trust Metrics details */}
          <div className="grid grid-cols-3 gap-6 max-w-lg">
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-black text-slate-800">15k+</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bookings Done</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-black text-slate-800">150+</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Modern Rooms</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-black text-slate-800">4.9/5</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Average Rating</p>
            </div>
          </div>
        </div>

        {/* Right Media Column: Visual Collage */}
        <div className="lg:col-span-5 relative w-full h-[400px] md:h-[500px]">
          {/* Main Visual Frame */}
          <div className="absolute top-4 left-4 right-12 bottom-12 rounded-3xl overflow-hidden border border-slate-200/50 shadow-2xl z-10 bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
              alt="Conference Room"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlay Mini Frame */}
          <div className="absolute right-4 bottom-4 w-44 h-44 rounded-2xl overflow-hidden border-4 border-white shadow-xl z-20 hidden md:block">
            <img
              src="https://plus.unsplash.com/premium_photo-1661347859297-859b8ae1d7c5?q=80&w=1198&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Meeting Collaboration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Trust float tag */}
          <div className="absolute top-10 right-0 bg-white border border-slate-100 rounded-xl p-3.5 shadow-lg z-20 flex items-center space-x-2.5 transform translate-x-2 translate-y-2">
            <FiCheckCircle className="text-emerald-500 text-lg shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-800 leading-none">Instant Booking</p>
              <p className="text-[9px] text-slate-400 font-semibold uppercase mt-0.5">100% Guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
