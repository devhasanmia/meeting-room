import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How do I modify or cancel my room booking?",
      a: "You can easily view and manage all of your reservations directly inside your personal Member Dashboard. Simply log in, navigate to 'My Bookings', and select your slot details.",
    },
    {
      q: "Are AV screens and Wi-Fi included in the slot price?",
      a: "Yes! All amenities displayed on the room details page—including high-speed fiber Wi-Fi, television screens, whiteboards, and connection cables—are fully included in the pricing with no hidden fees.",
    },
    {
      q: "What is your cancellation and refund policy?",
      a: "We offer flexible cancellations. Bookings cancelled 24 hours in advance of the scheduled slot start time are eligible for refund adjustments or booking credits. Please get in touch with our support desk.",
    },
    {
      q: "Can I book multiple continuous time slots on the same day?",
      a: "Absolutely! You can reserve multiple consecutive time slots during the booking checkout flow to secure the space for extended meetings or all-day workshops.",
    },
  ];

  const toggleFAQ = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Common Inquiries
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Find answers to common questions about space scheduling, cancellations, and premium amenities.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                >
                  <span className="text-sm font-bold text-slate-800 pr-4">{faq.q}</span>
                  <FiChevronDown
                    className={`text-slate-400 shrink-0 transition-transform duration-300 text-lg ${
                      isOpen ? "transform rotate-180 text-indigo-500" : ""
                    }`}
                  />
                </button>

                {/* Collapsible Area */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-40 border-t border-slate-100/50 bg-white" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-xs text-slate-500 font-medium leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
