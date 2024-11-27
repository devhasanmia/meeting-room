import Advertisement from "../components/Sections/Advertisement";
import FeaturedRooms from "../components/Sections/FeaturedRooms";
import HeroSection from "../components/Sections/HeroSection";
import HowItWorks from "../components/Sections/HowItWorks";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Advertisement />
      <FeaturedRooms />
      <HowItWorks />
    </>
  );
};

export default Home;
