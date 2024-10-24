import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 flex">
      <div className="container mx-auto justify-between px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="">
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <a className="hover:text-gray-400">hasanmiaweb@gmail.com</a>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-2" />
                <span className="hover:text-gray-400">+88 01740398196</span>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>Chandrapur, Purulia - 6400, Gurudaspur, Natore</span>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <a href="#" className="hover:text-gray-400">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Meeting Room. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
