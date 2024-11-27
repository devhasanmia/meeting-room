import { Divider } from "antd";
import { FiClock } from "react-icons/fi";
import { FaStore } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
import { TbPhoneCall } from "react-icons/tb";

const Advertisement = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <Divider style={{ fontSize: "40px", color: "#00B6FF" }}>Our Services</Divider>
        <p className="text-lg text-black mb-10 font-medium">
          Explore our wide range of premium services crafted to make your experience seamless.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Card 1 */}
          <div className="group bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-all">
            <div className="flex justify-center items-center bg-gray-900 rounded-full w-16 h-16 mb-6">
              <FiClock className="text-[#00B6FF] text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-gray-700">
              Real-Time Availability
            </h3>
            <p className="text-gray-600">
              Always know when we're available to serve you in real-time.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-all">
            <div className="flex justify-center items-center bg-gray-900 rounded-full w-16 h-16 mb-6">
              <FaStore className="text-[#00B6FF] text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-gray-700">
              Instant Booking Confirmation
            </h3>
            <p className="text-gray-600">
              Book with confidence and receive confirmation instantly.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-all">
            <div className="flex justify-center items-center bg-gray-900 rounded-full w-16 h-16 mb-6">
              <AiOutlineSchedule className="text-[#00B6FF] text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-gray-700">
              Flexible Scheduling
            </h3>
            <p className="text-gray-600">
              Choose times that suit your schedule best with ease.
            </p>
          </div>

          {/* Card 4 */}
          <div className="group bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-all">
            <div className="flex justify-center items-center bg-gray-900 rounded-full w-16 h-16 mb-6">
              <TbPhoneCall className="text-[#00B6FF] text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-gray-700">
              24/7 Support
            </h3>
            <p className="text-gray-600">
              Reach us anytime, day or night, for unparalleled support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advertisement;
