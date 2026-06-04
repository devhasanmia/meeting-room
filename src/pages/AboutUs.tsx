import seoImage from "../assets/images/Seo.jpg";
import { FaEnvelope, FaFacebookF, FaGithub } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-6 py-28 max-w-5xl space-y-24">
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          Who We Are
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          About Our Platform
        </h1>
        <p className="text-base text-slate-500 font-medium">
          A dedicated space booking platform created to optimize corporate meeting workflows and elevate productivity.
        </p>
      </div>

      {/* Mission Section */}
      <section className="bg-gradient-to-br from-indigo-900 to-indigo-950 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)] pointer-events-none"></div>
        <div className="max-w-3xl space-y-4 relative z-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-indigo-300">Our Mission</h2>
          <p className="text-slate-200 text-lg md:text-xl font-medium leading-relaxed">
            At the heart of everything we do is a simple goal: to make a lasting difference. We design solutions that don’t just address daily friction but actively inspire corporate progress. We believe in the power of smart automation and clean UX to build better workplaces.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900">Meet the Team</h2>
          <p className="text-slate-400 font-medium text-sm">The minds behind the Meeting Room Booking System.</p>
        </div>

        <div className="flex justify-center">
          <div className="group bg-slate-50 border border-slate-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300 max-w-sm w-full">
            <div className="relative w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:border-indigo-100 transition-colors">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={seoImage}
                alt="MD. HASAN MIA"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-800">MD. HASAN MIA</h3>
            <p className="text-indigo-600 font-semibold text-sm mt-1">Lead Web Developer</p>
            <p className="text-slate-500 text-xs mt-3 leading-relaxed">
              Passionate full-stack developer focusing on crafting user-centric frontend designs and scalable API services.
            </p>

            <div className="flex justify-center space-x-3 mt-6">
              <a
                href="mailto:hasanmiaweb@gmail.com"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
              >
                <FaEnvelope size={14} />
              </a>
              <a
                href="https://www.facebook.com/devhashmia/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://github.com/devhasanmia"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
              >
                <FaGithub size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="border-t border-slate-100 pt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 col-span-1">Our Story</h2>
        <div className="col-span-1 md:col-span-2 text-slate-600 space-y-4 text-base font-medium leading-relaxed">
          <p>
            This project, the Meeting Room Booking System, was developed with the clear goal of streamlining reservations in modern workspace environments. We identified a common pain point: scheduling conflicts, lack of live details, and manual confirmations.
          </p>
          <p>
            Through applying robust architectural patterns (React, Redux Toolkit, RTK Query, Tailwind CSS), we designed an end-to-end booking flow that ensures users secure their desired dates seamlessly, while admins maintain absolute control over rooms, schedules, and approvals.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
