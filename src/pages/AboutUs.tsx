import { Divider } from "antd";
import seoImage from "../assets/images/Seo.jpg";
const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <section className="mb-16">
        <Divider style={{ fontSize: "30px" }}>Our Mission</Divider>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          At the heart of everything we do is a simple goal: to make a lasting
          difference. We’re driven by the desire to create solutions that don’t
          just address problems but inspire progress. We believe in the power of
          innovation, collaboration, and integrity to build a brighter future
          for everyone. Our mission is to push boundaries, empower communities,
          and deliver meaningful impact, one step at a time.
        </p>
      </section>

      <section className="mb-16">
        <Divider style={{ fontSize: "30px" }}>Meet the Team</Divider>

        <div className="flex justify-center gap-8">
          <div className="team-member text-center transition-transform transform hover:scale-105 duration-300">
            <img
              className="w-36 h-36 rounded-full object-cover mx-auto mb-4 shadow-lg"
              src={seoImage}
            />
            <h3 className="text-xl font-semibold">MD. HASAN MIA</h3>
            <p className="text-gray-600">Web Developer</p>
          </div>
        </div>
      </section>

      <section>
        <Divider style={{ fontSize: "30px" }}>Our Story</Divider>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          This project, the Meeting Room Booking System, was developed as part
          of an assignment with the goal of streamlining room reservations in a
          busy office environment. The idea came from the need to create an
          efficient, user-friendly system that allows employees to book meeting
          spaces with ease, eliminating scheduling conflicts and improving
          overall productivity. Through this project, we've applied key concepts
          of software development and learned how to solve real-world problems
          using technology.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
