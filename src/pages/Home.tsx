import Advertisement from "../components/Sections/Advertisement";
import FeaturedRooms from "../components/Sections/FeaturedRooms";
import HeroSection from "../components/Sections/HeroSection";
import HowItWorks from "../components/Sections/HowItWorks";
import Benefits from "../components/Sections/Benefits";
import Testimonials from "../components/Sections/Testimonials";
import FAQ from "../components/Sections/FAQ";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Advertisement />
      <FeaturedRooms />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </>
  );
};

export default Home;
