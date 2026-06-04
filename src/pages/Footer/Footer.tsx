import {
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-16">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <Link to="/" className="inline-block">
              <img src={logo} alt="Logo" className="h-10 w-auto brightness-0 invert" />
            </Link>
            <p className="text-slate-500 text-sm max-w-sm mt-3 leading-relaxed">
              Empelling smart scheduling for high-performing teams. Reserve the best spaces with zero friction and maximum productivity.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-slate-200 text-sm font-bold uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3 text-slate-400 hover:text-indigo-400 transition-colors">
                <FaEnvelope className="text-indigo-500 shrink-0" />
                <a href="mailto:hasanmiaweb@gmail.com">hasanmiaweb@gmail.com</a>
              </li>
              <li className="flex items-center space-x-3 text-slate-400">
                <FaPhoneAlt className="text-indigo-500 shrink-0" />
                <span>+88 01740398196</span>
              </li>
              <li className="flex items-start space-x-3 text-slate-400">
                <FaMapMarkerAlt className="text-indigo-500 shrink-0 mt-1" />
                <span className="leading-snug">Chandrapur, Purulia - 6400, Gurudaspur, Natore</span>
              </li>
            </ul>
          </div>

          {/* Useful Links & Socials */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-slate-200 text-sm font-bold uppercase tracking-wider">Follow Us</h4>
              <div className="flex space-x-3">
                <a
                  href="https://www.facebook.com/devhashmia/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white transition-all duration-300 shadow"
                >
                  <FaFacebookF size={16} />
                </a>
                <a
                  href="https://x.com/devhashmia"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white transition-all duration-300 shadow"
                >
                  <FaTwitter size={16} />
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-slate-200 text-xs font-bold uppercase tracking-wider">Legal</h4>
              <ul className="flex space-x-4 text-xs">
                <li>
                  <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800/60 text-center text-xs text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Meeting Room. All rights reserved.</p>
          <p className="hover:text-slate-500 transition-colors">Developed by MD. HASAN MIA</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
