import { Divider } from "antd";
import { FiClock } from "react-icons/fi";
import { FaStore } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
import { TbPhoneCall } from "react-icons/tb";
import Service from "../ui/Service";

const Advertisement = () => {
  return (
    <section className="bg-blue-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <Divider style={{ fontSize: "40px" }}>Our Services</Divider>
        <p className="text-lg text-gray-600 mb-12">
          We offer exceptional services to meet your needs at any time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Service bgColor="bg-green-400" icon={<FiClock style={{ fontSize: "35px" }} />} title="Real-Time Availability" />
          <Service bgColor="bg-emerald-400" icon={<FaStore style={{ fontSize: "35px" }} />} title="Instant Booking Confirmation" />
          <Service bgColor="bg-green-500" icon={<AiOutlineSchedule style={{ fontSize: "35px" }} />} title="Flexible Scheduling" />
          <Service bgColor="bg-green-400" icon={<TbPhoneCall style={{ fontSize: "35px" }} />} title="24/7 Support" />
        </div>
      </div>
    </section>
  );
};

export default Advertisement;
