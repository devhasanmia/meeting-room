import { Carousel } from "antd";
import { NavLink } from "react-router-dom";

const HeroSection = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
      title: "Seamless Room Booking",
      subtitle: "Empowering smart scheduling for high-performing teams.",
      description: "Book state-of-the-art conference rooms equipped with the latest technology in just a few clicks.",
    },
    {
      image: "https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&w=1600&q=80",
      title: "Streamline Collaboration",
      subtitle: "Manage your meeting spaces with maximum ease.",
      description: "Eliminate scheduling conflicts and maximize productivity with our flexible booking system.",
    },
  ];

  return (
    <div className="relative mt-20 px-4 md:px-8 max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
      <Carousel effect="fade" autoplay dots={{ className: "custom-carousel-dots" }} speed={800} autoplaySpeed={5000}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[450px] md:h-[600px] w-full rounded-3xl overflow-hidden">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-10000 ease-out scale-105 hover:scale-100"
            />
            {/* Dark & Tint Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-transparent"></div>

            {/* Content Container */}
            <div className="absolute inset-0 flex items-center px-6 md:px-16 lg:px-24">
              <div className="max-w-2xl text-white space-y-4 md:space-y-6">
                <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 rounded-full">
                  {slide.subtitle}
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight md:leading-none">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-lg text-slate-200 font-medium max-w-lg">
                  {slide.description}
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <NavLink to="/meeting-rooms">
                    <button className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg transition duration-300 transform active:scale-95">
                      Explore Rooms
                    </button>
                  </NavLink>
                  <NavLink to="/about-us">
                    <button className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold bg-slate-800/80 hover:bg-slate-700/80 text-white border border-slate-700 rounded-xl transition duration-300">
                      Learn More
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSection;
